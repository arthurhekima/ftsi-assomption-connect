
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";
import { EnseignantType } from "@/types/enseignant";
import EnseignantDetailsDialog from "./EnseignantDetailsDialog";

type EnseignantCardProps = {
  enseignant: EnseignantType;
};

const EnseignantCard = ({ enseignant }: EnseignantCardProps) => {
  const [selectedEnseignant, setSelectedEnseignant] = useState<EnseignantType | null>(null);

  return (
    <Card key={enseignant.id} className="overflow-hidden">
      <div className="h-64 overflow-hidden">
        <img 
          src={enseignant.photo} 
          alt={enseignant.nom} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{enseignant.nom}</CardTitle>
        <CardDescription className="text-lg font-medium">{enseignant.titre} en {enseignant.departement}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-2 text-muted-foreground">{enseignant.specialite}</p>
        <div className="flex items-center text-sm mb-1">
          <Mail className="w-4 h-4 mr-2" />
          <span>{enseignant.email}</span>
        </div>
        <div className="flex items-center text-sm">
          <Phone className="w-4 h-4 mr-2" />
          <span>{enseignant.telephone}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setSelectedEnseignant(enseignant)}
            >
              Voir le profil complet
            </Button>
          </DialogTrigger>
          <EnseignantDetailsDialog enseignant={enseignant} />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default EnseignantCard;
