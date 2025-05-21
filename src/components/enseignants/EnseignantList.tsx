
import { EnseignantType } from "@/types/enseignant";
import EnseignantCard from "./EnseignantCard";

type EnseignantListProps = {
  enseignants: EnseignantType[];
};

const EnseignantList = ({ enseignants }: EnseignantListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {enseignants.map((enseignant) => (
        <EnseignantCard key={enseignant.id} enseignant={enseignant} />
      ))}
    </div>
  );
};

export default EnseignantList;
