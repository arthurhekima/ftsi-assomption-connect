
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Pencil, Trash2, Plus } from "lucide-react";

// Schéma de validation pour les enseignants
const enseignantSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  prenom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  titre: z.string().optional(),
  domaine: z.string().min(2, { message: "Le domaine doit être spécifié" }),
  specialite: z.string().optional(),
  email: z.string().email({ message: "Email invalide" }).optional().or(z.literal("")),
  telephone: z.string().optional(),
  bio: z.string().optional(),
  url_photo: z.string().optional(),
});

type Enseignant = {
  id: string;
  nom: string;
  prenom: string;
  titre: string | null;
  domaine: string;
  specialite: string | null;
  email: string | null;
  telephone: string | null;
  bio: string | null;
  url_photo: string | null;
  date_ajout: string;
};

export default function EnseignantsAdmin() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState<Enseignant | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  // Formulaire pour ajouter un enseignant
  const addForm = useForm<z.infer<typeof enseignantSchema>>({
    resolver: zodResolver(enseignantSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      titre: "",
      domaine: "",
      specialite: "",
      email: "",
      telephone: "",
      bio: "",
      url_photo: "",
    },
  });

  // Formulaire pour modifier un enseignant
  const editForm = useForm<z.infer<typeof enseignantSchema>>({
    resolver: zodResolver(enseignantSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      titre: "",
      domaine: "",
      specialite: "",
      email: "",
      telephone: "",
      bio: "",
      url_photo: "",
    },
  });

  // Requête pour obtenir la liste des enseignants
  const { data: enseignants, isLoading } = useQuery({
    queryKey: ['enseignants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enseignants')
        .select('*')
        .order('nom');
        
      if (error) throw error;
      return data as Enseignant[];
    }
  });

  // Mutation pour ajouter un enseignant
  const addEnseignantMutation = useMutation({
    mutationFn: async (data: z.infer<typeof enseignantSchema>) => {
      let url_photo = data.url_photo;

      // Si un fichier image a été sélectionné, on l'upload d'abord
      if (imageFile) {
        const filename = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('enseignants_photos')
          .upload(filename, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Construire l'URL de l'image
        const { data: urlData } = supabase.storage
          .from('enseignants_photos')
          .getPublicUrl(filename);
          
        url_photo = urlData.publicUrl;
      }

      // Ajouter l'enseignant dans la base de données
      const { data: enseignant, error } = await supabase
        .from('enseignants')
        .insert([{ ...data, url_photo }])
        .select()
        .single();
        
      if (error) throw error;
      return enseignant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enseignants'] });
      toast({ 
        title: "Enseignant ajouté",
        description: "L'enseignant a été ajouté avec succès."
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

  // Mutation pour modifier un enseignant
  const editEnseignantMutation = useMutation({
    mutationFn: async (data: z.infer<typeof enseignantSchema>) => {
      if (!selectedEnseignant) throw new Error("Aucun enseignant sélectionné");
      
      let url_photo = data.url_photo;

      // Si un fichier image a été sélectionné, on l'upload d'abord
      if (imageFile) {
        const filename = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('enseignants_photos')
          .upload(filename, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Construire l'URL de l'image
        const { data: urlData } = supabase.storage
          .from('enseignants_photos')
          .getPublicUrl(filename);
          
        url_photo = urlData.publicUrl;
      }

      // Mettre à jour l'enseignant dans la base de données
      const { data: enseignant, error } = await supabase
        .from('enseignants')
        .update({ ...data, url_photo: url_photo || selectedEnseignant.url_photo })
        .eq('id', selectedEnseignant.id)
        .select()
        .single();
        
      if (error) throw error;
      return enseignant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enseignants'] });
      toast({ 
        title: "Enseignant modifié",
        description: "L'enseignant a été modifié avec succès."
      });
      setIsEditDialogOpen(false);
      editForm.reset();
      setSelectedEnseignant(null);
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

  // Mutation pour supprimer un enseignant
  const deleteEnseignantMutation = useMutation({
    mutationFn: async () => {
      if (!selectedEnseignant) throw new Error("Aucun enseignant sélectionné");
      
      const { error } = await supabase
        .from('enseignants')
        .delete()
        .eq('id', selectedEnseignant.id);
        
      if (error) throw error;
      return selectedEnseignant.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enseignants'] });
      toast({ 
        title: "Enseignant supprimé",
        description: "L'enseignant a été supprimé avec succès."
      });
      setIsDeleteDialogOpen(false);
      setSelectedEnseignant(null);
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'add' | 'edit') => {
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

  // Ouvrir le dialogue de modification avec les données de l'enseignant sélectionné
  const openEditDialog = (enseignant: Enseignant) => {
    setSelectedEnseignant(enseignant);
    editForm.reset({
      nom: enseignant.nom,
      prenom: enseignant.prenom,
      titre: enseignant.titre || "",
      domaine: enseignant.domaine,
      specialite: enseignant.specialite || "",
      email: enseignant.email || "",
      telephone: enseignant.telephone || "",
      bio: enseignant.bio || "",
      url_photo: enseignant.url_photo || "",
    });
    setImagePreview(enseignant.url_photo || null);
    setIsEditDialogOpen(true);
  };

  // Ouvrir le dialogue de suppression
  const openDeleteDialog = (enseignant: Enseignant) => {
    setSelectedEnseignant(enseignant);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des enseignants</h1>
          <p className="text-muted-foreground">Gérez les profils des enseignants de la faculté</p>
        </div>
        <Button 
          onClick={() => {
            addForm.reset();
            setImageFile(null);
            setImagePreview(null);
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un enseignant
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uac-blue"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Domaine</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enseignants?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Aucun enseignant enregistré
                </TableCell>
              </TableRow>
            ) : (
              enseignants?.map((enseignant) => (
                <TableRow key={enseignant.id}>
                  <TableCell className="font-medium">
                    {enseignant.titre && <span>{enseignant.titre} </span>}
                    {enseignant.prenom} {enseignant.nom}
                  </TableCell>
                  <TableCell>{enseignant.domaine}</TableCell>
                  <TableCell>{enseignant.email || "Non renseigné"}</TableCell>
                  <TableCell>{enseignant.telephone || "Non renseigné"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => openEditDialog(enseignant)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => openDeleteDialog(enseignant)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Dialog pour ajouter un enseignant */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un enseignant</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour ajouter un nouvel enseignant.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit((data) => addEnseignantMutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre (Dr., Prof., etc.)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="domaine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domaine</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={addForm.control}
                name="specialite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spécialité</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={addForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biographie</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Photo de profil</FormLabel>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="w-24 h-24 rounded-md overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'add')}
                  />
                </div>
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
                  disabled={addEnseignantMutation.isPending}
                >
                  {addEnseignantMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un enseignant */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier un enseignant</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'enseignant.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit((data) => editEnseignantMutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre (Dr., Prof., etc.)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="domaine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domaine</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={editForm.control}
                name="specialite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spécialité</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={editForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biographie</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Photo de profil</FormLabel>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="w-24 h-24 rounded-md overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'edit')}
                  />
                </div>
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
                  disabled={editEnseignantMutation.isPending}
                >
                  {editEnseignantMutation.isPending ? "Modification en cours..." : "Enregistrer les modifications"}
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
              Êtes-vous sûr de vouloir supprimer cet enseignant ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEnseignant && (
            <div className="py-4">
              <p className="font-medium">
                {selectedEnseignant.titre && <span>{selectedEnseignant.titre} </span>}
                {selectedEnseignant.prenom} {selectedEnseignant.nom}
              </p>
              <p className="text-sm text-muted-foreground">{selectedEnseignant.domaine}</p>
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
              onClick={() => deleteEnseignantMutation.mutate()}
              disabled={deleteEnseignantMutation.isPending}
            >
              {deleteEnseignantMutation.isPending ? "Suppression..." : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
