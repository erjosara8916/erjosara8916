import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ExternalLink, X, Globe } from 'lucide-react';
import { useExternalLink } from '../contexts/ExternalLinkContext';

export const GlobalExternalLinkModal = () => {
  const { linkData, isOpen, closeLink } = useExternalLink();

  if (!isOpen || !linkData) {
    return null;
  }

  const handleExternalLink = () => {
    window.open(linkData.url, '_blank', 'noopener,noreferrer');
  };

  // Verificar si la URL es válida para iframe (algunas páginas bloquean iframes)
  const isValidForIframe = (url: string): boolean => {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      // Lista de dominios que típicamente bloquean iframes
      const blockedDomains = [
        'github.com', 'linkedin.com', 'twitter.com', 'x.com', 'facebook.com', 'python.org',
        'www.php.net', 'developer.mozilla.org', 'www.oracle.com', 'cloud.google.com', 'aws.amazon.com'
      ];
      return !blockedDomains.some(blocked => domain.includes(blocked));
    } catch {
      return false;
    }
  };

  const canShowInIframe = isValidForIframe(linkData.url);

  // Si no puede mostrarse en iframe, abrir directamente en nueva pestaña
  if (!canShowInIframe) {
    handleExternalLink();
    closeLink();
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-6xl h-[90vh]">
        <Card className="overflow-hidden h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold truncate">{linkData.title}</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExternalLink}
                className="h-8 text-xs"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Abrir original
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLink}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="relative w-full h-full">
              <iframe
                src={linkData.url}
                title={linkData.title}
                className="h-full w-full border-0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onError={() => {
                  handleExternalLink();
                  closeLink();
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};