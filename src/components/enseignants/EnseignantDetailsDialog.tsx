
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";
import { EnseignantType } from "@/types/enseignant";

type EnseignantDetailsDialogProps = {
  enseignant: EnseignantType;
};

const EnseignantDetailsDialog = ({ enseignant }: EnseignantDetailsDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl">{enseignant.nom}</DialogTitle>
        <DialogDescription className="text-lg">
          {enseignant.titre} en {enseignant.departement}
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="md:col-span-1">
          <div className="aspect-square overflow-hidden rounded-md">
            <img 
              src={enseignant.photo} 
              alt={enseignant.nom} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold">Coordonnées</h4>
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 mr-2" />
              <span>{enseignant.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-2" />
              <span>{enseignant.telephone}</span>
            </div>
            <p className="text-sm pt-2">
              <strong>Bureau:</strong> {enseignant.bureau}
            </p>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Spécialisation</h3>
            <p>{enseignant.specialite}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Biographie</h3>
            <p>{enseignant.bio}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Cours enseignés</h3>
            <ul className="list-disc pl-5 space-y-1">
              {enseignant.cours.map((cours, index) => (
                <li key={index}>{cours}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Publications récentes</h3>
            <ul className="space-y-3">
              {enseignant.publications.map((pub, index) => (
                <li key={index} className="border-l-2 border-uac-blue pl-3 py-1">
                  {pub}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default EnseignantDetailsDialog;
