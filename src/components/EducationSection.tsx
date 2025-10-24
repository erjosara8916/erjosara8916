import { GraduationCap, Award, Megaphone, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Certificate {
  name: string;
  issuer: string;
  url: string;
}

interface Talk {
  title: string;
  type: string;
  language?: string;
  url: string;
}

interface EducationSectionProps {
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  };
  certificates: Certificate[];
  talks: Talk[];
}

export const EducationSection = ({ education, certificates, talks }: EducationSectionProps) => {
  return (
    <section className="bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-5xl space-y-6">
        {/* Education */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
            <GraduationCap className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            Education
          </h2>
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{education.degree}</CardTitle>
              <p className="text-sm font-medium text-muted-foreground sm:text-base">
                {education.institution}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {education.startDate} - {education.endDate}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates - Accordion to save space */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
            <Award className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            Certificates
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="certificates" className="border rounded-lg px-4 bg-card shadow-custom-sm">
              <AccordionTrigger className="text-sm sm:text-base hover:no-underline">
                View {certificates.length} Professional Certificates
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 rounded-md border border-border bg-muted/50 p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium sm:text-base">{cert.name}</p>
                        <p className="text-xs text-muted-foreground sm:text-sm">{cert.issuer}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-fit text-xs sm:text-sm"
                        asChild
                      >
                        <a href={cert.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                          View
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Conference Talks */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
            <Megaphone className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            Conference Talks
          </h2>
          <div className="space-y-3">
            {talks.map((talk, index) => (
              <Card key={index} className="shadow-custom-sm transition-custom hover:shadow-custom-md">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-medium sm:text-base">{talk.title}</p>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {talk.type} {talk.language && `• ${talk.language}`}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit text-xs sm:text-sm"
                    asChild
                  >
                    <a href={talk.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Watch
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
