'use client'

import { motion } from 'framer-motion'

interface SuccessMessageProps {
  message?: string
  onClose?: () => void
}

export default function SuccessMessage({ 
  message = "We will be in contact with you as soon as possible.",
  onClose 
}: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-surface rounded-custom shadow-custom-dark p-6 max-w-md mx-auto">
        <div className="mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        </div>
        
        <p className="text-text-light text-center">
          {message}
        </p>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-text-light hover:text-text-dark transition-colors p-1"
            aria-label="Close message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}
