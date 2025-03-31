'use client'

import { useEffect, useRef } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface VideoPlayerProps {
  src: string;
  title?: string;
  description?: string;
  poster?: string;
  className?: string;
  isVertical?: boolean;
}

export default function VideoPlayer({ src, title, description, poster, className = '', isVertical = false }: VideoPlayerProps) {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = videoRef.current;
      // Any player initialization can go here
    }
  }, []);

  return (
    <div className="video-container">
      {(title || description) && (
        <div className="mt-4 text-center">
          {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
          {description && <p className="text-text-light">{description}</p>}
        </div>
      )}
      <div className={`relative ${isVertical ? 'max-w-sm mx-auto' : 'w-full'} ${className}`}>
        <Plyr
          ref={videoRef}
          source={{
            type: 'video',
            sources: [
              {
                src: src,
                type: 'video/mp4',
              },
            ],
          }}
          options={{
            controls: [
              'play-large',
              'play',
              'progress',
              'current-time',
              'mute',
              'volume',
              'fullscreen',
            ],
          }}
        />
      </div>
    </div>
  );
}
