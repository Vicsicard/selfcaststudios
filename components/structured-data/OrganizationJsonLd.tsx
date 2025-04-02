export default function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Self Cast Studios',
    url: 'https://selfcaststudios.com',
    logo: 'https://selfcaststudios.com/images/logo.png',
    description: 'Self Cast Studios helps professionals shape and elevate their personal brand through strategic narrative development and multimedia content creation.',
    sameAs: [
      'https://www.linkedin.com/company/self-cast-studios',
      // Add other social media URLs here
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://selfcaststudios.com/contact'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
