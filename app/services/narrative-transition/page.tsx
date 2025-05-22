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
    question: "What is narrative transition and who is it for?",
    answer: "Narrative transition is a specialized service designed for professionals going through significant career changes, whether that's switching industries, retiring, or stepping into new leadership roles. It helps you reshape your professional story to align with your new direction while maintaining the value of your past experiences."
  },
  {
    question: "How does the narrative transition process work?",
    answer: "Our process begins with a deep assessment of your current narrative and future goals. We then develop a strategic transition plan that includes reframing your experience, identifying transferable skills, and creating content that bridges your past achievements with your future aspirations. Throughout the process, we ensure your story remains authentic while effectively communicating your value in your new context."
  },
  {
    question: "How long does a narrative transition typically take?",
    answer: "The timeline varies based on your specific situation and goals, but most transitions are structured over 2-4 months. This includes initial assessment, strategy development, content creation, and implementation. We also provide ongoing support to help you navigate the transition period effectively."
  },
  {
    question: "What makes Self Cast Studios' approach to narrative transition unique?",
    answer: "Our approach combines strategic storytelling with deep understanding of career transitions. We focus on maintaining authenticity while effectively repositioning your narrative for new audiences. Our process ensures that your past experiences are meaningfully connected to your future goals, creating a cohesive and compelling professional story."
  },
  {
    question: "What results can I expect from narrative transition?",
    answer: "You can expect a clear, compelling narrative that effectively positions you for your next chapter, stronger professional relationships in your new field, and increased confidence in communicating your value. Our clients often report smoother transitions, better stakeholder buy-in, and more opportunities in their new direction."
  }
]

export default async function NarrativeTransitionPage() {
  const { ModalComponent, showContactForm } = useModal()
  const blogPosts = await getBlogPostsForRelatedContent()
  const brandMattersPost = blogPosts.find(post => 
    post.title.toLowerCase().includes('matters more than ever')
  )

  const relatedContent: RelatedItem[] = [
    {
      title: "Narrative Defense",
      description: "Learn how to protect and maintain control of your professional narrative during times of change.",
      href: "/services/narrative-defense",
      imageUrl: "https://imagestopost.carrd.co/assets/images/image01.jpg?v=c0c3ab6a",
      type: "service" as const
    },
    {
      title: "Narrative Elevation",
      description: "Ready to amplify your impact in your new role? Our Narrative Elevation service helps you establish thought leadership.",
      href: "/services/narrative-elevation",
      imageUrl: "https://imagestopost.carrd.co/assets/images/image02.jpg?v=c0c3ab6a",
      type: "service" as const
    },
    brandMattersPost ? {
      title: brandMattersPost.title,
      description: "Discover why investing in your personal brand is crucial in today's digital landscape.",
      href: `/blog/${brandMattersPost.slug}`,
      imageUrl: brandMattersPost.imageUrl || undefined,
      type: "blog" as const
    } : {
      title: "Why Your Personal Brand Matters More Than Ever",
      description: "Discover why investing in your personal brand is crucial in today's digital landscape.",
      href: "/blog/why-your-personal-brand-matters-more-than-ever",
      type: "blog" as const
    }
  ].filter(Boolean) as RelatedItem[]

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

  return (
    <main>
      <ModalComponent />
      <FaqJsonLd questions={faqs} />
      <PageHeader
        title="Narrative Transition"
        description="Navigate Change. Shape Your Legacy."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image03.jpg?v=c0c3ab6a"
        darkText={false}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video05.mp4?v=37a0fde8"
              title="Narrative Transition Overview"
              description="Learn how our Narrative Transition service helps you navigate professional changes with confidence."
              className="shadow-custom-dark"
            />
          </div>

          {/* Success Story Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video08.mp4?v=c0c3ab6a"
              title="Client Success Story - Narrative Transition"
              description="See how our Narrative Transition service helped a client successfully pivot their career."
              className="shadow-custom-dark"
              isVertical={true}
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Navigate Professional Transitions with Confidence
            </h2>
            <p className="text-text-light text-lg mb-8">
              Whether you're changing careers, stepping into a new role, or redefining your professional legacy, our Narrative Transition service helps you craft a compelling story that bridges your past achievements with your future aspirations.
            </p>

            {/* Target Audience */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold text-primary mb-8">Who We Help</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {targetAudience.map((audience, index) => (
                  <div key={index} className="card p-8">
                    <h3 className="text-xl font-bold text-primary mb-4">{audience.title}</h3>
                    <p className="text-text-light">{audience.description}</p>
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
          source="Service - Narrative Transition"
          title="Ready to Transform Your Professional Story?"
          description="Schedule a consultation to learn how our Narrative Transition service can help you navigate change with confidence."
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
