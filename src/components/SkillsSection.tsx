import { Code, Lightbulb, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

interface SkillsSectionProps {
  skills: {
    technical: Skill[];
    concepts: string[];
    others: string[];
  };
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const categories = {
    language: "Languages",
    runtime: "Runtime",
    database: "Databases",
    cloud: "Cloud",
    os: "Operating Systems",
    devops: "DevOps",
    vcs: "Version Control",
    tool: "Tools"
  };

  const groupedSkills = skills.technical.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
          <Code className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          Technical Skills
        </h2>

        <Tabs defaultValue="technical" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="technical" className="text-xs sm:text-sm">
              Technical
            </TabsTrigger>
            <TabsTrigger value="concepts" className="text-xs sm:text-sm">
              Concepts
            </TabsTrigger>
            <TabsTrigger value="others" className="text-xs sm:text-sm">
              Others
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="animate-fade-in">
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <Card key={category} className="shadow-custom-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">
                      {categories[category as keyof typeof categories]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs sm:text-sm"
                        >
                          {skill.icon} {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concepts" className="animate-fade-in">
            <Card className="shadow-custom-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Development Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.concepts.map((concept, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-primary text-primary text-xs sm:text-sm"
                    >
                      💡 {concept}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="others" className="animate-fade-in">
            <Card className="shadow-custom-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Wrench className="h-5 w-5 text-primary" />
                  Additional Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.others.map((other, index) => (
                    <Badge
                      key={index}
                      className="bg-accent text-accent-foreground text-xs sm:text-sm"
                    >
                      🔧 {other}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
