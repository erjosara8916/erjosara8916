import { 
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiMysql,
  SiMongodb,
  SiGooglecloud,
  SiAmazon,
  SiLinux,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGitlab,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiPostgresql,
  SiFirebase,
  SiJira,
  SiPostman,
  SiDbeaver,
  SiJetbrains,
  SiSpringboot,
  SiDjango,
  SiNestjs,
  SiExpress,
  SiMagento

} from "react-icons/si";
import { 
  FaCode, 
  FaLightbulb, 
  FaWrench, 
  FaFileAlt, 
  FaServer, 
  FaCoffee, 
  FaBolt, 
  FaDatabase, 
  FaLeaf, 
  FaCloud, 
  FaTerminal, 
  FaDesktop, 
  FaDocker, 
  FaGitAlt, 
  FaChartBar, 
  FaFire,
  FaJava,
  FaWindows 
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExternalLink } from "@/contexts/ExternalLinkContext";

interface Skill {
  name: string;
  icon: string;
  category: string;
  url?: string;
}

interface SkillsSectionProps {
  skills: {
    technical: Skill[];
  };
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const { openLink } = useExternalLink();

  const categories = {
    language: "Programming Languages",
    runtime: "Runtime & Frameworks",
    database: "Databases",
    cloud: "Cloud Platforms",
    os: "Operating Systems",
    devops: "DevOps & Containers",
    vcs: "Version Control",
    tool: "Development Tools",
    concept: "Development Concepts",
    methodology: "Methodologies & Practices"
  };

  // Mapeo de iconos de react-icons
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    // Iconos específicos de tecnologías
    TypeScript: SiTypescript,
    Node: SiNodedotjs,
    Python: SiPython,
    Java: FaJava,
    PHP: SiPhp,
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    GCP: SiGooglecloud,
    AWS: SiAmazon,
    Azure: FaCloud,
    Linux: SiLinux,
    Windows: FaWindows,
    Docker: SiDocker,
    Kubernetes: SiKubernetes,
    GitHubActions: SiGithubactions,
    Gitlab: SiGitlab,
    Git: SiGit,
    GitLab: SiGitlab,
    GitHub: SiGithub,
    Bitbucket: SiBitbucket,
    Postgres: SiPostgresql,
    Firebase: SiFirebase,
    Jira: SiJira,
    Postman: SiPostman,
    VSCode: FaCode,
    DBeaver: SiDbeaver,
    Datagrip: SiJetbrains,
    SpringBoot: SiSpringboot,
    Django: SiDjango,
    NestJs: SiNestjs,
    Express: SiExpress,
    Magento: SiMagento,
    // Iconos genéricos
    FileText: FaFileAlt,
    Server: FaServer,
    Code: FaCode,
    Coffee: FaCoffee,
    Zap: FaBolt,
    Database: FaDatabase,
    Leaf: FaLeaf,
    Cloud: FaCloud,
    Terminal: FaTerminal,
    Monitor: FaDesktop,
    Container: FaDocker,
    GitBranch: FaGitAlt,
    BarChart: FaChartBar,
    Flame: FaFire
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  const groupedSkills = skills.technical.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleSkillClick = (skill: Skill) => {
    if (skill.url) {
      openLink({
        title: skill.name,
        url: skill.url,
        description: `Documentación oficial de ${skill.name}`,
        buttonText: "Ver documentación"
      });
    }
  };

  return (
    <section className="bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
          <FaCode className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          Technical Skills
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category} className="shadow-custom-sm transition-custom hover:shadow-custom-md">
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
                      className={`text-xs sm:text-sm flex items-center gap-1 ${
                        skill.url ? 'cursor-pointer hover:bg-primary/20 transition-colors' : ''
                      }`}
                      onClick={() => handleSkillClick(skill)}
                    >
                      {getIcon(skill.icon)}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
