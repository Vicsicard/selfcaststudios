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

export default function NarrativeDefensePage() {
  const { ModalComponent, showContactForm } = useModal()
  
  return (
    <main>
      <ModalComponent />
      <PageHeader
        title="Narrative Defense"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Video */}
          <div className="mb-16">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video01.mp4?v=37a0fde8"
              title="Understanding Narrative Defense"
              description="Learn how our Narrative Defense service helps you take control of your story and protect your online reputation."
              className="shadow-custom-dark"
            />
          </div>

          {/* Testimonial Video */}
          <div className="mb-16">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video03.mp4?v=c0c3ab6a"
              title="Client Testimonial - Narrative Defense"
              description="Hear how our Narrative Defense service helped protect and preserve a client's professional reputation."
              className="shadow-custom-dark"
              isVertical={true}
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Protect Your Professional Reputation
            </h2>
            <p className="text-text-light text-lg mb-8">
              In today's interconnected world, your professional reputation is one of your most valuable assets. Our Narrative Defense service helps you protect and preserve your reputation during challenging transitions, ensuring your story remains authentic and under your control.
            </p>

            {/* Client Testimonials */}
            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold text-primary">Client Success Stories</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-surface rounded-custom shadow-custom-dark p-6">
                  <blockquote className="text-lg text-text-light mb-4 italic">
                    "Their expertise in narrative defense helped me navigate a complex situation while maintaining my company's credibility and stakeholder trust."
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-primary font-bold">David K.</span>
                    <span className="text-text-light">Tech Entrepreneur</span>
                  </cite>
                </div>

                <div className="bg-surface rounded-custom shadow-custom-dark p-6">
                  <blockquote className="text-lg text-text-light mb-4 italic">
                    "Self Cast Studios' approach to narrative defense is both strategic and empathetic. They helped me maintain my professional standing during a sensitive time."
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-primary font-bold">Sarah P.</span>
                    <span className="text-text-light">Legal Professional</span>
                  </cite>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  What We Offer
                </h3>
                <ul className="space-y-3 text-text-light">
                  <li>Strategic narrative assessment</li>
                  <li>Reputation monitoring</li>
                  <li>Crisis prevention planning</li>
                  <li>Professional story alignment</li>
                  <li>Digital presence optimization</li>
                </ul>
              </div>

              <div className="card p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Why Choose Us
                </h3>
                <ul className="space-y-3 text-text-light">
                  <li>Experienced reputation specialists</li>
                  <li>Proactive defense strategies</li>
                  <li>Personalized approach</li>
                  <li>Confidential service</li>
                  <li>Long-term protection focus</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => showContactForm('Service - Narrative Defense (Mid-Page)')}
                className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors shadow-custom-dark hover:shadow-custom-dark-hover cursor-pointer"
              >
                Book a Private Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation CTA */}
      <ConsultationCTA source="Service - Narrative Defense" />
    </main>
  )
}
