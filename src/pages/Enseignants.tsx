
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";

// Données fictives d'enseignants
const enseignants = [
  {
    id: 1,
    nom: "Dr. Robert Makala",
    photo: "/src/assets/teacher1.jpg",
    titre: "Professeur",
    departement: "Génie Informatique",
    specialite: "Intelligence Artificielle et Apprentissage Machine",
    email: "r.makala@uac.cd",
    telephone: "+243 123 456 789",
    bureau: "Bâtiment A, Bureau 203",
    bio: "Dr. Makala est spécialiste en intelligence artificielle avec plus de 15 ans d'expérience. Il a obtenu son doctorat à l'École Polytechnique de Paris et a travaillé sur plusieurs projets d'innovation en IA appliquée. Il enseigne les algorithmes avancés et dirige le laboratoire d'intelligence artificielle de la FTSI.",
    cours: ["Intelligence artificielle", "Apprentissage profond", "Systèmes experts", "Algorithmique avancée"],
    publications: [
      "Makala, R. et al. (2021). \"Deep Learning Applications for Predictive Maintenance in African Industries\", International Journal of Computer Science.",
      "Makala, R. & Diop, S. (2020). \"Neural Networks for Image Recognition in Resource-Constrained Environments\", African Review of Technology.",
      "Makala, R. (2019). \"Machine Learning Approaches to Solving Complex African Developmental Challenges\", Journal of AI Research."
    ]
  },
  {
    id: 2,
    nom: "Prof. Marie Lukeba",
    photo: "/src/assets/teacher2.jpg",
    titre: "Professeure",
    departement: "Génie Civil",
    specialite: "Matériaux Durables et Construction Écologique",
    email: "m.lukeba@uac.cd",
    telephone: "+243 987 654 321",
    bureau: "Bâtiment B, Bureau 101",
    bio: "Professeure Lukeba est une experte internationale en matériaux de construction durables. Après avoir obtenu son doctorat à l'Université de Cape Town, elle a travaillé sur des projets innovants d'architecture durable dans plusieurs pays africains. Elle apporte son expertise en construction écologique et dirige plusieurs projets de recherche sur les matériaux adaptés au climat tropical.",
    cours: ["Matériaux de construction durable", "Résistance des matériaux", "Construction écologique", "Gestion de projets de construction"],
    publications: [
      "Lukeba, M. & Johnson, T. (2022). \"Sustainable Building Materials for Tropical Climates\", Journal of Sustainable Construction.",
      "Lukeba, M. et al. (2020). \"Improving Concrete Durability with Local Organic Additives\", Construction and Building Materials Journal.",
      "Lukeba, M. (2018). \"Low-Carbon Building Techniques for Developing Countries\", African Journal of Environmental Science."
    ]
  },
  {
    id: 3,
    nom: "Dr. Jean-Paul Mwamba",
    photo: "/src/assets/teacher3.jpg",
    titre: "Maître de conférences",
    departement: "Génie Électrique",
    specialite: "Énergies Renouvelables et Réseaux Électriques Intelligents",
    email: "jp.mwamba@uac.cd",
    telephone: "+243 456 789 123",
    bureau: "Bâtiment C, Bureau 305",
    bio: "Dr. Mwamba est spécialiste des systèmes d'énergie renouvelable et des micro-réseaux. Il a obtenu son doctorat à l'Université Technique de Berlin et a participé à plusieurs projets d'électrification rurale en Afrique subsaharienne. Il apporte son expertise pratique et théorique dans le domaine des systèmes électriques intelligents et durables.",
    cours: ["Énergies renouvelables", "Smart grids", "Électrotechnique avancée", "Gestion de l'énergie"],
    publications: [
      "Mwamba, J.P. et al. (2023). \"Micro-grid Solutions for Rural Electrification in the Congo Basin\", Renewable Energy Journal.",
      "Mwamba, J.P. & Garcia, A. (2021). \"Hybrid Solar-Hydro Systems: Case Studies from Central Africa\", Energy Research & Social Science.",
      "Mwamba, J.P. (2019). \"Optimizing Solar PV Deployment in Sub-Saharan Urban Areas\", Journal of Clean Energy Technologies."
    ]
  },
  {
    id: 4,
    nom: "Dr. Claire Nkosi",
    photo: "/src/assets/teacher4.jpg",
    titre: "Maître de conférences",
    departement: "Architecture",
    specialite: "Architecture Tropicale et Urbanisme Durable",
    email: "c.nkosi@uac.cd",
    telephone: "+243 234 567 890",
    bureau: "Bâtiment D, Bureau 110",
    bio: "Dr. Nkosi est spécialiste en conception architecturale adaptée aux climats tropicaux. Après avoir obtenu son doctorat à l'Université de Nairobi, elle a travaillé sur plusieurs projets d'urbanisme durable en Afrique centrale et de l'Est. Elle apporte une vision moderne de l'architecture qui respecte l'identité culturelle africaine tout en intégrant les principes de durabilité.",
    cours: ["Architecture tropicale", "Urbanisme durable", "Design bioclimatique", "Histoire de l'architecture africaine"],
    publications: [
      "Nkosi, C. & Osei, K. (2022). \"Vernacular Architecture Principles Applied to Modern Urban Planning in Central Africa\", Journal of African Architecture.",
      "Nkosi, C. et al. (2021). \"Climate-Responsive Design Strategies for Public Buildings in Equatorial Regions\", Building and Environment.",
      "Nkosi, C. (2019). \"Reconciling Traditional and Contemporary Architectural Identities in Congolese Cities\", Urban Studies Journal."
    ]
  },
  {
    id: 5,
    nom: "Prof. Thomas Kabongo",
    photo: "/src/assets/teacher5.jpg",
    titre: "Professeur",
    departement: "Génie Mécanique",
    specialite: "Mécatronique et Systèmes Automatisés",
    email: "t.kabongo@uac.cd",
    telephone: "+243 345 678 912",
    bureau: "Bâtiment B, Bureau 204",
    bio: "Professeur Kabongo est un expert en systèmes mécatroniques et robotique industrielle. Avec un doctorat de l'Université Technique de Munich, il a travaillé pendant plus de 20 ans dans l'industrie avant de rejoindre l'UAC. Il apporte une perspective pratique et innovante à l'enseignement de la mécanique et de l'automatisation.",
    cours: ["Robotique industrielle", "Systèmes mécatroniques", "Conception mécanique assistée par ordinateur", "Automatisation industrielle"],
    publications: [
      "Kabongo, T. & Meyer, L. (2023). \"Low-Cost Robotics Solutions for African Manufacturing Industries\", Journal of Robotics and Automation.",
      "Kabongo, T. et al. (2021). \"Mechatronic Systems for Agricultural Applications in Sub-Saharan Africa\", Engineering in Agriculture.",
      "Kabongo, T. (2020). \"Adaptive Control Systems for Industrial Processes in Developing Countries\", Control Engineering Practice."
    ]
  },
];

