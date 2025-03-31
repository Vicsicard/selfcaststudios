import PageHeader from '@/components/PageHeader'

export default function TermsPage() {
  const services = [
    'Narrative Reframing Workshops',
    'Voice-Driven Content Creation',
    'Google Visibility Strategies',
    'Website Refresh or Build',
    'Content Broadcast Planning'
  ]

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By using our website, you confirm that you have read, understood, and agree to be bound by these Terms, including any future modifications. Your continued use of our services constitutes your acceptance of any changes.'
    },
    {
      title: 'Description of Services',
      content: 'Self Cast Studios provides personal branding, narrative defense, and storytelling services. Our offerings include, but are not limited to:',
      list: services,
      footer: 'All services are designed to help you control your narrative and present your authentic story.'
    },
    {
      title: 'Client Responsibilities',
      content: 'Clients are responsible for providing accurate, complete, and up-to-date information when engaging our services. You agree to cooperate and supply any necessary details required for us to deliver personalized services effectively.'
    },
    {
      title: 'Payment and Fees',
      content: 'Where applicable, our services are provided for a fee. Fees and payment terms will be communicated prior to service engagement. All payments must be made in full according to the agreed-upon schedule. Fees are non-refundable unless expressly stated otherwise in a separate agreement.'
    },
    {
      title: 'Intellectual Property',
      content: 'All content, materials, and methodologies provided by Self Cast Studios are the intellectual property of Self Cast Studios or our licensors. You are granted a limited, non-exclusive, non-transferable license to use such materials solely for the purposes intended by our services.'
    },
    {
      title: 'Limitation of Liability',
      content: 'To the fullest extent permitted by law, Self Cast Studios shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services. This includes, without limitation, any loss of data, revenue, or reputation. Nothing in these Terms limits our liability for fraud or fraudulent misrepresentation.'
    },
    {
      title: 'Termination',
      content: 'We reserve the right to terminate or suspend your access to our services at our sole discretion and without prior notice if we determine that your conduct violates these Terms or is harmful to other users or our business operations.'
    },
    {
      title: 'Changes to These Terms',
      content: 'Self Cast Studios may update these Terms from time to time. Any changes will be posted on this page along with an updated effective date. Your continued use of our services after such modifications constitutes your acceptance of the revised Terms.'
    },
    {
      title: 'Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Self Cast Studios operates, without regard to its conflict of laws provisions.'
    },
    {
      title: 'Dispute Resolution',
      content: 'In the event of any disputes arising from these Terms or your use of our services, both parties agree to attempt to resolve the matter through informal negotiations first. If a resolution cannot be reached, disputes will be submitted to mediation or arbitration as mutually agreed upon, and any such proceeding shall be held in the jurisdiction where Self Cast Studios is based.'
    },
    {
      title: 'Indemnification',
      content: 'You agree to indemnify, defend, and hold harmless Self Cast Studios, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, or expenses (including reasonable attorneys\\\' fees) arising out of or in any way connected with your access to or use of our website or services, or your breach of these Terms.'
    },
    {
      title: 'Severability',
      content: 'If any provision of these Terms is found to be invalid or unenforceable, that provision shall be severed and the remaining provisions will remain in full force and effect.'
    },
    {
      title: 'No Waiver',
      content: 'The failure of Self Cast Studios to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision, nor shall any waiver be effective unless in writing and signed by an authorized representative.'
    },
    {
      title: 'Entire Agreement',
      content: 'These Terms constitute the entire agreement between you and Self Cast Studios regarding your use of our website and services, and supersede all prior agreements, communications, or understandings (whether written or oral) regarding the subject matter hereof.'
    }
  ]

  return (
    <div>
      <PageHeader
        title="Terms of Service"
        description="Our Commitment to You"
      />
      
      <div className="container mx-auto px-4 py-section">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface rounded-custom shadow-custom p-8">
            <p className="text-text-light mb-6">
              <strong className="text-primary">Effective Date: March 28, 2025</strong>
            </p>
            <p className="text-text-light">
              Welcome to Self Cast Studios. These Terms of Service ("Terms") govern your access to and use 
              of our website and services. By accessing or using our services, you agree to be bound by 
              these Terms. If you do not agree with any part of these Terms, please refrain from using 
              our website or engaging with our services.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-surface rounded-custom shadow-custom p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {index + 1}. {section.title}
              </h2>
              <p className="text-text-light mb-4">{section.content}</p>
              {section.list && (
                <ul className="space-y-3 mb-4">
                  {section.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-accent mr-3">•</span>
                      <span className="text-text-light">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="text-text-light mt-4">{section.footer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-surface rounded-custom shadow-custom p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
            <p className="text-text-light mb-6">
              If you have any questions or concerns about these Terms, please contact us at:
            </p>
            <a
              href="mailto:terms@selfcaststudios.com"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-12 py-4 rounded-custom transition-colors text-lg shadow-custom hover:shadow-custom-hover"
            >
              terms@selfcaststudios.com
            </a>
            <p className="text-text-light mt-8">
              By using our website and services, you acknowledge that you have read, understood, and agree to these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
