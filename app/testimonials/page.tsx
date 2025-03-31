import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

export default function TestimonialsPage() {
  const testimonials = [
    // Narrative Defense Testimonials
    {
      name: 'Marcus R.',
      role: 'Corporate Executive',
      service: 'Narrative Defense',
      quote: 'During a challenging corporate transition, Self Cast Studios helped me maintain control of my professional narrative. Their strategic approach made all the difference.',
    },
    {
      name: 'Elena M.',
      role: 'Healthcare Professional',
      service: 'Narrative Defense',
      quote: 'When faced with industry changes, Self Cast Studios provided invaluable guidance in protecting and preserving my professional reputation.',
    },
    {
      name: 'David K.',
      role: 'Tech Entrepreneur',
      service: 'Narrative Defense',
      quote: 'Their expertise in narrative defense helped me navigate a complex situation while maintaining my company\'s credibility and stakeholder trust.',
    },
    {
      name: 'Sarah P.',
      role: 'Legal Professional',
      service: 'Narrative Defense',
      quote: 'Self Cast Studios\' approach to narrative defense is both strategic and empathetic. They helped me maintain my professional standing during a sensitive time.',
    },

    // Narrative Elevation Testimonials
    {
      name: 'James W.',
      role: 'Industry Speaker',
      service: 'Narrative Elevation',
      quote: 'The team transformed my personal brand into a powerful platform for thought leadership. Their strategic vision exceeded my expectations.',
    },
    {
      name: 'Michelle L.',
      role: 'Business Consultant',
      service: 'Narrative Elevation',
      quote: 'Working with Self Cast Studios elevated my professional presence and opened doors to new opportunities I hadn\'t imagined possible.',
    },
    {
      name: 'Robert T.',
      role: 'Financial Advisor',
      service: 'Narrative Elevation',
      quote: 'Their comprehensive approach to personal branding helped me establish a distinctive voice in a crowded market.',
    },
    {
      name: 'Lisa H.',
      role: 'Executive Coach',
      service: 'Narrative Elevation',
      quote: 'The impact on my business has been transformative. They helped me articulate my value proposition in a way that truly resonates with my target audience.',
    },

    // Narrative Transition Testimonials
    {
      name: 'Michael B.',
      role: 'Career Changer',
      service: 'Narrative Transition',
      quote: 'Self Cast Studios was instrumental in helping me pivot my career while maintaining the value of my past experience.',
    },
    {
      name: 'Jennifer C.',
      role: 'Industry Switcher',
      service: 'Narrative Transition',
      quote: 'Their guidance made my career transition feel seamless. They helped me tell my story in a way that highlighted my transferable skills.',
    },
    {
      name: 'Thomas N.',
      role: 'Entrepreneur',
      service: 'Narrative Transition',
      quote: 'The team helped me effectively communicate my journey from corporate executive to startup founder. Their insights were invaluable.',
    },
    {
      name: 'Rachel S.',
      role: 'Business Owner',
      service: 'Narrative Transition',
      quote: 'They helped me articulate my professional evolution in a way that maintained credibility while embracing my new direction.',
    }
  ]

  return (
    <main>
      <PageHeader
        title="Testimonials"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />
      
      <div className="container mx-auto px-4 py-section">
        {/* Service Categories */}
        {['Narrative Defense', 'Narrative Elevation', 'Narrative Transition'].map((service) => (
          <div key={service} className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              {service}
            </h2>
            
            {/* Video Testimonial for Narrative Defense */}
            {service === 'Narrative Defense' && (
              <div className="mb-12">
                <VideoPlayer
                  src="https://imagestopost.carrd.co/assets/videos/video03.mp4?v=c0c3ab6a"
                  title="Client Testimonial - Narrative Defense"
                  description="Hear how our Narrative Defense service helped protect and preserve a client's professional reputation."
                  className="shadow-custom-dark"
                  isVertical={true}
                />
              </div>
            )}
            
            <div className="grid gap-8 md:gap-12">
              {testimonials
                .filter(t => t.service === service)
                .map((testimonial, index) => (
                  <div key={index} className="bg-surface rounded-custom shadow-custom-dark p-8 md:p-12">
                    <blockquote className="text-lg md:text-xl text-text-light mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <cite className="not-italic">
                        <span className="block text-primary font-bold text-lg">
                          {testimonial.name}
                        </span>
                        <span className="text-text-light">
                          {testimonial.role}
                        </span>
                      </cite>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Ready to Transform Your Story?
          </h2>
          <a
            href="mailto:info@selfcaststudios.com"
            className="inline-block bg-accent hover:bg-accent-light text-text-white px-8 py-4 rounded-custom transition-colors text-lg shadow-custom-dark hover:shadow-custom-dark-hover"
          >
            Book a Private Consultation
          </a>
        </div>
      </div>
    </main>
  )
}
