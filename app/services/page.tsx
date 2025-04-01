'use client'

import PageHeader from '@/components/PageHeader'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Modal from '@/components/Modal'
import ContactForm from '@/components/ContactForm'
import { useState } from 'react'
import SuccessMessage from '@/components/SuccessMessage'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function ServicesPage() {
  const services = [
    {
      title: 'Narrative Defense',
      description: 'Elevate Your Story. Defend Your Reputation.',
      features: [
        'Strategic narrative assessment and protection',
        'Crisis communication planning',
        'Reputation management strategies',
        'Digital presence fortification'
      ],
      link: '/services/narrative-defense'
    },
    {
      title: 'Narrative Elevation',
      description: 'Your Story. Your Voice. Cast with Intention.',
      features: [
        'Personal brand development',
        'Content strategy and creation',
        'Audience engagement optimization',
        'Platform-specific storytelling'
      ],
      link: '/services/narrative-elevation'
    },
    {
      title: 'Narrative Transition',
      description: 'A Source of Truth for Transformational Moments',
      features: [
        'Transition strategy development',
        'Message refinement and adaptation',
        'Stakeholder communication planning',
        'New narrative implementation'
      ],
      link: '/services/narrative-transition'
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setIsModalOpen(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <main>
      <PageHeader
        title="Our Services"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />
      
      <div className="container mx-auto px-4 py-section">
        <div className="grid gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-surface rounded-custom shadow-custom p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {service.title}
                  {service.link && (
                    <Link 
                      href={service.link}
                      className="ml-4 text-lg text-accent hover:text-accent-light transition-colors"
                    >
                      Learn More →
                    </Link>
                  )}
                </h2>
                <p className="text-lg text-text-light mb-8">
                  {service.description}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-accent mr-3">•</span>
                          <span className="text-text-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {service.link && (
                      <div className="pt-4">
                        <Link 
                          href={service.link}
                          className="text-accent hover:text-accent-light transition-colors"
                        >
                          Learn More About {service.title} →
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="bg-primary-light/5 rounded-custom p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      Consultation Process
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-accent font-semibold mr-3">1.</span>
                        <span className="text-text-light">Initial Assessment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent font-semibold mr-3">2.</span>
                        <span className="text-text-light">Strategy Development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent font-semibold mr-3">3.</span>
                        <span className="text-text-light">Implementation Plan</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent font-semibold mr-3">4.</span>
                        <span className="text-text-light">Ongoing Support</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Ready to Transform Your Narrative?
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
          >
            Book a Private Consultation
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm sourcePage="services" onSuccess={handleSuccess} />
      </Modal>

      {showSuccess && (
        <SuccessMessage 
          message="Thank you for your interest! We'll be in touch soon."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </main>
  )
}
