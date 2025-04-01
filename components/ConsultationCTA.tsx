'use client'

import { useModal } from '@/hooks/useModal'

interface ConsultationCTAProps {
  source: string
}

export default function ConsultationCTA({ source }: ConsultationCTAProps) {
  const { ModalComponent, showContactForm } = useModal()

  return (
    <>
      <ModalComponent />
      <div className="bg-gradient-surface-dark py-section mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Transform Your Narrative?
            </h2>
            <p className="text-xl text-text-light mb-12">
              Take the first step toward crafting your authentic story with intention.
            </p>
            <button
              type="button"
              onClick={() => showContactForm(source)}
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom-dark hover:shadow-custom-dark-hover cursor-pointer"
            >
              Book a Private Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
