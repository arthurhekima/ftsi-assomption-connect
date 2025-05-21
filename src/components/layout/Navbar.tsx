
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Accueil", path: "/" },
  { name: "Formations", path: "/formations" },
  { name: "Enseignants", path: "/enseignants" },
  { name: "Étudiants", path: "/etudiants" },
  { name: "Administration", path: "/administration" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-uac-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">UAC</span>
            </div>
            <div className="hidden md:block">
              <div className="text-uac-blue font-bold text-xl">FTSI</div>
              <div className="text-uac-gray-dark text-sm">Université de l'Assomption au Congo</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="px-3 py-2 rounded-md hover:bg-uac-gray-light text-uac-gray-dark hover:text-uac-blue transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-80" : "max-h-0"
        )}>
          <div className="flex flex-col pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 rounded-md hover:bg-uac-gray-light text-uac-gray-dark hover:text-uac-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
