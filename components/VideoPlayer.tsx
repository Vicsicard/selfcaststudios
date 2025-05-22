'use client'

import { useRef, useEffect } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import VideoJsonLd from './structured-data/VideoJsonLd'

interface VideoPlayerProps {
  src: string
  title?: string
  description?: string
  poster?: string
  className?: string
  isVertical?: boolean
  uploadDate?: string
  duration?: string
}

export default function VideoPlayer({ 
  src, 
  title, 
  description, 
  poster, 
  className = '', 
  isVertical = false,
  uploadDate = new Date().toISOString(),
  duration
}: VideoPlayerProps) {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = videoRef.current;
      new Plyr(player);
    }
  }, []);

  // Generate thumbnail URL from video if no poster provided
  const thumbnailUrl = poster || src.replace(/\.(mp4|webm)/, '.jpg')

  return (
    <>
      {title && description && (
        <VideoJsonLd
          name={title}
          description={description}
          thumbnailUrl={thumbnailUrl}
          uploadDate={uploadDate}
          contentUrl={src}
          duration={duration}
        />
      )}
      <div className={`video-container ${isVertical ? 'py-4' : ''}`}>
        {(title || description) && (
          <div className="mt-4 text-center">
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            {description && <p className="text-text-light">{description}</p>}
          </div>
        )}
        <div className={`relative ${className} ${isVertical ? 'aspect-[9/16] max-w-xs md:max-w-sm mx-auto' : 'aspect-video'}`}>
          <video
            ref={videoRef}
            data-plyr-provider="html5"
            data-plyr-embed-id={src}
            poster={poster}
            className="w-full h-full object-cover rounded-custom"
          >
            <source
              src={src}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  )
}
