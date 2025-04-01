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
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        sourcePage,
        timestamp: new Date().toISOString()
      }
      
      const response = await fetch('https://hook.us1.make.com/f4a2m1jfth1yrmzjde1uxwicb7zmu6yt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      console.log('Form submitted successfully:', submitData)
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('There was an error submitting the form. Please try again.')
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-text-white px-8 py-3 rounded-custom transition-all shadow-custom hover:shadow-custom-hover"
          >
            {isSubmitting ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center"
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </motion.span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
