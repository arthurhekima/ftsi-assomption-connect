
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Download, FileText, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Données fictives pour les cours et emplois du temps
const coursData = [
  {
    id: "info",
    departement: "Génie Informatique",
    cours: [
      { code: "INF101", nom: "Introduction à la programmation", credits: 6, annee: 1 },
      { code: "INF102", nom: "Structures de données", credits: 6, annee: 1 },
      { code: "INF201", nom: "Programmation orientée objet", credits: 6, annee: 2 },
      { code: "INF202", nom: "Bases de données", credits: 5, annee: 2 },
      { code: "INF301", nom: "Algorithmique avancée", credits: 6, annee: 3 },
      { code: "INF302", nom: "Réseaux informatiques", credits: 5, annee: 3 },
      { code: "INF401", nom: "Intelligence artificielle", credits: 6, annee: 4 },
      { code: "INF402", nom: "Développement web", credits: 5, annee: 4 },
      { code: "INF501", nom: "Cybersécurité", credits: 6, annee: 5 },
      { code: "INF502", nom: "Projet de fin d'études", credits: 12, annee: 5 }
    ],
    emploisDuTemps: [
      { annee: 1, trimestre: 1, fichier: "emploi-temps-gi-a1-t1.pdf" },
      { annee: 1, trimestre: 2, fichier: "emploi-temps-gi-a1-t2.pdf" },
      { annee: 2, trimestre: 1, fichier: "emploi-temps-gi-a2-t1.pdf" },
      { annee: 2, trimestre: 2, fichier: "emploi-temps-gi-a2-t2.pdf" },
      { annee: 3, trimestre: 1, fichier: "emploi-temps-gi-a3-t1.pdf" },
      { annee: 3, trimestre: 2, fichier: "emploi-temps-gi-a3-t2.pdf" },
      { annee: 4, trimestre: 1, fichier: "emploi-temps-gi-a4-t1.pdf" },
      { annee: 4, trimestre: 2, fichier: "emploi-temps-gi-a4-t2.pdf" },
      { annee: 5, trimestre: 1, fichier: "emploi-temps-gi-a5-t1.pdf" },
      { annee: 5, trimestre: 2, fichier: "emploi-temps-gi-a5-t2.pdf" },
    ]
  },
  {
    id: "civil",
    departement: "Génie Civil",
    cours: [
      { code: "CIV101", nom: "Mécanique des structures", credits: 6, annee: 1 },
      { code: "CIV102", nom: "Matériaux de construction", credits: 6, annee: 1 },
      { code: "CIV201", nom: "Résistance des matériaux", credits: 6, annee: 2 },
      { code: "CIV202", nom: "Hydraulique", credits: 5, annee: 2 },
      { code: "CIV301", nom: "Béton armé", credits: 6, annee: 3 },
      { code: "CIV302", nom: "Géotechnique", credits: 5, annee: 3 },
      { code: "CIV401", nom: "Construction métallique", credits: 6, annee: 4 },
      { code: "CIV402", nom: "Routes et ouvrages d'art", credits: 5, annee: 4 },
      { code: "CIV501", nom: "Génie parasismique", credits: 6, annee: 5 },
      { code: "CIV502", nom: "Projet de fin d'études", credits: 12, annee: 5 }
    ],
    emploisDuTemps: [
      { annee: 1, trimestre: 1, fichier: "emploi-temps-gc-a1-t1.pdf" },
      { annee: 1, trimestre: 2, fichier: "emploi-temps-gc-a1-t2.pdf" }
    ]
  },
  {
    id: "elec",
    departement: "Génie Électrique",
    cours: [
      { code: "ELE101", nom: "Électronique fondamentale", credits: 6, annee: 1 },
      { code: "ELE102", nom: "Circuits électriques", credits: 6, annee: 1 },
      { code: "ELE201", nom: "Électromagnétisme", credits: 6, annee: 2 },
      { code: "ELE202", nom: "Électronique numérique", credits: 5, annee: 2 },
      { code: "ELE301", nom: "Électronique de puissance", credits: 6, annee: 3 },
      { code: "ELE302", nom: "Automatismes industriels", credits: 5, annee: 3 },
      { code: "ELE401", nom: "Énergies renouvelables", credits: 6, annee: 4 },
      { code: "ELE402", nom: "Télécommunications", credits: 5, annee: 4 },
      { code: "ELE501", nom: "Smart grids", credits: 6, annee: 5 },
      { code: "ELE502", nom: "Projet de fin d'études", credits: 12, annee: 5 }
    ],
    emploisDuTemps: [
      { annee: 1, trimestre: 1, fichier: "emploi-temps-ge-a1-t1.pdf" },
      { annee: 1, trimestre: 2, fichier: "emploi-temps-ge-a1-t2.pdf" }
    ]
  },
  {
    id: "meca",
    departement: "Génie Mécanique",
    cours: [
      { code: "MEC101", nom: "Mécanique générale", credits: 6, annee: 1 },
      { code: "MEC102", nom: "Thermodynamique", credits: 6, annee: 1 },
      { code: "MEC201", nom: "Résistance des matériaux", credits: 6, annee: 2 },
      { code: "MEC202", nom: "CAO", credits: 5, annee: 2 },
      { code: "MEC301", nom: "Fabrication mécanique", credits: 6, annee: 3 },
      { code: "MEC302", nom: "Mécanique des fluides", credits: 5, annee: 3 },
      { code: "MEC401", nom: "Machines thermiques", credits: 6, annee: 4 },
      { code: "MEC402", nom: "Automatismes et robotique", credits: 5, annee: 4 },
      { code: "MEC501", nom: "Maintenance industrielle", credits: 6, annee: 5 },
      { code: "MEC502", nom: "Projet de fin d'études", credits: 12, annee: 5 }
    ],
    emploisDuTemps: [
      { annee: 1, trimestre: 1, fichier: "emploi-temps-gm-a1-t1.pdf" },
      { annee: 1, trimestre: 2, fichier: "emploi-temps-gm-a1-t2.pdf" }
    ]
  },
  {
    id: "archi",
    departement: "Architecture",
    cours: [
      { code: "ARC101", nom: "Dessin d'architecture", credits: 6, annee: 1 },
      { code: "ARC102", nom: "Histoire de l'architecture", credits: 6, annee: 1 },
      { code: "ARC201", nom: "Construction", credits: 6, annee: 2 },
      { code: "ARC202", nom: "Urbanisme", credits: 5, annee: 2 },
      { code: "ARC301", nom: "Architecture bioclimatique", credits: 6, annee: 3 },
      { code: "ARC302", nom: "Infographie", credits: 5, annee: 3 },
      { code: "ARC401", nom: "Projet architectural", credits: 6, annee: 4 },
      { code: "ARC402", nom: "Architecture durable", credits: 5, annee: 4 },
      { code: "ARC501", nom: "Urbanisme avancé", credits: 6, annee: 5 },
      { code: "ARC502", nom: "Projet de fin d'études", credits: 12, annee: 5 }
    ],
    emploisDuTemps: [
      { annee: 1, trimestre: 1, fichier: "emploi-temps-archi-a1-t1.pdf" },
      { annee: 1, trimestre: 2, fichier: "emploi-temps-archi-a1-t2.pdf" }
    ]
  }
];

