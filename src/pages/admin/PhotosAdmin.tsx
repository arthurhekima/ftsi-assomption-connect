import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Schéma de validation pour les photos
const photoSchema = z.object({
  titre: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
  description: z.string().optional(),
});

type Photo = {
  id: string;
  titre: string;
  description: string | null;
  url_image: string;
  date_ajout: string;
  ajoute_par: string | null;
};

export default function PhotosAdmin() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  // Formulaire pour ajouter une photo
  const addForm = useForm<z.infer<typeof photoSchema>>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      titre: "",
      description: "",
    },
  });

  // Formulaire pour modifier une photo
  const editForm = useForm<z.infer<typeof photoSchema>>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      titre: "",
      description: "",
    },
  });

  // Requête pour obtenir la liste des photos
  const { data: photos, isLoading } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('photos_campus')
        .select('*')
        .order('date_ajout', { ascending: false });
        
      if (error) throw error;
      return data as Photo[];
    }
  });

  // Mutation pour ajouter une photo
  const addPhotoMutation = useMutation({
    mutationFn: async (data: z.infer<typeof photoSchema>) => {
      if (!imageFile) throw new Error("Veuillez sélectionner une image");
      
      const filename = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('campus_photos')
        .upload(filename, imageFile);
        
      if (uploadError) throw uploadError;
      
      // Construire l'URL de l'image
      const { data: urlData } = supabase.storage
        .from('campus_photos')
        .getPublicUrl(filename);
        
      const url_image = urlData.publicUrl;

      // Ajouter la photo dans la base de données - CORRECTION: utiliser un seul objet au lieu d'un tableau
      const { data: photo, error } = await supabase
        .from('photos_campus')
        .insert({
          titre: data.titre,
          description: data.description || null,
          url_image: url_image
        })
        .select()
        .single();
        
      if (error) throw error;
      return photo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      toast({ 
        title: "Photo ajoutée",
        description: "La photo a été ajoutée avec succès."
      });
      setIsAddDialogOpen(false);
      addForm.reset();
      setImageFile(null);
      setImagePreview(null);
    },
    onError: (error) => {
      toast({ 
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Mutation pour modifier une photo
  const editPhotoMutation = useMutation({
    mutationFn: async (data: z.infer<typeof photoSchema>) => {
      if (!selectedPhoto) throw new Error("Aucune photo sélectionnée");
      
      let url_image = selectedPhoto.url_image;

      // Si un fichier image a été sélectionné, on l'upload d'abord
      if (imageFile) {
        const filename = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('campus_photos')
          .upload(filename, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Construire l'URL de l'image
        const { data: urlData } = supabase.storage
          .from('campus_photos')
          .getPublicUrl(filename);
          
        url_image = urlData.publicUrl;
      }

      // Mettre à jour la photo dans la base de données
      const { data: photo, error } = await supabase
        .from('photos_campus')
        .update({ ...data, url_image })
        .eq('id', selectedPhoto.id)
        .select()
        .single();
        
      if (error) throw error;
      return photo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      toast({ 
        title: "Photo modifiée",
        description: "La photo a été modifiée avec succès."
      });
      setIsEditDialogOpen(false);
      editForm.reset();
      setSelectedPhoto(null);
      setImageFile(null);
      setImagePreview(null);
    },
    onError: (error) => {
      toast({ 
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Mutation pour supprimer une photo
  const deletePhotoMutation = useMutation({
    mutationFn: async () => {
      if (!selectedPhoto) throw new Error("Aucune photo sélectionnée");
      
      const { error } = await supabase
        .from('photos_campus')
        .delete()
        .eq('id', selectedPhoto.id);
        
      if (error) throw error;
      return selectedPhoto.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      toast({ 
        title: "Photo supprimée",
        description: "La photo a été supprimée avec succès."
      });
      setIsDeleteDialogOpen(false);
      setSelectedPhoto(null);
    },
    onError: (error) => {
      toast({ 
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Gestion du fichier image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Ouvrir le dialogue de modification avec les données de la photo sélectionnée
  const openEditDialog = (photo: Photo) => {
    setSelectedPhoto(photo);
    editForm.reset({
      titre: photo.titre,
      description: photo.description || "",
    });
    setImagePreview(photo.url_image);
    setIsEditDialogOpen(true);
  };

  // Ouvrir le dialogue de suppression
  const openDeleteDialog = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des photos du campus</h1>
          <p className="text-muted-foreground">Gérez les photos qui seront affichées sur le site</p>
        </div>
        <Button onClick={() => {
          addForm.reset();
          setImageFile(null);
          setImagePreview(null);
          setIsAddDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter une photo
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uac-blue"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos?.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <p className="text-muted-foreground">Aucune photo n'a été ajoutée.</p>
              <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                Ajouter votre première photo
              </Button>
            </div>
          ) : (
            photos?.map((photo) => (
              <div key={photo.id} className="border rounded-md overflow-hidden">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={photo.url_image} 
                      alt={photo.titre} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{photo.titre}</h3>
                  {photo.description && <p className="text-sm text-muted-foreground mt-1">{photo.description}</p>}
                </div>
                <div className="px-4 pb-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openEditDialog(photo)}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => openDeleteDialog(photo)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Dialog pour ajouter une photo */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter une photo</DialogTitle>
            <DialogDescription>
              Téléchargez une nouvelle photo du campus.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit((data) => addPhotoMutation.mutate(data))} className="space-y-4">
              <FormField
                control={addForm.control}
                name="titre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optionnelle)</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Image</FormLabel>
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                
                {imagePreview && (
                  <div className="mt-4 border rounded-md overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={imagePreview} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  type="button"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  disabled={addPhotoMutation.isPending || !imageFile}
                >
                  {addPhotoMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier une photo */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier une photo</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la photo.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit((data) => editPhotoMutation.mutate(data))} className="space-y-4">
              <FormField
                control={editForm.control}
                name="titre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optionnelle)</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Image actuelle</FormLabel>
                {imagePreview && (
                  <div className="border rounded-md overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={imagePreview} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                )}
                
                <FormLabel>Changer l'image (optionnel)</FormLabel>
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  type="button"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  disabled={editPhotoMutation.isPending}
                >
                  {editPhotoMutation.isPending ? "Modification en cours..." : "Enregistrer les modifications"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour confirmer la suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette photo ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPhoto && (
            <div className="py-4">
              <div className="border rounded-md overflow-hidden mb-4">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={selectedPhoto.url_image} 
                    alt={selectedPhoto.titre} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <p className="font-medium">{selectedPhoto.titre}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deletePhotoMutation.mutate()}
              disabled={deletePhotoMutation.isPending}
            >
              {deletePhotoMutation.isPending ? "Suppression..." : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
