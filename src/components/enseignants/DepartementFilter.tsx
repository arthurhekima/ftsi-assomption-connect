
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DepartementFilterProps = {
  departements: string[];
  selectedDepartement: string;
  onDepartementChange: (departement: string) => void;
};

const DepartementFilter = ({ departements, selectedDepartement, onDepartementChange }: DepartementFilterProps) => {
  return (
    <Tabs defaultValue={selectedDepartement} className="max-w-5xl mx-auto mb-8">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-uac-gray-light mb-8">
        {departements.map((dept) => (
          <TabsTrigger 
            key={dept} 
            value={dept}
            onClick={() => onDepartementChange(dept)}
          >
            {dept}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default DepartementFilter;
