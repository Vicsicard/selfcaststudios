'use client'

import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'
import { useModal } from '@/hooks/useModal'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function AboutPage() {
  const beliefs = [
    'You are already telling a story. Let\'s make it yours.',
    'Visibility without intention is noise.',
    'Authority without authenticity fades.',
    'Your voice matters more when it sounds like you.'
  ]

  const services = [
    {
      title: 'Unearth Your True Narrative',
      description: 'Through deep discovery workshops, we help you explore your story, values, expertise, and vision.'
    },
    {
      title: 'Shape Your Public Identity with Intention',
      description: 'Define how you want to be perceived and understand the significance of that perception.'
    },
    {
      title: 'Cast Your Voice into the World',
      description: 'From podcast-style brand introductions to content that mirrors your values, we assist you in communicating authentically and resonantly.'
    },
    {
      title: 'Support Your Evolution',
      description: 'We create adaptable structures that evolve with you, ensuring your narrative remains aligned with your growth.'
    }
  ]

  const audience = [
    'Founders and creatives seeking alignment between their public story and internal truth.',
    'Professionals ready to lead with clarity and purpose.',
    'Experts aiming to define themselves beyond algorithm-driven perceptions.',
    'Individuals aspiring to present themselves authentically in the digital realm.'
  ]

  const brandMeaning = [
    {
      word: 'Self',
      description: 'It begins with you—your voice, values, and authentic story.'
    },
    {
      word: 'Cast',
      description: 'To broadcast your truth, shape a lasting identity, and choose your role in your narrative.'
    },
    {
      word: 'Studios',
      description: 'A creative space dedicated to truth and personal development.'
    }
  ]

  const { ModalComponent, showContactForm } = useModal()

  return (
    <main>
      <ModalComponent />
      <PageHeader
        title="About"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />
      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Philosophy Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Our Philosophy</h2>
            <p className="text-xl text-text-light">
              In today's digital landscape, every individual possesses a personal brand—whether consciously 
              developed or not. Scattered bios, outdated photos, and fragmented posts contribute to a 
              narrative that may not truly represent you. At Self Cast Studios, we empower you to take 
              control of your story, ensuring it's authentically yours before others define it for you.
            </p>
          </div>

          {/* What We Believe Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">What We Believe</h2>
            <div className="grid gap-8">
              {beliefs.map((belief, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <p className="text-xl text-text-light text-center italic">{belief}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">What We Do</h2>
            <div className="grid gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">{service.title}</h3>
                  <p className="text-text-light">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who It's For Section */}
          <div className="mb-20 bg-surface rounded-custom shadow-custom p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Who It's For</h2>
            <ul className="space-y-4">
              {audience.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <span className="text-text-light text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Self Cast Studios Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Why "Self Cast Studios"?
            </h2>
            <div className="grid gap-8">
              {brandMeaning.map((item, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">{item.word}</h3>
                  <p className="text-text-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Ready to Transform Your Narrative?
            </h2>
            <a
              href="https://www.selfcaststudios.com/get-started"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
