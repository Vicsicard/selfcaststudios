import PageHeader from '@/components/PageHeader'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Contact Us: Including your name, email address, phone number, and any other details you provide.',
        'Engage Our Services: Such as information related to your personal brand, professional background, and other relevant details necessary for providing our services.',
        'Subscribe to Communications: Including your email address and preferences.'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Provide Services: Deliver personalized branding services tailored to your needs.',
        'Communicate: Respond to inquiries, send updates, and provide information related to our services.',
        'Improve Our Services: Analyze usage to enhance the quality and effectiveness of our offerings.'
      ]
    },
    {
      title: 'Information Sharing and Disclosure',
      content: [
        'Service Providers: Trusted third parties who assist us in operating our website and conducting our business, so long as they agree to keep this information confidential.',
        'Legal Requirements: If required to do so by law or in response to valid requests by public authorities.'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access and Correction: The right to access the personal information we hold about you and to request corrections.',
        'Deletion: The right to request that we delete your personal information, subject to certain exceptions.'
      ],
      footer: 'To exercise these rights, please contact us using the information provided below.'
    },
    {
      title: 'Third-Party Links',
      content: [
        'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such sites.'
      ]
    },
    {
      title: 'Changes to This Privacy Policy',
      content: [
        'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website with a new effective date.'
      ]
    }
  ]

  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        description="Protecting Your Privacy with Care"
      />
      
      <div className="container mx-auto px-4 py-section">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface rounded-custom shadow-custom p-8">
            <p className="text-text-light mb-6">
              <strong className="text-primary">Effective Date: March 28, 2025</strong>
            </p>
            <p className="text-text-light">
              Self Cast Studios ("we," "our," or "us") is committed to protecting the privacy of our clients 
              and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard 
              your information when you engage with our services or visit our website. By using our services 
              or accessing our website, you agree to the terms of this Privacy Policy.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">{index + 1}. {section.title}</h2>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-accent mr-3">•</span>
                    <span className="text-text-light">{item}</span>
                  </li>
                ))}
              </ul>
              {section.footer && (
                <p className="text-text-light mt-4">{section.footer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-surface rounded-custom shadow-custom p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-6">8. Contact Us</h2>
            <p className="text-text-light mb-6">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <a
              href="mailto:privacy@selfcaststudios.com"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              privacy@selfcaststudios.com
            </a>
            <p className="text-text-light mt-8">
              By using our services, you acknowledge that you have read and understand this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
