
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Requête pour obtenir le nombre d'enseignants
  const { data: enseignantsCount } = useQuery({
    queryKey: ['enseignantsCount'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('enseignants')
        .select('*', { count: 'exact', head: true });
        
      if (error) throw error;
      return count || 0;
    }
  });
  
  // Requête pour obtenir le nombre de photos
  const { data: photosCount } = useQuery({
    queryKey: ['photosCount'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('photos_campus')
        .select('*', { count: 'exact', head: true });
        
      if (error) throw error;
      return count || 0;
    }
  });
  
  // Requête pour obtenir le nombre d'horaires
  const { data: horairesCount } = useQuery({
    queryKey: ['horairesCount'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('horaires')
        .select('*', { count: 'exact', head: true });
        
      if (error) throw error;
      return count || 0;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue dans l'interface d'administration de FTSI UAC</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Enseignants</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enseignantsCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Enseignants enregistrés
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Photos du Campus</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 8v13H3V8" />
              <path d="M1 3h22v5H1z" />
              <path d="M10 12h4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photosCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Photos publiées
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Horaires</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{horairesCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Horaires publiés
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Présentation du panel d'administration</CardTitle>
            <CardDescription>
              Ce tableau de bord vous permet de gérer le contenu du site web FTSI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              En tant qu'administrateur, vous pouvez :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gérer les profils des enseignants (ajouter, modifier, supprimer)</li>
              <li>Ajouter et gérer des photos du campus</li>
              <li>Gérer les horaires des cours et les rendre disponibles en téléchargement</li>
              <li>Contrôler quels utilisateurs ont accès à l'administration</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Utilisez le menu de gauche pour accéder aux différentes sections d'administration.
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Votre compte</CardTitle>
            <CardDescription>
              Détails de votre compte administrateur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">ID utilisateur</p>
              <p className="text-sm text-muted-foreground">{user?.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Rôle</p>
              <p className="text-sm text-muted-foreground">Administrateur</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
