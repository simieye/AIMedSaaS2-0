// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@/components/ui';
// @ts-ignore;
import { Play, X } from 'lucide-react';

export function TutorialModal({
  isOpen,
  onClose,
  video
}) {
  if (!video) return null;
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{video.title}</DialogTitle>
              <DialogDescription>
                时长: {video.duration}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe src={video.url} title={video.title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </DialogContent>
    </Dialog>;
}