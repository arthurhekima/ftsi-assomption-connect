
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Phone } from "lucide-react";

const Administration = () => {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Administration de la FTSI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez l'équipe administrative qui assure le bon fonctionnement de notre faculté
          </p>
        </div>

        <Tabs defaultValue="equipe" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="equipe">Équipe administrative</TabsTrigger>
            <TabsTrigger value="horaires">Horaires et services</TabsTrigger>
          </TabsList>
          
          {/* Onglet Équipe administrative */}
          <TabsContent value="equipe">
            <div className="space-y-12">
              {/* Doyen */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Direction de la Faculté</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="col-span-1 lg:col-span-3 bg-uac-gray-light border-uac-blue shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 flex items-center justify-center">
                        <div className="aspect-square overflow-hidden rounded-full border-4 border-uac-blue w-48 h-48">
                          <img 
                            src="/src/assets/doyen.jpg" 
                            alt="Doyen de la FTSI" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 p-6">
                        <h3 className="text-2xl font-bold mb-1">Prof. Jean Mulumba</h3>
                        <p className="text-lg font-medium text-uac-blue mb-4">Doyen de la Faculté</p>
                        <p className="mb-4">
                          Le Professeur Jean Mulumba dirige la Faculté depuis 2018. Titulaire d'un doctorat en génie 
                          des systèmes de l'Université de Californie, il a apporté une vision moderne et internationale 
                          à notre institution.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-uac-blue" />
                            <span>doyen@ftsi-uac.cd</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-uac-blue" />
                            <span>+243 123 456 789</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-uac-blue" />
                            <span>Bâtiment A, Bureau 101</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
              
              {/* Équipe de direction */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Équipe de direction</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src="/src/assets/admin1.jpg" 
                            alt="Dr. Marie-Claire Kabongo" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle>Dr. Marie-Claire Kabongo</CardTitle>
                          <CardDescription>Vice-Doyenne Académique</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        Responsable des programmes académiques et de la qualité des enseignements. 
                        Coordonne les activités pédagogiques et supervise les évaluations.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>vd.academique@ftsi-uac.cd</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>Bâtiment A, Bureau 102</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src="/src/assets/admin2.jpg" 
                            alt="Prof. Joseph Lumumba" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle>Prof. Joseph Lumumba</CardTitle>
                          <CardDescription>Vice-Doyen à la Recherche</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        Coordonne les activités de recherche, les laboratoires et les publications scientifiques.
                        Gère les partenariats avec l'industrie et les autres institutions académiques.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>vd.recherche@ftsi-uac.cd</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>Bâtiment A, Bureau 103</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Services administratifs */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Services administratifs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Secrétariat académique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src="/src/assets/admin3.jpg" 
                            alt="Mme. Jeanne Kalonji" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Mme. Jeanne Kalonji</p>
                          <p className="text-sm text-muted-foreground">Secrétaire académique</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>secretariat.academique@ftsi-uac.cd</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>+243 234 567 890</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Gestion des dossiers étudiants, inscriptions, relevés de notes et diplômes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Service financier</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src="/src/assets/admin4.jpg" 
                            alt="M. Robert Mbala" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">M. Robert Mbala</p>
                          <p className="text-sm text-muted-foreground">Responsable financier</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>finance@ftsi-uac.cd</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>+243 345 678 901</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Gestion des frais académiques, bourses, paiements et budget de la faculté.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Service des stages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src="/src/assets/admin5.jpg" 
                            alt="Mme. Sophie Mutombo" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Mme. Sophie Mutombo</p>
                          <p className="text-sm text-muted-foreground">Coordinatrice des stages</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>stages@ftsi-uac.cd</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-uac-blue" />
                          <span>+243 456 789 012</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Coordination des stages professionnels, relations avec les entreprises et suivi des diplômés.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </TabsContent>
          
          {/* Onglet Horaires et services */}
          <TabsContent value="horaires">
            <Card>
              <CardHeader>
                <CardTitle>Horaires des services administratifs</CardTitle>
                <CardDescription>
                  Consultez les horaires d'ouverture des différents services administratifs de la faculté
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Horaires généraux</h3>
                    <table className="w-full border-collapse">
                      <thead className="bg-uac-blue text-white">
                        <tr>
                          <th className="p-3 text-left">Jour</th>
                          <th className="p-3 text-left">Matin</th>
                          <th className="p-3 text-left">Après-midi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-uac-gray-light divide-y divide-gray-200">
                        <tr>
                          <td className="p-3 font-medium">Lundi - Vendredi</td>
                          <td className="p-3">08h00 - 12h00</td>
                          <td className="p-3">14h00 - 17h00</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Samedi</td>
                          <td className="p-3">09h00 - 12h00</td>
                          <td className="p-3">Fermé</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Dimanche et jours fériés</td>
                          <td className="p-3" colSpan={2}>Fermé</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Services spécifiques</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Secrétariat académique</h4>
                          <p className="text-sm mb-2">Réception des étudiants :</p>
                          <ul className="text-sm space-y-1">
                            <li>Lundi, Mercredi, Vendredi : 09h00 - 12h00</li>
                            <li>Mardi, Jeudi : 14h00 - 16h00</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Service financier</h4>
                          <p className="text-sm mb-2">Paiements et questions financières :</p>
                          <ul className="text-sm space-y-1">
                            <li>Lundi - Vendredi : 08h30 - 11h30</li>
                            <li>Mardi, Jeudi : 14h30 - 16h30</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Bureau du Doyen</h4>
                          <p className="text-sm mb-2">Sur rendez-vous uniquement :</p>
                          <ul className="text-sm space-y-1">
                            <li>Mardi : 10h00 - 12h00</li>
                            <li>Jeudi : 14h00 - 16h00</li>
                          </ul>
                          <p className="text-sm mt-2">
                            Contactez le secrétariat du doyen pour prendre rendez-vous :
                            <br />secretariat.doyen@ftsi-uac.cd
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Services aux étudiants</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Bibliothèque universitaire</h4>
                          <ul className="text-sm space-y-1">
                            <li>Lundi - Vendredi : 08h00 - 20h00</li>
                            <li>Samedi : 09h00 - 16h00</li>
                            <li>Fermée pendant les vacances universitaires</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Laboratoires informatiques</h4>
                          <ul className="text-sm space-y-1">
                            <li>Lundi - Vendredi : 08h00 - 18h00</li>
                            <li>Samedi : 09h00 - 14h00</li>
                          </ul>
                          <p className="text-sm mt-2">
                            Accès libre en dehors des heures de cours programmés
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Service des stages</h4>
                          <ul className="text-sm space-y-1">
                            <li>Lundi, Mercredi : 09h00 - 12h00</li>
                            <li>Vendredi : 14h00 - 16h00</li>
                          </ul>
                          <p className="text-sm mt-2">
                            Pour les questions relatives aux stages et à l'insertion professionnelle
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md border">
                          <h4 className="font-semibold text-uac-blue mb-2">Service informatique</h4>
                          <ul className="text-sm space-y-1">
                            <li>Lundi - Vendredi : 09h00 - 17h00</li>
                          </ul>
                          <p className="text-sm mt-2">
                            Support technique, accès aux comptes et ressources numériques
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Périodes spéciales</h3>
                    <div className="bg-uac-gray-light p-4 rounded-md">
                      <p className="mb-2">
                        <strong>Vacances universitaires :</strong> Services administratifs ouverts avec horaires réduits (10h00 - 15h00)
                      </p>
                      <p className="mb-2">
                        <strong>Période d'inscriptions :</strong> Horaires étendus du secrétariat académique (08h00 - 18h00)
                      </p>
                      <p>
                        <strong>Sessions d'examens :</strong> Services aux étudiants ouverts selon des horaires spécifiques communiqués en période d'examens
                      </p>
                    </div>
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

export default Administration;
