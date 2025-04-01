'use client'

import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'
import ConsultationCTA from '@/components/ConsultationCTA'
import { useModal } from '@/hooks/useModal'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function NarrativeElevationPage() {
  const { ModalComponent, showContactForm } = useModal()

  const services = [
    {
      title: 'Discovery & Deep Dive',
      description: 'Unearth your unique story, values, expertise, and vision through expert-guided sessions, resulting in a clear, authentic narrative foundation.',
      icon: '→'
    },
    {
      title: 'Strategic Narrative Development',
      description: 'Craft a signature message through guided sessions, developing a cohesive framework that aligns your internal truth with your public persona.',
      icon: '→'
    },
    {
      title: 'Content Creation & Voice Casting',
      description: 'Transform your narrative into engaging, multi-format content through collaborative development focused on effective storytelling and message consistency.',
      icon: '→'
    },
    {
      title: 'Distribution & Evolution',
      description: 'Ensure your narrative reaches the right audience with a structured strategy for content distribution and periodic refinement.',
      icon: '→'
    }
  ]

  const deliverables = [
    'Signature Messaging Blueprint: A detailed document articulating your core identity and narrative.',
    'Content Assets: Engaging long-form articles, podcasts, audio/visual content, and strategic guides.',
    'Strategic Framework: A tailored blueprint that integrates your narrative with content production.'
  ]

  const clients = [
    'Visionaries & Thought Leaders: Industry leaders, keynote speakers, and consultants seeking authority.',
    'Entrepreneurs & Creators: Startup founders, brand builders, and artists crafting authentic narratives.',
    'Online Experts: Coaches and consultants developing distinctive digital presence.'
  ]

  const benefits = [
    'Narrative Ownership: Uncover and refine your unique story through deep introspection.',
    'Strategic Positioning: Align internal values with consistent external messaging.',
    'Content Integration: Transform your narrative into engaging multi-format content.',
    'Ongoing Relevance: Develop sustainable content strategy that evolves with you.'
  ]

  const advantages = [
    'Personalized Approach: Every element tailored to reflect your unique story.',
    'Integrated Solution: Combines narrative discovery, content creation, and messaging.',
    'Sustainable Growth: Dynamic framework that evolves with you over time.'
  ]

  return (
    <main>
      <ModalComponent />
      <PageHeader
        title="Narrative Elevation"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />
      
      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Video */}
          <div className="mb-16">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video04.mp4?v=fa27f6da"
              title="Understanding Narrative Elevation"
              description="Learn how our Narrative Elevation service helps you amplify your voice and establish thought leadership."
              className="shadow-custom-dark"
            />
          </div>

          {/* Testimonial Video */}
          <div className="mb-16">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video07.mp4?v=9bffb209"
              title="Client Testimonial - Narrative Elevation"
              description="Listen to how our Narrative Elevation service helped transform a client's professional presence."
              className="shadow-custom-dark"
              isVertical={true}
            />
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-xl md:text-2xl text-text-light mb-12">
              Shape the Narrative Before It Shapes You.
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-primary mb-12">
              Your Story. Your Voice. Cast with Intention.
            </p>
            <button
              onClick={() => showContactForm('Service - Narrative Elevation (Hero)')}
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              Book a Private Consultation
            </button>
          </div>

          {/* Service Overview */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Service Overview</h2>
            <p className="text-xl text-text-light">
              Narrative Elevation is a comprehensive personal branding solution designed to empower you to own your story. 
              We blend deep discovery, strategic messaging, and creative content production so you can amplify your voice 
              and stand out in your field.
            </p>
            <p className="text-text-light text-lg mb-8">
              Elevate your professional presence and establish yourself as a thought leader in your industry. Our Narrative Elevation service helps you craft and communicate your unique value proposition, amplifying your voice and expanding your influence.
            </p>

            {/* Client Testimonials */}
            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold text-primary">Client Success Stories</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-surface rounded-custom shadow-custom-dark p-6">
                  <blockquote className="text-lg text-text-light mb-4 italic">
                    "Their comprehensive approach to personal branding helped me establish a distinctive voice in a crowded market."
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-primary font-bold">Robert T.</span>
                    <span className="text-text-light">Financial Advisor</span>
                  </cite>
                </div>

                <div className="bg-surface rounded-custom shadow-custom-dark p-6">
                  <blockquote className="text-lg text-text-light mb-4 italic">
                    "The impact on my business has been transformative. They helped me articulate my value proposition in a way that truly resonates with my target audience."
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-primary font-bold">Lisa H.</span>
                    <span className="text-text-light">Executive Coach</span>
                  </cite>
                </div>
              </div>
            </div>

          </div>

          {/* Who It's For */}
          <div className="bg-surface rounded-custom shadow-custom p-8 md:p-12 mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Who It&apos;s For</h2>
              <ul className="space-y-4">
                {clients.map((client, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-3">•</span>
                    <span className="text-text-light text-lg">{client}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How It Helps */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">How It Helps</h2>
            <div className="grid gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <div className="flex gap-4">
                    <span className="text-accent text-xl">→</span>
                    <div>
                      <p className="text-text-light text-lg">{benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Service Elements */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">Core Service Elements</h2>
            <div className="grid gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <div className="flex gap-4">
                    <span className="text-accent text-xl">{service.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                      <p className="text-text-light">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-surface rounded-custom shadow-custom p-8 md:p-12 mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Deliverables</h2>
              <ul className="space-y-3 text-text-light">
                <li>Align messaging across platforms, including LinkedIn and other social media</li>
                <li>Content calendar and posting strategy</li>
                <li>Personal brand guidelines</li>
                <li>Engagement tactics and best practices</li>
              </ul>
            </div>
          </div>

          {/* The Self Cast Advantage */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">The Self Cast Advantage</h2>
            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <span className="text-text-light text-lg">{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Let's Talk */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Own Your Narrative?</h2>
            <p className="text-xl text-text-light mb-12">
              Take the first step toward transforming your personal brand.
            </p>
            <button
              onClick={() => showContactForm('Service - Narrative Elevation (Bottom)')}
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              Book a Private Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface-dark">
        <div className="container mx-auto px-4 py-section">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Narrative?</h2>
            <p className="text-text-light mb-8">
              Take the first step toward crafting your authentic story with intention.
            </p>
            <ConsultationCTA source="Service - Narrative Elevation" />
          </div>
        </div>
      </div>
    </main>
  )
}
