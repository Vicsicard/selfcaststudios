'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Early exit if we're on the get-started page
  if (pathname === '/get-started') {
    return null;
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-surface shadow-custom-elevated backdrop-blur-sm w-full overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary hover:text-accent transition-colors tracking-tight truncate"
          >
            Self Cast Studios
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActive(link.href)
                    ? 'text-accent font-semibold'
                    : 'text-text-light hover:text-accent'
                } transition-colors relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                  isActive(link.href) ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-text-light hover:text-accent transition-colors relative group"
            >
              Contact
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                isActive('/contact') ? 'w-full' : ''
              }`} />
            </Link>
            <Link
              href="/get-started"
              className="bg-accent hover:bg-accent-light text-text-white px-6 py-2 rounded-custom transition-colors shadow-custom hover:shadow-custom-hover"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-custom hover:bg-surface-dark transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden fixed top-[64px] left-0 right-0 bg-surface-dark shadow-custom-lg max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex flex-col space-y-2 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isActive(link.href)
                      ? 'text-accent font-semibold'
                      : 'text-text-light hover:text-accent'
                  } transition-colors px-4 py-3 rounded-custom hover:bg-surface text-lg`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={`${
                  isActive('/contact')
                    ? 'text-accent font-semibold'
                    : 'text-text-light hover:text-accent'
                } transition-colors px-4 py-3 rounded-custom hover:bg-surface text-lg`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/get-started"
                className="bg-accent hover:bg-accent-light text-text-white px-6 py-3 rounded-custom transition-colors shadow-custom hover:shadow-custom-hover text-center text-lg mt-4"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
