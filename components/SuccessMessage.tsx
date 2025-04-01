'use client'

import { motion } from 'framer-motion'

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center"
        >
          <svg
            className="w-8 h-8 text-accent"
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
      
      <h3 className="text-2xl font-bold text-primary mb-4">
        Thank you for your submission!
      </h3>
      
      <p className="text-text-light">
        We will be in contact with you as soon as possible.
      </p>
    </motion.div>
  )
}
