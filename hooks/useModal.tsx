'use client'

import { useState, useCallback } from 'react'
import Modal from '@/components/Modal'
import ContactForm from '@/components/ContactForm'
import SuccessMessage from '@/components/SuccessMessage'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode | null>(null)

  const openModal = useCallback((content: React.ReactNode) => {
    setContent(content)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setContent(null), 300) // Clear content after animation
  }, [])

  const showContactForm = useCallback((sourcePage: string) => {
    openModal(
      <ContactForm
        sourcePage={sourcePage}
        onSuccess={() => {
          setContent(<SuccessMessage />)
          setTimeout(closeModal, 6000) // Increased from 3000ms to 6000ms
        }}
      />
    )
  }, [openModal, closeModal])

  const ModalComponent = useCallback(
    () => (
      <Modal isOpen={isOpen} onClose={closeModal}>
        {content}
      </Modal>
    ),
    [isOpen, content, closeModal]
  )

  return {
    ModalComponent,
    showContactForm,
    openModal,
    closeModal
  }
}
