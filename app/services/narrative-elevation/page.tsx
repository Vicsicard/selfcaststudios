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
    question: "What is narrative elevation and how can it benefit me?",
    answer: "Narrative elevation is a strategic process of enhancing and amplifying your professional story to increase your influence and impact. It helps you articulate your unique value proposition, establish thought leadership, and create meaningful connections with your audience. This service is particularly beneficial for professionals looking to advance their careers, build their personal brand, or position themselves as industry experts."
  },
  {
    question: "How does the narrative elevation process work?",
    answer: "Our narrative elevation process begins with a deep discovery phase where we uncover your unique story, values, and expertise. We then develop a strategic narrative framework, create compelling content, and implement a cohesive communication strategy across various platforms. Throughout the process, we ensure your message remains authentic while maximizing its impact."
  },
  {
    question: "What makes Self Cast Studios' approach to narrative elevation unique?",
    answer: "Our approach combines strategic storytelling with authentic personal branding. We focus on uncovering and amplifying your genuine narrative rather than creating an artificial persona. We use a combination of deep discovery sessions, strategic content development, and multi-platform storytelling to ensure your elevated narrative resonates with your target audience while staying true to your values."
  },
  {
    question: "How long does the narrative elevation process take?",
    answer: "The timeline varies based on your goals and starting point, but typically spans 3-6 months for the initial elevation phase. This includes discovery sessions, strategy development, content creation, and implementation. After the initial phase, we offer ongoing support to maintain and evolve your elevated narrative."
  },
  {
    question: "What results can I expect from narrative elevation?",
    answer: "You can expect increased visibility in your industry, stronger professional relationships, enhanced credibility, and more meaningful engagement with your target audience. Our clients often report improved career opportunities, speaking engagements, and business growth as a result of their elevated narrative."
  }
]

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
    title: 'Platform Optimization',
    description: 'Enhance your digital presence across key platforms, ensuring your elevated narrative reaches and resonates with your target audience.',
    icon: '→'
  }
]

export default async function NarrativeElevationPage() {
  const { ModalComponent, showContactForm } = useModal()
  const blogPosts = await getBlogPostsForRelatedContent()
  const personalBrandPost = blogPosts.find(post => 
    post.title.toLowerCase().includes('personal brand') && 
    post.title.toLowerCase().includes('feels like you')
  )

  const relatedContent: RelatedItem[] = [
    {
      title: "Narrative Defense",
      description: "Learn how to protect and maintain control of your professional narrative with our Narrative Defense service.",
      href: "/services/narrative-defense",
      imageUrl: "https://imagestopost.carrd.co/assets/images/image01.jpg?v=c0c3ab6a",
      type: "service" as const
    },
    {
      title: "Narrative Transition",
      description: "Going through a career change? Our Narrative Transition service helps you navigate professional changes with confidence.",
      href: "/services/narrative-transition",
      imageUrl: "https://imagestopost.carrd.co/assets/images/image03.jpg?v=c0c3ab6a",
      type: "service" as const
    },
    personalBrandPost ? {
      title: personalBrandPost.title,
      description: "Discover how to build an authentic personal brand that truly represents who you are.",
      href: `/blog/${personalBrandPost.slug}`,
      imageUrl: personalBrandPost.imageUrl || undefined,
      type: "blog" as const
    } : {
      title: "How Self Cast Studios Helps You Create a Personal Brand That Feels Like You",
      description: "Discover how to build an authentic personal brand that truly represents who you are.",
      href: "/blog/how-to-create-a-personal-brand-that-feels-like-you",
      type: "blog" as const
    }
  ].filter(Boolean) as RelatedItem[]

  return (
    <main>
      <ModalComponent />
      <FaqJsonLd questions={faqs} />
      <PageHeader
        title="Narrative Elevation"
        description="Elevate Your Story. Amplify Your Impact."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image02.jpg?v=c0c3ab6a"
        darkText={false}
      />

      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video04.mp4?v=37a0fde8"
              title="Narrative Elevation Overview"
              description="Learn how our Narrative Elevation service helps you amplify your professional story and increase your impact."
              className="shadow-custom-dark"
            />
          </div>

          {/* Success Story Video */}
          <div className="mb-24">
            <VideoPlayer
              src="https://imagestopost.carrd.co/assets/videos/video07.mp4?v=c0c3ab6a"
              title="Client Success Story - Narrative Elevation"
              description="See how our Narrative Elevation service transformed a client's professional presence and impact."
              className="shadow-custom-dark"
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Elevate Your Professional Story
            </h2>
            <p className="text-text-light text-lg mb-8">
              Your story is your most powerful asset. Through our Narrative Elevation service, we help you uncover, craft, and amplify your unique narrative to create lasting impact and meaningful connections in your professional sphere.
            </p>

            {/* Services Grid */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold text-primary mb-8">Our Process</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {services.map((service, index) => (
                  <div key={index} className="card p-8">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-4">
                      <span className="text-2xl">{service.icon}</span>
                      {service.title}
                    </h3>
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
          source="Service - Narrative Elevation"
          title="Ready to Elevate Your Professional Story?"
          description="Schedule a consultation to discover how our Narrative Elevation service can amplify your impact."
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
