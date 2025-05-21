
import { useState } from "react";
import { enseignants, departements } from "@/types/enseignant";
import DepartementFilter from "@/components/enseignants/DepartementFilter";
import EnseignantList from "@/components/enseignants/EnseignantList";

const Enseignants = () => {
  const [selectedDepartement, setSelectedDepartement] = useState("Tous");

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

        <DepartementFilter 
          departements={departements} 
          selectedDepartement={selectedDepartement} 
          onDepartementChange={setSelectedDepartement} 
        />

        <EnseignantList enseignants={filteredEnseignants} />
      </div>
    </div>
  );
};

export default Enseignants;
