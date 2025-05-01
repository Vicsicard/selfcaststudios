'use client'

import Link from 'next/link'
import { useModal } from '@/hooks/useModal'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { ModalComponent, showContactForm } = useModal()
  const pathname = usePathname()
  
  // Early exit if we're on the get-started page
  if (pathname === '/get-started') {
    return null;
  }

  return (
    <footer className="bg-surface py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Self Cast Studios</h3>
            <p className="text-text-light mb-4">Shape the narrative before it shapes you.</p>
            <p className="text-text-light mb-6">Not sure where to start? Let's talk.</p>
            <a 
              href="mailto:info@selfcaststudios.com"
              className="inline-block bg-accent hover:bg-accent-light text-text-white px-6 py-3 rounded-custom transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-text-light hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-light hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-light hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-light hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-light hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-light hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-text-light">
                <a href="tel:303.900.8291" className="hover:text-accent transition-colors">
                  303.900.8291
                </a>
              </li>
              <li className="text-text-light">
                <a href="mailto:info@selfcaststudios.com" className="hover:text-accent transition-colors">
                  info@selfcaststudios.com
                </a>
              </li>
              <li className="text-text-light">
                Boulder, Colorado
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-dark mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-light text-sm">
              &copy; {currentYear} Self Cast Studios. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <ModalComponent />
    </footer>
  )
}
