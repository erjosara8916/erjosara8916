import { Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
          <Briefcase className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          Professional Experience
        </h2>
        
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index} className="gradient-card shadow-custom-md transition-custom hover:shadow-custom-lg animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">{exp.position}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground sm:text-base">
                      {exp.company}, {exp.location}
                    </p>
                  </div>
                  {exp.current && (
                    <Badge className="w-fit bg-primary text-primary-foreground">
                      Current
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
