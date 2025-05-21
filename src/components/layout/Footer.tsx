
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-uac-blue text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">FTSI - UAC</h3>
            <p className="mb-4">Faculté Technologique et des Sciences de l'Ingénieur de l'Université de l'Assomption au Congo</p>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 h-5 w-5" />
              <span>123 Avenue de l'Université, Kinshasa</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="mr-2 h-5 w-5" />
              <span>+243 123 456 789</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <span>contact@uac-ftsi.cd</span>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-uac-blue-light">Accueil</Link>
              </li>
              <li>
                <Link to="/formations" className="hover:text-uac-blue-light">Formations</Link>
              </li>
              <li>
                <Link to="/enseignants" className="hover:text-uac-blue-light">Enseignants</Link>
              </li>
              <li>
                <Link to="/etudiants" className="hover:text-uac-blue-light">Étudiants</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-uac-blue-light">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-4">À Propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/administration" className="hover:text-uac-blue-light">Administration</Link>
              </li>
              <li>
                <Link to="/missions" className="hover:text-uac-blue-light">Mission et Vision</Link>
              </li>
              <li>
                <Link to="/partenaires" className="hover:text-uac-blue-light">Partenaires</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Université de l'Assomption au Congo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