const departements = ["Tous", "Génie Informatique", "Génie Civil", "Génie Électrique", "Génie Mécanique", "Architecture"];

const Enseignants = () => {
  const [selectedDepartement, setSelectedDepartement] = useState("Tous");
  const [selectedEnseignant, setSelectedEnseignant] = useState<(typeof enseignants)[0] | null>(null);

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

        <Tabs defaultValue="Tous" className="max-w-5xl mx-auto mb-8">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-uac-gray-light mb-8">
            {departements.map((dept) => (
              <TabsTrigger 
                key={dept} 
                value={dept}
                onClick={() => setSelectedDepartement(dept)}
              >
                {dept}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredEnseignants.map((enseignant) => (
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
                  <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    {selectedEnseignant && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{selectedEnseignant.nom}</DialogTitle>
                          <DialogDescription className="text-lg">
                            {selectedEnseignant.titre} en {selectedEnseignant.departement}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                          <div className="md:col-span-1">
                            <div className="aspect-square overflow-hidden rounded-md">
                              <img 
                                src={selectedEnseignant.photo} 
                                alt={selectedEnseignant.nom} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mt-4 space-y-3">
                              <h4 className="font-semibold">Coordonnées</h4>
                              <div className="flex items-center text-sm">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>{selectedEnseignant.email}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="w-4 h-4 mr-2" />
                                <span>{selectedEnseignant.telephone}</span>
                              </div>
                              <p className="text-sm pt-2">
                                <strong>Bureau:</strong> {selectedEnseignant.bureau}
                              </p>
                            </div>
                          </div>
                          <div className="md:col-span-2 space-y-6">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">Spécialisation</h3>
                              <p>{selectedEnseignant.specialite}</p>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold mb-2">Biographie</h3>
                              <p>{selectedEnseignant.bio}</p>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold mb-2">Cours enseignés</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                {selectedEnseignant.cours.map((cours, index) => (
                                  <li key={index}>{cours}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold mb-2">Publications récentes</h3>
                              <ul className="space-y-3">
                                {selectedEnseignant.publications.map((pub, index) => (
                                  <li key={index} className="border-l-2 border-uac-blue pl-3 py-1">
                                    {pub}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Enseignants;
