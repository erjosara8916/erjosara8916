import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExternalLink } from "@/contexts/ExternalLinkContext";

interface Experience {
  company: string;
  website?: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const { openLink } = useExternalLink();

  // Ordenar experiencias: "Present" primero, luego por endDate descendente
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    if (a.current && b.current) return 0;
    
    // Para experiencias no actuales, ordenar por endDate descendente
    const aDate = new Date(a.endDate);
    const bDate = new Date(b.endDate);
    return bDate.getTime() - aDate.getTime();
  });

  // Crear un valor único para cada experiencia basado en la empresa
  const getTabValue = (company: string) => {
    return company.toLowerCase().replace(/\s+/g, '-');
  };

  // Obtener la primera experiencia como valor por defecto
  const defaultTab = sortedExperiences.length > 0 ? getTabValue(sortedExperiences[0].company) : '';

  const handleCompanyClick = (exp: Experience) => {
    if (exp.website) {
      openLink({
        title: exp.company,
        url: exp.website,
        description: `Sitio web oficial de ${exp.company}`,
        buttonText: "Ver empresa"
      });
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
          <FaBriefcase className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          Professional Experience
        </h2>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-6 grid w-full h-auto" style={{ gridTemplateColumns: `repeat(${sortedExperiences.length}, 1fr)` }}>
            {sortedExperiences.map((exp) => (
              <TabsTrigger 
                key={exp.company} 
                value={getTabValue(exp.company)} 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:tab-active data-[state=inactive]:tab-inactive"
              >
                {exp.company}
              </TabsTrigger>
            ))}
          </TabsList>

          {sortedExperiences.map((exp) => (
            <TabsContent key={exp.company} value={getTabValue(exp.company)} className="animate-fade-in">
              <Card className="gradient-card shadow-custom-md transition-custom hover:shadow-custom-lg">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">{exp.position}</CardTitle>
                      {exp.website ? (
                        <button
                          onClick={() => handleCompanyClick(exp)}
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer text-left"
                        >
                          {exp.company}
                        </button>
                      ) : (
                        <p className="text-sm font-medium text-muted-foreground sm:text-base">
                          {exp.company}
                        </p>
                      )}
                    </div>
                    {exp.current && (
                      <Badge className="w-fit bg-primary text-primary-foreground">
                        Current
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FaCalendarAlt className="h-4 w-4" />
                    <span>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FaMapMarkerAlt className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm leading-relaxed text-foreground">
                      {exp.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
