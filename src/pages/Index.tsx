import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import resumeData from "@/data/resume.json";

const Index = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: resumeData.personal.name,
      jobTitle: resumeData.personal.title,
      email: resumeData.personal.email,
      telephone: resumeData.personal.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: resumeData.personal.location,
      },
      url: resumeData.personal.linkedin,
      sameAs: [resumeData.personal.linkedin, resumeData.personal.github],
      knowsAbout: resumeData.skills.technical.map((skill) => skill.name),
      alumniOf: {
        "@type": "EducationalOrganization",
        name: resumeData.education.institution,
      },
      worksFor: {
        "@type": "Organization",
        name: resumeData.experience[0].company,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Hero data={resumeData.personal} />
      <ExperienceSection experiences={resumeData.experience} />
      <SkillsSection skills={resumeData.skills} />
      <ProjectsSection projects={resumeData.projects} />
      <EducationSection
        education={resumeData.education}
        certificates={resumeData.certificates}
        talks={resumeData.talks}
      />
      
      {/* Footer */}
      <footer className="bg-card py-6 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {resumeData.personal.name}. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Index;
