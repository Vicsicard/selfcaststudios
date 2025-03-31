import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function NarrativeElevationPage() {
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
              src="https://imagestopost.carrd.co/assets/videos/video04.mp4?v=3174e163"
              title="Understanding Narrative Elevation"
              description="Learn how our Narrative Elevation service helps you shape and amplify your authentic story."
              className="shadow-custom"
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
            <a
              href="mailto:defense@selfcaststudios.com"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              Book a Private Consultation
            </a>
          </div>

          {/* Service Overview */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Service Overview</h2>
            <p className="text-xl text-text-light">
              Narrative Elevation is a comprehensive personal branding solution designed to empower you to own your story. 
              We blend deep discovery, strategic messaging, and creative content production so you can amplify your voice 
              and stand out in your field.
            </p>
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
              <ul className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-3">•</span>
                    <span className="text-text-light text-lg">{deliverable}</span>
                  </li>
                ))}
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
            <a
              href="mailto:defense@selfcaststudios.com"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              Book a Private Consultation
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
