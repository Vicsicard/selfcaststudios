'use client'

import { useEffect, useRef, useState } from 'react'
import Plyr, { APITypes } from 'plyr-react'
import 'plyr-react/plyr.css'

interface VideoPlayerProps {
  src: string
  title: string
  description?: string
  poster?: string
  className?: string
  isVertical?: boolean
}

export default function VideoPlayer({ src, title, description, poster, className = '', isVertical = false }: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false)
  const playerRef = useRef<APITypes>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`aspect-video bg-surface-dark animate-pulse rounded-custom ${className}`} />
    )
  }

  return (
    <div className="video-container">
      {title && (
        <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      )}
      <div className={`relative ${isVertical ? 'max-w-sm mx-auto' : 'w-full'} ${className}`}>
        <Plyr
          ref={playerRef}
          source={{
            type: 'video',
            sources: [
              {
                src,
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
      {description && (
        <p className="text-text-light mt-4">{description}</p>
      )}
    </div>
  )
}
