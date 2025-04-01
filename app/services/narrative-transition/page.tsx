import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function NarrativeTransitionPage() {
  const targetAudience = [
    {
      title: 'Career Changers',
      description: 'Professionals forging new paths who know their true value lies in a personal brand they control and can continually rewrite.'
    },
    {
      title: 'Executives in Transition',
      description: 'Leaders stepping into new roles or industries who shape their own narrative, ensuring their legacy is defined by their vision—not external forces.'
    },
    {
      title: 'Retiring Professionals',
      description: 'Seasoned experts ready to redefine their legacy by investing in and narrating a brand story that allows their true value to shine at every life stage.'
    }
  ]

  const benefits = [
    {
      title: 'Narrative Reinvention',
      description: 'Transform your past into a bold, authentic identity with deep introspection and expert guidance.'
    },
    {
      title: 'Strategic Repositioning',
      description: 'Align your core values with a consistent, evolved message that sets you apart.'
    },
    {
      title: 'Integrated Storytelling',
      description: 'Seamlessly combine content and design to articulate your transformation across channels.'
    },
    {
      title: 'Enduring Impact',
      description: 'Cultivate a dynamic narrative that evolves with your professional journey, keeping your brand authentic and impactful.'
    }
  ]

  const services = [
    {
      title: 'Reinvention & Repositioning',
      description: 'Honor your past while setting the stage for a bold new future.',
      icon: '→'
    },
    {
      title: 'Making Meaning of the Past',
      description: 'Transform your experiences into a compelling narrative that guides your next chapter.',
      icon: '→'
    },
    {
      title: 'Values-Based Storytelling',
      description: 'Craft a narrative that is reflective, intentional, and rooted in your core values.',
      icon: '→'
    }
  ]

  const deliverables = [
    {
      title: 'Narrative & Voice Content',
      description: 'Authentic, values-based storytelling through articles, interviews, and short-form media.'
    },
    {
      title: 'Visual Identity Refresh',
      description: 'A minimalist, forward-thinking design.'
    },
    {
      title: 'Memoir & Bio',
      description: 'A concise narrative capturing your journey and evolved identity.'
    },
    {
      title: 'Public Statement Video',
      description: 'A genuine video that communicates your transition.'
    },
    {
      title: 'Brand Tone Guidance',
      description: 'Strategic insights to ensure your messaging aligns with your renewed vision.'
    }
  ]

  return (
    <main>
      <PageHeader
        title="Narrative Transition"
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
              title="Understanding Narrative Transition"
              description="Learn how our Narrative Transition service helps you navigate and communicate your professional evolution."
              className="shadow-custom"
            />
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-xl md:text-2xl text-text-light mb-12">
              A Source of Truth for Transformational Moments
            </p>
            <a
              href="mailto:defense@selfcaststudios.com"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              Book a Private Consultation
            </a>
          </div>

          {/* Overview */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Overview</h2>
            <p className="text-xl text-text-light">
              Narrative Transition is a personal branding service that helps professionals navigate pivotal career 
              or life changes with clarity, authenticity, and purpose.
            </p>
          </div>

          {/* Top 3 People */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Top 3 People Narrative Transition Is For
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {targetAudience.map((audience, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">{audience.title}</h3>
                  <p className="text-text-light">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Helps */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">How It Helps</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">{benefit.title}</h3>
                  <p className="text-text-light">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Belief */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Core Belief</h2>
            <p className="text-xl text-text-light">
              Your personal brand is the wellspring of your true value. Regardless of career changes or life stages, 
              you have the power to write—or rewrite—your own narrative. Investing in your brand means taking control 
              of your story so that you, not outside sources, define your identity and legacy.
            </p>
          </div>

          {/* What It Does */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">What It Does</h2>
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
              <div className="grid md:grid-cols-2 gap-8">
                {deliverables.map((deliverable, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold text-primary">{deliverable.title}</h3>
                    <p className="text-text-light">{deliverable.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Empowerment Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Empowerment Statement</h2>
            <p className="text-xl text-text-light">
              This service empowers you to articulate your transformation with confidence, ensuring your narrative 
              reflects your past and propels you boldly into the future.
            </p>
          </div>

          {/* Testimonials */}
          <div className="max-w-4xl mx-auto mb-20">
            <p className="text-text-light text-lg mb-8">
              Navigate your professional evolution with confidence. Our Narrative Transition service helps you bridge your past experience with your future aspirations, creating a compelling story that resonates with your new audience.
            </p>

            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold text-primary">Client Success Stories</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-surface rounded-custom shadow-custom-dark p-6">
                  <blockquote className="text-lg text-text-light mb-4 italic">
                    "The team helped me effectively communicate my journey from corporate executive to startup founder. Their insights were invaluable."
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-primary font-bold">Thomas N.</span>
                    <span className="text-text-light">Entrepreneur</span>
                  </cite>
                </div>

                <div className="bg-surface rounded-custom shadow-custom-dark p-6">
                  <blockquote className="text-lg text-text-light mb-4 italic">
                    "They helped me articulate my professional evolution in a way that maintained credibility while embracing my new direction."
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-primary font-bold">Rachel S.</span>
                    <span className="text-text-light">Business Owner</span>
                  </cite>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto text-center">
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
