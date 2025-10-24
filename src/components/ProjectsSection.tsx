import { FolderGit2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface Project {
  title: string;
  description: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);
  const AUTO_SCROLL_INTERVAL = 10000; // 10 seconds

  useEffect(() => {
    if (!api) return;

    let progressInterval: NodeJS.Timeout;
    let scrollTimeout: NodeJS.Timeout;

    const startAutoScroll = () => {
      setProgress(0);
      
      // Update progress bar smoothly
      const progressStep = 100 / (AUTO_SCROLL_INTERVAL / 50);
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + progressStep;
          return next >= 100 ? 100 : next;
        });
      }, 50);

      // Auto-scroll to next slide
      scrollTimeout = setTimeout(() => {
        api.scrollNext();
      }, AUTO_SCROLL_INTERVAL);
    };

    const resetAutoScroll = () => {
      clearInterval(progressInterval);
      clearTimeout(scrollTimeout);
      startAutoScroll();
    };

    // Start auto-scroll on mount
    startAutoScroll();

    // Reset timer when user manually navigates
    api.on("select", resetAutoScroll);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(scrollTimeout);
    };
  }, [api]);

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
          <FolderGit2 className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          Professional Projects
        </h2>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="h-full gradient-card shadow-custom-md transition-custom hover:shadow-custom-lg">
                  <CardHeader>
                    <CardTitle className="text-base leading-tight sm:text-lg">
                      ▶ {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Progress Bar */}
          <div className="mt-4 px-2">
            <Progress value={progress} className="h-1" />
          </div>
          
          <div className="mt-4 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
