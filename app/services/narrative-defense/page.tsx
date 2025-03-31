import VideoPlayer from '@/components/VideoPlayer'
import PageHeader from '@/components/PageHeader'

export default function NarrativeDefensePage() {
  return (
    <main>
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
              <a
                href="mailto:defense@selfcaststudios.com"
                className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors shadow-custom-dark hover:shadow-custom-dark-hover"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
