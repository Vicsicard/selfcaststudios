'use client'

import PageHeader from '@/components/PageHeader'
import dynamic from 'next/dynamic'
import ConsultationCTA from '@/components/ConsultationCTA'
import { useModal } from '@/hooks/useModal'
import FaqJsonLd from '@/components/structured-data/FaqJsonLd'
import RelatedContent from '@/components/RelatedContent'
import type { RelatedItem } from '@/components/RelatedContent'
import { getBlogPostsForRelatedContent } from '@/lib/blog'

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

const services = [
  {
    title: 'Narrative Assessment & Analysis',
    description: 'Comprehensive evaluation of your current narrative landscape, identifying potential vulnerabilities and opportunities to strengthen your professional story.',
    icon: '→'
  },
  {
    title: 'Strategic Defense Framework',
    description: 'Development of a robust defensive strategy that anticipates challenges, prepares responses, and positions you to maintain control of your professional narrative.',
    icon: '→'
  },
  {
    title: 'Proactive Content Development',
    description: 'Creation of strategic content that reinforces your authentic narrative, establishing a strong foundation that helps prevent and counter potential misrepresentations.',
    icon: '→'
  },
  {
    title: 'Reputation Monitoring & Management',
    description: 'Implementation of ongoing monitoring systems and response protocols to protect and maintain the integrity of your professional narrative across all platforms.',
    icon: '→'
  }
]

export default async function NarrativeDefensePage() {
  const { ModalComponent, showContactForm } = useModal()
  const blogPosts = await getBlogPostsForRelatedContent()
  const linkedInPost = blogPosts.find(post => post.title.toLowerCase().includes('linkedin'))

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
    linkedInPost ? {
      title: linkedInPost.title,
      description: "Learn how to audit and optimize your professional presence on LinkedIn for maximum impact.",
      href: `/blog/${linkedInPost.slug}`,
      imageUrl: linkedInPost.imageUrl || undefined,
      type: "blog" as const
    } : {
      title: "What Does Your LinkedIn Really Say About You?",
      description: "Learn how to audit and optimize your professional presence on LinkedIn for maximum impact.",
      href: "/blog/what-does-your-linkedin-really-say-about-you",
      type: "blog" as const
    }
  ].filter(Boolean) as RelatedItem[]
  
  return (
    <main>
      <ModalComponent />
      <FaqJsonLd questions={faqs} />
      <PageHeader
        title="Narrative Defense"
        description="Protect Your Story. Secure Your Legacy."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image01.jpg?v=c0c3ab6a"
        darkText={false}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video01.mp4?v=cf0efed9"
              title="Narrative Defense Overview"
              description="Learn how our Narrative Defense service helps you protect and maintain control of your professional story."
              className="shadow-custom-dark"
            />
          </div>

          {/* Success Story Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video03.mp4?v=cf0efed9"
              title="Client Success Story - Narrative Defense"
              description="See how our Narrative Defense service helped a client maintain control of their professional narrative."
              className="shadow-custom-dark"
              isVertical={true}
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Take Control of Your Professional Narrative
            </h2>
            <p className="text-text-light text-lg mb-8">
              In today's digital age, your professional story can be shaped by forces beyond your control. Our Narrative Defense service empowers you to protect and maintain authority over your narrative, ensuring your authentic voice remains at the forefront of your professional identity.
            </p>

            {/* Our Process Section */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold text-primary mb-8">Our Process</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {services.map((service, index) => (
                  <div key={index} className="card p-8">
                    <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                    <p className="text-text-light">{service.description}</p>
                  </div>
                ))}
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
          title="Ready to Protect Your Professional Story?"
          description="Schedule a consultation to learn how our Narrative Defense service can help you maintain control of your narrative."
          buttonText="Get Started"
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
