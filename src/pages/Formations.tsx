
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const filieres = [
  {
    id: "info",
    name: "Génie Informatique",
    duree: "5 ans",
    grade: "Licencié en Génie Informatique",
    description: "Formation en conception et développement de systèmes informatiques, réseaux, intelligence artificielle et sécurité.",
    matieres: ["Programmation", "Structures de données", "Réseaux informatiques", "Intelligence artificielle", "Bases de données", "Systèmes d'exploitation", "Génie logiciel", "Cybersécurité"],
    debouches: ["Développeur logiciel", "Administrateur système", "Ingénieur réseau", "Data scientist", "Analyste en cybersécurité", "Chef de projets IT"]
  },
  {
    id: "civil",
    name: "Génie Civil",
    duree: "5 ans",
    grade: "Licencié en Génie Civil",
    description: "Formation en conception, construction et maintenance des infrastructures et bâtiments dans le respect des normes environnementales.",
    matieres: ["Mécanique des structures", "Résistance des matériaux", "Hydraulique", "Topographie", "Béton armé", "Construction métallique", "Mécanique des sols", "Géotechnique"],
    debouches: ["Ingénieur structures", "Conducteur de travaux", "Chef de projet BTP", "Ingénieur d'études", "Responsable de chantier", "Ingénieur conseil"]
  },
  {
    id: "elec",
    name: "Génie Électrique",
    duree: "5 ans",
    grade: "Licencié en Génie Électrique",
    description: "Formation en conception et optimisation des systèmes électriques, automatisation, et énergies renouvelables.",
    matieres: ["Électronique", "Électrotechnique", "Automatique", "Télécommunications", "Énergies renouvelables", "Informatique industrielle", "Réseaux électriques", "Électronique de puissance"],
    debouches: ["Ingénieur électronicien", "Ingénieur en automatisme", "Responsable maintenance", "Ingénieur télécoms", "Spécialiste en énergies renouvelables", "Concepteur de systèmes embarqués"]
  },
  {
    id: "meca",
    name: "Génie Mécanique",
    duree: "5 ans",
    grade: "Licencié en Génie Mécanique",
    description: "Formation en conception, analyse et fabrication de systèmes mécaniques et thermiques, maintenance industrielle.",
    matieres: ["Mécanique générale", "Thermodynamique", "Résistance des matériaux", "CAO", "Fabrication mécanique", "Maintenance industrielle", "Machines thermiques", "Matériaux"],
    debouches: ["Ingénieur de conception", "Ingénieur de production", "Responsable maintenance", "Ingénieur qualité", "Chef de projet technique", "Dessinateur industriel"]
  },
  {
    id: "archi",
    name: "Architecture",
    duree: "5 ans",
    grade: "Licencié en Architecture",
    description: "Formation en conception architecturale, urbanisme et aménagement des espaces dans une perspective durable.",
    matieres: ["Dessin d'architecture", "Histoire de l'art", "Construction", "Urbanisme", "Architecture durable", "Infographie", "Matériaux de construction", "Projet architectural"],
    debouches: ["Architecte", "Urbaniste", "Chef de projet", "Designer d'intérieur", "Consultant en architecture durable", "Maître d'œuvre"]
  }
];

const Formations = () => {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Formations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos filières de formation et leurs spécificités pour faire le meilleur choix pour votre avenir professionnel
          </p>
        </div>

        <Tabs defaultValue="info" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-uac-gray-light mb-8">
            {filieres.map((filiere) => (
              <TabsTrigger 
                key={filiere.id} 
                value={filiere.id}
                className="text-sm md:text-base"
              >
                {filiere.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {filieres.map((filiere) => (
            <TabsContent key={filiere.id} value={filiere.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">{filiere.name}</CardTitle>
                  <CardDescription className="text-lg">
                    {filiere.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-uac-gray-light p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Durée</h3>
                      <p>{filiere.duree}</p>
                    </div>
                    <div className="bg-uac-gray-light p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Diplôme</h3>
                      <p>{filiere.grade}</p>
                    </div>
                    <div className="bg-uac-gray-light p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Langue d'enseignement</h3>
                      <p>Français</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Matières principales</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      {filiere.matieres.map((matiere, index) => (
                        <div key={index} className="bg-secondary/20 p-2 rounded-md text-center">
                          {matiere}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Débouchés professionnels</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
                      {filiere.debouches.map((debouche, index) => (
                        <li key={index}>{debouche}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button asChild>
                      <a href="/etudiants">S'inscrire à cette formation</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Formations;
