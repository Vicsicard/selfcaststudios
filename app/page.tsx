'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useModal } from '@/hooks/useModal'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function HomePage() {
  const { ModalComponent, showContactForm } = useModal()

  const services = [
    {
      title: 'Narrative Defense',
      description: 'Protect and preserve your professional reputation during challenging transitions.',
      href: '/services/narrative-defense'
    },
    {
      title: 'Narrative Elevation',
      description: 'Transform your personal brand into a powerful platform for thought leadership.',
      href: '/services/narrative-elevation'
    },
    {
      title: 'Narrative Transition',
      description: 'Navigate career changes while maintaining the value of your experience.',
      href: '/services/narrative-transition'
    }
  ]

  return (
    <main>
      <ModalComponent />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-surface-dark">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-surface-darker opacity-45" />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
                Your Story. Your Voice.
                <span className="gradient-text block">Cast with Intention.</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-light mb-8">
                Take control of your narrative before others define it for you.
              </p>
              <button
                onClick={() => showContactForm('Home Hero')}
                className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom-dark hover:shadow-custom-dark-hover"
              >
                Book a Private Consultation
              </button>
            </div>

            {/* Featured Video */}
            <div className="card-elevated p-8 md:p-12 shadow-custom-dark hover:shadow-custom-dark-hover transition-shadow">
              <VideoPlayer
                src="https://imagestopost.carrd.co/assets/videos/video08.mp4?v=fa27f6da"
                title="Welcome to Self Cast Studios"
                description="See how we help professionals like you craft and control their narrative with intention."
                className="shadow-custom-dark brightness-[85%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-surface py-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service.title}
                className="card p-8 hover-lift shadow-custom-dark hover:shadow-custom-dark-hover transition-shadow"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-text-light mb-6">
                  {service.description}
                </p>
                <div className="flex gap-4">
                  <Link
                    href={service.href}
                    className="text-accent hover:text-accent-light transition-colors hover-underline"
                  >
                    Learn More →
                  </Link>
                  <button
                    onClick={() => showContactForm(`Service - ${service.title}`)}
                    className="text-accent hover:text-accent-light transition-colors hover-underline"
                  >
                    Contact Us →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-surface-dark py-section">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Own Your Narrative?
            </h2>
            <p className="text-xl text-text-light mb-12">
              Take the first step toward transforming your personal brand and controlling your story.
            </p>
            <button
              onClick={() => showContactForm('Home CTA')}
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom-dark hover:shadow-custom-dark-hover"
            >
              Book a Private Consultation
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
