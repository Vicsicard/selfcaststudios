'use client'

import { useModal } from '@/hooks/useModal'

interface ConsultationCTAProps {
  source: string
  title?: string
  description?: string
  buttonText?: string
}

export default function ConsultationCTA({ 
  source,
  title = "Ready to Transform Your Narrative?",
  description = "Take the first step toward crafting your authentic story with intention.",
  buttonText = "Get Started"
}: ConsultationCTAProps) {
  const { ModalComponent, showContactForm } = useModal()

  return (
    <>
      <ModalComponent />
      <div className="bg-gradient-surface-dark py-section mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {title}
            </h2>
            <p className="text-xl text-text-light mb-12">
              {description}
            </p>
            <a
              href="https://www.selfcaststudios.com/get-started"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom-dark hover:shadow-custom-dark-hover cursor-pointer"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
