'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormProps {
  sourcePage: string
  onSuccess: () => void
}

export default function ContactForm({ sourcePage, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Include the source page with the form data
      const submitData = {
        ...formData,
        sourcePage
      }
      
      console.log('Form submitted:', submitData)
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">Get in Touch</h2>
          <p className="text-text-light mt-2">We'll get back to you as soon as possible.</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-text-light text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-custom border-2 border-surface-dark bg-surface-dark/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-custom-dark hover:shadow-custom-dark-hover text-base"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-text-light text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-custom border-2 border-surface-dark bg-surface-dark/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-custom-dark hover:shadow-custom-dark-hover text-base"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-text-light text-sm font-medium mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-custom border-2 border-surface-dark bg-surface-dark/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-custom-dark hover:shadow-custom-dark-hover text-base resize-none"
              placeholder="Your message"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-light disabled:bg-accent/70 text-text-white px-8 py-3 rounded-custom transition-colors text-base sm:text-lg font-medium shadow-custom hover:shadow-custom-hover disabled:cursor-not-allowed mt-6"
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>
    </div>
  )
}
