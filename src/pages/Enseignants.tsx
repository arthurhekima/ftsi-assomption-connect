
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import DepartementFilter from "@/components/enseignants/DepartementFilter";
import EnseignantList from "@/components/enseignants/EnseignantList";
import { EnseignantType } from "@/types/enseignant";
import { toast } from "@/hooks/use-toast";

const Enseignants = () => {
  const [selectedDepartement, setSelectedDepartement] = useState("Tous");
  const [enseignants, setEnseignants] = useState<EnseignantType[]>([]);
  const [departements, setDepartements] = useState<string[]>(["Tous"]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les enseignants depuis Supabase
  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('enseignants')
          .select('*')
          .order('nom');
          
        if (error) throw error;
        
        // Convertir les données pour correspondre au type EnseignantType
        const formattedData = data.map(e => ({
          id: e.id,
          nom: e.nom,
          prenom: e.prenom,
          titre: e.titre || undefined,
          departement: e.domaine, // Adapter le champ domaine à departement
          specialite: e.specialite || undefined,
          email: e.email || undefined,
          telephone: e.telephone || undefined,
          bio: e.bio || undefined,
          photo: e.url_photo || undefined
        }));
        
        setEnseignants(formattedData);
        
        // Extraire les départements uniques
        const uniqueDepts = ["Tous", ...new Set(formattedData.map(e => e.departement))];
        setDepartements(uniqueDepts);
      } catch (error: any) {
        console.error("Erreur lors du chargement des enseignants:", error.message);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des enseignants.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnseignants();
  }, []);

  // Filtrer les enseignants selon le département sélectionné
  const filteredEnseignants = selectedDepartement === "Tous"
    ? enseignants
    : enseignants.filter(e => e.departement === selectedDepartement);

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Corps Enseignant</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos enseignants hautement qualifiés qui vous accompagneront tout au long de votre parcours académique
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uac-blue"></div>
          </div>
        ) : (
          <>
            <DepartementFilter 
              departements={departements} 
              selectedDepartement={selectedDepartement} 
              onDepartementChange={setSelectedDepartement} 
            />

            <EnseignantList enseignants={filteredEnseignants} />
          </>
        )}
      </div>
    </div>
  );
};

export default Enseignants;
