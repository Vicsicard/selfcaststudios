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
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-surface rounded-custom shadow-custom p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-3">Visit Us</h2>
                  <p className="text-text-light mb-2">Boulder, Colorado</p>
                  <p className="text-text-light">(303) 900-8291</p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-custom shadow-custom p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-3">Contact</h2>
                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center px-6 py-3 bg-accent text-text-white rounded-custom hover:bg-accent-light transition-colors shadow-custom hover:shadow-custom-hover"
                  >
                    <span>Send us a message</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-surface rounded-custom shadow-custom p-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Business Hours</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Weekdays</h3>
                    <p className="text-text-light">Monday - Friday</p>
                    <p className="text-text-light">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Weekend</h3>
                    <p className="text-text-light">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-text-light">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalComponent />
    </main>
  )
}
