import PageHeader from '@/components/PageHeader'

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        title="Blog"
        description="Your Story. Your Voice. Cast with Intention."
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=c0c3ab6a"
        darkText={true}
      />
      
      <div className="container mx-auto px-4 py-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Coming Soon
          </h2>
        </div>
      </div>
    </main>
  )
}
