
import { useAuth } from '@/hooks/use-auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigate, Link, Outlet } from 'react-router-dom';

const AdminSidebar = () => {
  const menuItems = [
    { name: 'Tableau de bord', path: '/admin' },
    { name: 'Enseignants', path: '/admin/enseignants' },
    { name: 'Photos du Campus', path: '/admin/photos' },
    { name: 'Horaires', path: '/admin/horaires' },
    { name: 'Retour au site', path: '/' }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-50 border-r min-h-screen p-4">
      <div className="text-xl font-bold mb-6 text-uac-blue">Administration FTSI</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-4 py-2 rounded-md hover:bg-slate-200 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const MobileNav = () => {
  const menuItems = [
    { name: 'Tableau de bord', path: '/admin' },
    { name: 'Enseignants', path: '/admin/enseignants' },
    { name: 'Photos du Campus', path: '/admin/photos' },
    { name: 'Horaires', path: '/admin/horaires' },
    { name: 'Retour au site', path: '/' }
  ];
  
  return (
    <div className="md:hidden border-b py-3 px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <div className="text-xl font-bold mb-6 text-uac-blue">Administration FTSI</div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 rounded-md hover:bg-slate-200 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default function AdminLayout() {
  const { isAdmin, loading } = useAuth();
  
  // Si la vérification est en cours, afficher un écran de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uac-blue mx-auto"></div>
          <p className="mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas administrateur, le rediriger vers la page d'accueil
  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MobileNav />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
