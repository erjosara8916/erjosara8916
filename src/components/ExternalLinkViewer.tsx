import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ExternalLink, Globe } from 'lucide-react';
import { useExternalLink } from '../contexts/ExternalLinkContext';

interface ExternalLinkViewerProps {
  title: string;
  url: string;
  description?: string;
  buttonText?: string;
}

export const ExternalLinkViewer = ({ 
  title, 
  url, 
  description, 
  buttonText = "Ver sitio"
}: ExternalLinkViewerProps) => {
  const { openLink } = useExternalLink();

  const handleOpenViewer = () => {
    openLink({
      title,
      url,
      description,
      buttonText
    });
  };

  const handleExternalLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="shadow-custom-sm transition-custom hover:shadow-custom-md">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="mb-1 text-sm font-medium sm:text-base">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground sm:text-sm">
              {description}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="w-fit text-xs sm:text-sm"
            onClick={handleOpenViewer}
          >
            <Globe className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            {buttonText}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-fit text-xs sm:text-sm"
            onClick={handleExternalLink}
          >
            <ExternalLink className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            Abrir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};