'use client'

import { useEffect } from 'react'

export function useTabTitle(messages: string[] = ['Self Cast Studios', 'Shape Your Narrative']) {
  useEffect(() => {
    const originalTitle = document.title
    let interval: NodeJS.Timeout | null = null

    const handleVisibilityChange = () => {
      if (document.hidden) {
        let messageIndex = 0
        interval = setInterval(() => {
          document.title = messages[messageIndex]
          messageIndex = (messageIndex + 1) % messages.length
        }, 1000)
      } else {
        if (interval) {
          clearInterval(interval)
          interval = null
        }
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [messages])
}
