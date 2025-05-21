
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, School, User } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-section text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Faculté Technologique et des Sciences de l'Ingénieur
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Formez-vous aux métiers d'avenir avec excellence et innovation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-uac-blue hover:bg-gray-100">
              <Link to="/formations">Nos Formations</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/contact">Nous Contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">À Propos de la FTSI</h2>
              <p className="mb-4">
                La Faculté Technologique et des Sciences de l'Ingénieur (FTSI) de l'Université de l'Assomption au Congo (UAC) 
                est un centre d'excellence dédié à la formation d'ingénieurs et de techniciens hautement qualifiés.
              </p>
              <p className="mb-4">
                Fondée sur des valeurs d'excellence, d'innovation et d'éthique, notre faculté propose des formations de 
                haut niveau adaptées aux besoins du marché et aux défis technologiques actuels et futurs.
              </p>
              <p className="mb-8">
                Nos programmes couvrent les domaines du génie informatique, civil, électrique, mécanique et de l'architecture, 
                avec un corps professoral composé d'experts reconnus dans leurs domaines respectifs.
              </p>
              <Button asChild variant="outline">
                <Link to="/administration">En savoir plus</Link>
              </Button>
            </div>
            <div className="bg-uac-gray-light p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Message du Doyen</h3>
              <div className="flex flex-col sm:flex-row gap-6 items-center mb-4">
                <img 
                  src="/src/assets/doyen.jpg" 
                  alt="Doyen de la FTSI" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-uac-blue"
                />
                <div>
                  <h4 className="text-xl font-semibold">Prof. Jean Mulumba</h4>
                  <p className="text-uac-gray">Doyen de la Faculté</p>
                </div>
              </div>
              <blockquote className="italic border-l-4 border-uac-blue pl-4">
                "Notre mission est de former des ingénieurs compétents, créatifs et responsables, capables de relever les défis 
                technologiques et de contribuer au développement durable de notre pays. Nous nous engageons à offrir un 
                environnement propice à l'apprentissage et à l'innovation."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-uac-gray-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Pourquoi Choisir la FTSI?</h2>
          <p className="text-xl text-uac-gray mb-12 max-w-3xl mx-auto">
            Découvrez les avantages uniques que notre faculté offre aux étudiants
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <GraduationCap className="w-12 h-12 mx-auto text-uac-blue mb-2" />
                <CardTitle>Formations de Qualité</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Programmes conformes aux standards internationaux, actualisés régulièrement pour répondre aux évolutions technologiques.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <User className="w-12 h-12 mx-auto text-uac-blue mb-2" />
                <CardTitle>Corps Professoral Expert</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Enseignants qualifiés et expérimentés, combinant expertise académique et expérience pratique dans l'industrie.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <School className="w-12 h-12 mx-auto text-uac-blue mb-2" />
                <CardTitle>Infrastructures Modernes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Laboratoires équipés, bibliothèque riche, salles informatiques à la pointe et espaces d'apprentissage collaboratif.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Campus Photos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Notre Campus</h2>
          <p className="text-xl text-uac-gray mb-12 text-center max-w-3xl mx-auto">
            Découvrez les installations modernes de notre faculté
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/src/assets/campus1.jpg" 
                alt="Bâtiment principal de la FTSI" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/src/assets/campus2.jpg" 
                alt="Laboratoire informatique" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/src/assets/campus3.jpg" 
                alt="Bibliothèque universitaire" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-uac-blue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-3xl font-bold mb-6">Prêt à Rejoindre la FTSI?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Commencez votre parcours vers une carrière prometteuse dans le domaine technologique et de l'ingénierie.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-uac-blue hover:bg-gray-100">
              <Link to="/etudiants">S'inscrire Maintenant</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/10">
              <Link to="/contact">Nous Contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
