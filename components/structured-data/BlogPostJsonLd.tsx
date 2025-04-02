interface BlogPostJsonLdProps {
  title: string
  description: string
  images: string[]
  url: string
  datePublished: string
  dateModified: string
}

export default function BlogPostJsonLd({
  title,
  description,
  images,
  url,
  datePublished,
  dateModified,
}: BlogPostJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: images,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'Self Cast Studios',
      logo: {
        '@type': 'ImageObject',
        url: 'https://selfcaststudios.com/images/logo.png'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
