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

  const inputClasses = "w-full px-4 py-3 rounded-custom border-2 border-surface-dark bg-surface-dark/30 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-custom-dark hover:shadow-custom-dark-hover text-lg text-text-light placeholder-text-light/50"

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
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
              className={inputClasses}
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
              className={inputClasses}
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
              className={inputClasses}
              rows={5}
              placeholder="How can we help you?"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-light text-text-white px-8 py-4 rounded-custom transition-colors shadow-custom-dark hover:shadow-custom-dark-hover disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
