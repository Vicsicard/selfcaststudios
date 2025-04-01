'use client'

import { useTabTitle } from '@/hooks/useTabTitle'

export default function DynamicTitle() {
  useTabTitle([
    'Self Cast Studios',
    'Shape Your Narrative',
    'Transform Your Story',
    'Elevate Your Brand'
  ])
  
  return null
}
