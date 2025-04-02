interface VideoJsonLdProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl: string
  duration?: string
  embedUrl?: string
}

export default function VideoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  duration,
  embedUrl
}: VideoJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    ...(duration && { duration }),
    ...(embedUrl && { embedUrl }),
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