const Etudiants = () => {
  const [selectedDepartement, setSelectedDepartement] = useState("info");
  const [selectedAnnee, setSelectedAnnee] = useState<string>("1");
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une version future, intégration avec Supabase
    setFormSubmitted(true);
    toast({
      title: "Demande d'inscription envoyée",
      description: "Nous avons bien reçu votre demande d'inscription. Vous serez contacté prochainement.",
      duration: 5000,
    });
  };
  
  const handleEmploiDuTempsDownload = (fichier: string) => {
    // Dans une implémentation réelle, ceci téléchargerait le fichier PDF
    toast({
      title: "Téléchargement",
      description: `L'emploi du temps sera disponible après l'intégration de la base de données.`,
      duration: 3000,
    });
  };

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Espace Étudiants</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Inscrivez-vous, consultez la liste des cours et téléchargez les emplois du temps
          </p>
        </div>

        <Tabs defaultValue="inscription" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="inscription">Inscription</TabsTrigger>
            <TabsTrigger value="cours">Liste des cours</TabsTrigger>
            <TabsTrigger value="emploi">Emplois du temps</TabsTrigger>
          </TabsList>

          {/* Onglet Inscription */}
          <TabsContent value="inscription">
            <Card>
              <CardHeader>
                <CardTitle>Formulaire de pré-inscription</CardTitle>
                <CardDescription>
                  Complétez ce formulaire pour démarrer votre processus d'inscription à la FTSI. 
                  Une fois votre demande soumise, nous vous contacterons pour les prochaines étapes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!formSubmitted ? (
                  <form onSubmit={handleInscriptionSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input id="nom" placeholder="Votre nom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input id="prenom" placeholder="Votre prénom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="votre.email@exemple.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input id="telephone" placeholder="+243 ..." required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateNaissance">Date de naissance</Label>
                        <div className="flex items-center relative">
                          <Input id="dateNaissance" type="date" required />
                          <CalendarIcon className="absolute right-3 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="filiere">Filière souhaitée</Label>
                        <Select required>
                          <SelectTrigger id="filiere">
                            <SelectValue placeholder="Choisissez une filière" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Génie Informatique</SelectItem>
                            <SelectItem value="civil">Génie Civil</SelectItem>
                            <SelectItem value="elec">Génie Électrique</SelectItem>
                            <SelectItem value="meca">Génie Mécanique</SelectItem>
                            <SelectItem value="archi">Architecture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="diplome">Dernier diplôme obtenu</Label>
                        <Input id="diplome" placeholder="Ex: Baccalauréat Scientifique" required />
                      </div>
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label>Genre</Label>
                        <RadioGroup defaultValue="homme" className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="homme" id="homme" />
                            <Label htmlFor="homme">Homme</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="femme" id="femme" />
                            <Label htmlFor="femme">Femme</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="motivation">Lettre de motivation</Label>
                        <Textarea id="motivation" placeholder="Expliquez en quelques lignes pourquoi vous souhaitez rejoindre notre faculté..." required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Soumettre ma candidature</Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="w-16 h-16 mx-auto text-uac-blue mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Demande envoyée avec succès!</h3>
                    <p className="text-muted-foreground mb-6">
                      Merci pour votre intérêt pour la FTSI. Notre équipe examinera votre candidature et vous contactera dans les plus brefs délais.
                    </p>
                    <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                      Soumettre une nouvelle demande
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Liste des cours */}
          <TabsContent value="cours">
            <Card>
              <CardHeader>
                <CardTitle>Liste des cours par filière</CardTitle>
                <CardDescription>
                  Consultez les cours disponibles pour chaque filière et année d'étude
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Label className="py-2 pr-2">Filière:</Label>
                    <div className="flex flex-wrap gap-2">
                      {coursData.map((dep) => (
                        <Button 
                          key={dep.id}
                          variant={selectedDepartement === dep.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedDepartement(dep.id)}
                        >
                          {dep.departement}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Label className="py-2 pr-2">Année:</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((annee) => (
                        <Button 
                          key={annee}
                          variant={selectedAnnee === annee.toString() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedAnnee(annee.toString())}
                        >
                          {annee}ère{annee === 1 ? "" : "e"} année
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {
                        coursData.find(d => d.id === selectedDepartement)?.departement || "Département"
                      } - {selectedAnnee}ère{parseInt(selectedAnnee) === 1 ? "" : "e"} année
                    </h3>
                    <div className="bg-uac-gray-light rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-uac-blue text-white">
                          <tr>
                            <th className="py-3 px-4 text-left">Code</th>
                            <th className="py-3 px-4 text-left">Cours</th>
                            <th className="py-3 px-4 text-center">Crédits</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {
                            coursData
                              .find(d => d.id === selectedDepartement)
                              ?.cours
                              .filter(c => c.annee.toString() === selectedAnnee)
                              .map((cours) => (
                                <tr key={cours.code} className="hover:bg-gray-100">
                                  <td className="py-3 px-4">{cours.code}</td>
                                  <td className="py-3 px-4">{cours.nom}</td>
                                  <td className="py-3 px-4 text-center">{cours.credits}</td>
                                </tr>
                              ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Emplois du temps */}
          <TabsContent value="emploi">
            <Card>
              <CardHeader>
                <CardTitle>Emplois du temps</CardTitle>
                <CardDescription>
                  Téléchargez les emplois du temps par filière, année et trimestre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Label className="py-2 pr-2">Filière:</Label>
                    <div className="flex flex-wrap gap-2">
                      {coursData.map((dep) => (
                        <Button 
                          key={dep.id}
                          variant={selectedDepartement === dep.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedDepartement(dep.id)}
                        >
                          {dep.departement}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4, 5].map((annee) => (
                      <div key={annee} className="bg-uac-gray-light p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">
                          {annee}ère{annee === 1 ? "" : "e"} année
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[1, 2].map((trimestre) => {
                            const emploi = coursData
                              .find(d => d.id === selectedDepartement)
                              ?.emploisDuTemps
                              .find(e => e.annee === annee && e.trimestre === trimestre);
                            
                            return (
                              <div key={`${annee}-${trimestre}`} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 mr-3 text-uac-blue" />
                                  <span>Trimestre {trimestre}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="flex items-center"
                                  onClick={() => handleEmploiDuTempsDownload(emploi?.fichier || "")}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  PDF
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Etudiants;
