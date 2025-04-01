'use client'

import PageHeader from '@/components/PageHeader'
import { useModal } from '@/hooks/useModal'

export default function ContactPage() {
  const { ModalComponent, showContactForm } = useModal()

  const handleContactClick = () => {
    showContactForm('Contact Page')
  }

  return (
    <main>
      <PageHeader
        title="Contact"
        description="Get in touch with us"
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=dc125484"
        darkText={true}
        className="text-primary"
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Visit Us</h2>
              <p className="text-text-light mb-2">Boulder, Colorado</p>
              <p className="text-text-light mb-6">(303) 900-8291</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Contact</h2>
              <button
                onClick={handleContactClick}
                className="text-accent hover:text-accent-light transition-colors underline"
              >
                Send us a message
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalComponent />
    </main>
  )
}
