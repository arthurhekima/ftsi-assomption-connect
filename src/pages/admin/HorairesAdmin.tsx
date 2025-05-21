import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus, FileDown } from "lucide-react";

// Schéma de validation pour les horaires
const horaireSchema = z.object({
  titre: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
  filiere: z.string().min(2, { message: "La filière doit être spécifiée" }),
  annee: z.string().min(1, { message: "L'année académique doit être spécifiée" }),
});

type Horaire = {
  id: string;
  titre: string;
  filiere: string;
  annee: string;
  url_pdf: string;
  date_publication: string;
  publie_par: string | null;
};

const filieres = [
  "Génie Informatique",
  "Génie Civil",
  "Génie Électrique",
  "Génie Mécanique",
  "Architecture"
];

const annees = [
  "2024-2025",
  "2023-2024",
  "2022-2023",
  "2021-2022",
  "2020-2021"
];

export default function HorairesAdmin() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHoraire, setSelectedHoraire] = useState<Horaire | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  const queryClient = useQueryClient();

  // Formulaire pour ajouter un horaire
  const addForm = useForm<z.infer<typeof horaireSchema>>({
    resolver: zodResolver(horaireSchema),
    defaultValues: {
      titre: "",
      filiere: "",
      annee: "",
    },
  });

  // Formulaire pour modifier un horaire
  const editForm = useForm<z.infer<typeof horaireSchema>>({
    resolver: zodResolver(horaireSchema),
    defaultValues: {
      titre: "",
      filiere: "",
      annee: "",
    },
  });

  // Requête pour obtenir la liste des horaires
  const { data: horaires, isLoading } = useQuery({
    queryKey: ['horaires'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('horaires')
        .select('*')
        .order('date_publication', { ascending: false });
        
      if (error) throw error;
      return data as Horaire[];
    }
  });

  // Mutation pour ajouter un horaire
  const addHoraireMutation = useMutation({
    mutationFn: async (data: z.infer<typeof horaireSchema>) => {
      if (!pdfFile) throw new Error("Veuillez sélectionner un fichier PDF");
      
      const filename = `${Date.now()}_${pdfFile.name.replace(/\s+/g, '_')}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('horaires_pdf')
        .upload(filename, pdfFile);
        
      if (uploadError) throw uploadError;
      
      // Construire l'URL du PDF
      const { data: urlData } = supabase.storage
        .from('horaires_pdf')
        .getPublicUrl(filename);
        
      const url_pdf = urlData.publicUrl;

      // Ajouter l'horaire dans la base de données - CORRECTION: utiliser un seul objet au lieu d'un tableau
      const { data: horaire, error } = await supabase
        .from('horaires')
        .insert({
          titre: data.titre,
          filiere: data.filiere, 
          annee: data.annee, 
          url_pdf: url_pdf
        })
        .select()
        .single();
        
      if (error) throw error;
      return horaire;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horaires'] });
      toast({ 
        title: "Horaire ajouté",
        description: "L'horaire a été ajouté avec succès."
      });
      setIsAddDialogOpen(false);
      addForm.reset();
      setPdfFile(null);
    },
    onError: (error) => {
      toast({ 
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Mutation pour modifier un horaire
  const editHoraireMutation = useMutation({
    mutationFn: async (data: z.infer<typeof horaireSchema>) => {
      if (!selectedHoraire) throw new Error("Aucun horaire sélectionné");
      
      let url_pdf = selectedHoraire.url_pdf;

      // Si un fichier PDF a été sélectionné, on l'upload d'abord
      if (pdfFile) {
        const filename = `${Date.now()}_${pdfFile.name.replace(/\s+/g, '_')}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('horaires_pdf')
          .upload(filename, pdfFile);
          
        if (uploadError) throw uploadError;
        
        // Construire l'URL du PDF
        const { data: urlData } = supabase.storage
          .from('horaires_pdf')
          .getPublicUrl(filename);
          
        url_pdf = urlData.publicUrl;
      }

      // Mettre à jour l'horaire dans la base de données
      const { data: horaire, error } = await supabase
        .from('horaires')
        .update({ ...data, url_pdf })
        .eq('id', selectedHoraire.id)
        .select()
        .single();
        
      if (error) throw error;
      return horaire;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horaires'] });
      toast({ 
        title: "Horaire modifié",
        description: "L'horaire a été modifié avec succès."
      });
      setIsEditDialogOpen(false);
      editForm.reset();
      setSelectedHoraire(null);
      setPdfFile(null);
    },
    onError: (error) => {
      toast({ 
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Mutation pour supprimer un horaire
  const deleteHoraireMutation = useMutation({
    mutationFn: async () => {
      if (!selectedHoraire) throw new Error("Aucun horaire sélectionné");
      
      const { error } = await supabase
        .from('horaires')
        .delete()
        .eq('id', selectedHoraire.id);
        
      if (error) throw error;
      return selectedHoraire.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horaires'] });
      toast({ 
        title: "Horaire supprimé",
        description: "L'horaire a été supprimé avec succès."
      });
      setIsDeleteDialogOpen(false);
      setSelectedHoraire(null);
    },
    onError: (error) => {
      toast({ 
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Gestion du fichier PDF
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPdfFile(file);
    }
  };

  // Ouvrir le dialogue de modification avec les données de l'horaire sélectionné
  const openEditDialog = (horaire: Horaire) => {
    setSelectedHoraire(horaire);
    editForm.reset({
      titre: horaire.titre,
      filiere: horaire.filiere,
      annee: horaire.annee,
    });
    setIsEditDialogOpen(true);
  };

  // Ouvrir le dialogue de suppression
  const openDeleteDialog = (horaire: Horaire) => {
    setSelectedHoraire(horaire);
    setIsDeleteDialogOpen(true);
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des horaires</h1>
          <p className="text-muted-foreground">Gérez les horaires et emplois du temps pour les étudiants</p>
        </div>
        <Button 
          onClick={() => {
            addForm.reset();
            setPdfFile(null);
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un horaire
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
              <TableHead>Titre</TableHead>
              <TableHead>Filière</TableHead>
              <TableHead>Année académique</TableHead>
              <TableHead>Date de publication</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {horaires?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Aucun horaire enregistré
                </TableCell>
              </TableRow>
            ) : (
              horaires?.map((horaire) => (
                <TableRow key={horaire.id}>
                  <TableCell className="font-medium">{horaire.titre}</TableCell>
                  <TableCell>{horaire.filiere}</TableCell>
                  <TableCell>{horaire.annee}</TableCell>
                  <TableCell>{formatDate(horaire.date_publication)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => window.open(horaire.url_pdf, '_blank')}
                    >
                      <FileDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => openEditDialog(horaire)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => openDeleteDialog(horaire)}
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

      {/* Dialog pour ajouter un horaire */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter un horaire</DialogTitle>
            <DialogDescription>
              Téléchargez un nouvel horaire ou emploi du temps en format PDF.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit((data) => addHoraireMutation.mutate(data))} className="space-y-4">
              <FormField
                control={addForm.control}
                name="titre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Emploi du temps L1 Génie Informatique" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="filiere"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filière</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une filière" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filieres.map((filiere) => (
                            <SelectItem key={filiere} value={filiere}>
                              {filiere}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="annee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année académique</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une année" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {annees.map((annee) => (
                            <SelectItem key={annee} value={annee}>
                              {annee}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <FormLabel>Fichier PDF</FormLabel>
                <Input 
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  required
                />
                {pdfFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Fichier sélectionné: {pdfFile.name}
                  </p>
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
                  disabled={addHoraireMutation.isPending || !pdfFile}
                >
                  {addHoraireMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un horaire */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier un horaire</DialogTitle>
            <DialogDescription>
              Modifiez les détails de l'horaire.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit((data) => editHoraireMutation.mutate(data))} className="space-y-4">
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
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="filiere"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filière</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une filière" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filieres.map((filiere) => (
                            <SelectItem key={filiere} value={filiere}>
                              {filiere}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="annee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année académique</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une année" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {annees.map((annee) => (
                            <SelectItem key={annee} value={annee}>
                              {annee}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <FormLabel>Fichier PDF actuel</FormLabel>
                <p className="text-sm text-muted-foreground">
                  <a 
                    href={selectedHoraire?.url_pdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-uac-blue hover:underline"
                  >
                    Voir le PDF actuel
                  </a>
                </p>
                
                <FormLabel className="mt-4">Changer le fichier PDF (optionnel)</FormLabel>
                <Input 
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                />
                {pdfFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Nouveau fichier sélectionné: {pdfFile.name}
                  </p>
                )}
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
                  disabled={editHoraireMutation.isPending}
                >
                  {editHoraireMutation.isPending ? "Modification en cours..." : "Enregistrer les modifications"}
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
              Êtes-vous sûr de vouloir supprimer cet horaire ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {selectedHoraire && (
            <div className="py-4">
              <p className="font-medium">{selectedHoraire.titre}</p>
              <p className="text-sm text-muted-foreground">{selectedHoraire.filiere} | {selectedHoraire.annee}</p>
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
              onClick={() => deleteHoraireMutation.mutate()}
              disabled={deleteHoraireMutation.isPending}
            >
              {deleteHoraireMutation.isPending ? "Suppression..." : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
