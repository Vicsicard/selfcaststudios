import PageHeader from '@/components/PageHeader'

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        description="Get in Touch"
        backgroundImage="https://imagestopost.carrd.co/assets/images/image05.jpg?v=fa27f6da"
        darkText={false}
      />
      
      <div className="container mx-auto px-4 py-section">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-surface rounded-custom shadow-custom p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-text-light mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 rounded-custom border-2 border-neutral-light/20 focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-text-light mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 rounded-custom border-2 border-neutral-light/20 focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-text-light mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-custom border-2 border-neutral-light/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-text-light mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-custom border-2 border-neutral-light/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-text-light mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-custom border-2 border-neutral-light/20 focus:border-accent outline-none transition-colors"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-text-white px-8 py-4 rounded-custom transition-colors shadow-custom hover:shadow-custom-hover"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-surface rounded-custom shadow-custom p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-primary mb-2">Address</h3>
                  <p className="text-text-light">123 Studio Street<br />Denver, CO 80202</p>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Email</h3>
                  <p className="text-text-light">info@selfcaststudios.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Phone</h3>
                  <p className="text-text-light">(303) 555-0123</p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-custom shadow-custom p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Business Hours</h2>
              <div className="space-y-2">
                <p className="flex justify-between text-text-light">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between text-text-light">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between text-text-light">
                  <span>Sunday</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
