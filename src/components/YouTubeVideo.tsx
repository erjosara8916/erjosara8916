import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, ExternalLink, X } from 'lucide-react';
import { YouTubeIcon } from './icons/YouTubeIcon';

interface YouTubeVideoProps {
  title: string;
  url: string;
  type?: string;
  language?: string;
}

export const YouTubeVideo = ({ title, url, type, language }: YouTubeVideoProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Extraer el ID del video de YouTube de la URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  const handleOpenVideo = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  const handleExternalLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!videoId) {
    return (
      <Card className="shadow-custom-sm transition-custom hover:shadow-custom-md">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium sm:text-base">{title}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {type} {language && `• ${language}`}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-fit text-xs sm:text-sm"
            onClick={handleExternalLink}
          >
            <ExternalLink className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            Watch
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-custom-sm transition-custom hover:shadow-custom-md">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium sm:text-base">{title}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {type} {language && `• ${language}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="w-fit text-xs sm:text-sm"
              onClick={handleOpenVideo}
            >
              <YouTubeIcon size={16} className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              Play
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal para mostrar el video */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <YouTubeIcon size={20} className="text-red-600" />
                  <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseVideo}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video w-full">
                  <iframe
                    src={embedUrl}
                      title={title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
