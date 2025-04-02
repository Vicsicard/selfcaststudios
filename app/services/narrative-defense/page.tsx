'use client'

import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'
import ConsultationCTA from '@/components/ConsultationCTA'
import { useModal } from '@/hooks/useModal'
import FaqJsonLd from '@/components/structured-data/FaqJsonLd'
import RelatedContent from '@/components/RelatedContent'
import type { RelatedItem } from '@/components/RelatedContent'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-surface-dark animate-pulse rounded-custom" />
  ),
})

const faqs = [
  {
    question: "What is narrative defense and why do I need it?",
    answer: "Narrative defense is a strategic approach to protecting and managing your professional reputation in the digital age. It's essential because your online presence can significantly impact your career, business relationships, and opportunities. Our service helps you maintain control of your narrative during challenging transitions or potential reputation threats."
  },
  {
    question: "How does Self Cast Studios' narrative defense service work?",
    answer: "Our service begins with a comprehensive assessment of your current narrative and potential vulnerabilities. We then develop a strategic plan that includes reputation monitoring, crisis prevention planning, and proactive content strategy. We work closely with you to ensure your professional story remains authentic and resilient."
  },
  {
    question: "What types of situations can narrative defense help with?",
    answer: "Narrative defense can help in various situations, including career transitions, company restructuring, industry changes, or when facing potential reputation challenges. We help professionals maintain their credibility and stakeholder trust during these critical moments."
  },
  {
    question: "How long does it take to see results?",
    answer: "While immediate actions can be taken to protect your narrative, building a strong defensive position typically takes 3-6 months. This includes establishing monitoring systems, developing response strategies, and creating protective content barriers."
  },
  {
    question: "Can narrative defense help prevent future reputation issues?",
    answer: "Yes, our proactive approach helps identify and address potential reputation risks before they become issues. We develop preventive strategies and build narrative resilience to protect your professional reputation for the long term."
  }
]

const relatedContent: RelatedItem[] = [
  {
    title: "Narrative Elevation",
    description: "Ready to take your professional story to the next level? Our Narrative Elevation service helps you amplify your impact and establish thought leadership.",
    href: "/services/narrative-elevation",
    imageUrl: "https://imagestopost.carrd.co/assets/images/image02.jpg?v=c0c3ab6a",
    type: "service" as const
  },
  {
    title: "Narrative Transition",
    description: "Going through a career change? Learn how our Narrative Transition service can help you navigate professional changes with confidence.",
    href: "/services/narrative-transition",
    imageUrl: "https://imagestopost.carrd.co/assets/images/image03.jpg?v=c0c3ab6a",
    type: "service" as const
  },
  {
    title: "What Is a Personal Brand—and How Self Cast Studios Helps You Shape Yours",
    description: "Discover the fundamentals of personal branding and how it can protect and enhance your professional reputation.",
    href: "/blog/what-is-a-personal-brand",
    type: "blog" as const
  }
]

export default function NarrativeDefensePage() {
  const { ModalComponent, showContactForm } = useModal()
  
  return (
    <main>
      <ModalComponent />
      <FaqJsonLd questions={faqs} />
      <PageHeader
        title="Narrative Defense"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video01.mp4?v=37a0fde8"
              title="Understanding Narrative Defense"
              description="Learn how our Narrative Defense service helps you take control of your story and protect your online reputation."
              className="shadow-custom-dark"
            />
          </div>

          {/* Testimonial Video */}
          <div className="mb-24">
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
            <section className="mb-24">
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
            </section>

            {/* Services Sections */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold text-primary mb-8">What We Offer</h2>
              <div className="card p-8">
                <ul className="space-y-3 text-text-light">
                  <li>Strategic narrative assessment</li>
                  <li>Reputation monitoring</li>
                  <li>Crisis prevention planning</li>
                  <li>Content strategy development</li>
                  <li>Stakeholder communication planning</li>
                  <li>Digital presence optimization</li>
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold text-primary mb-8">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="card p-8">
                    <h3 className="text-xl font-bold text-primary mb-4">{faq.question}</h3>
                    <p className="text-text-light">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <ConsultationCTA
          source="Service - Narrative Defense"
          title="Ready to Protect Your Professional Narrative?"
          description="Schedule a consultation to learn how our Narrative Defense service can help you maintain control of your story."
          buttonText="Schedule Consultation"
        />

        <RelatedContent
          title="Explore Related Services & Insights"
          items={relatedContent}
          className="mt-24"
        />
      </div>
    </main>
  )
}
