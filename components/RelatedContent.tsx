'use client'

import Link from 'next/link'
import Image from 'next/image'

export interface RelatedItem {
  title: string
  description: string
  href: string
  imageUrl?: string
  type: 'service' | 'blog' | 'testimonial'
}

export interface RelatedContentProps {
  title?: string
  items: RelatedItem[]
  className?: string
}

export default function RelatedContent({ 
  title = "Related Content",
  items,
  className = ""
}: RelatedContentProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-8">{title}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className="group block bg-surface rounded-custom shadow-custom hover:shadow-custom-hover transition-shadow p-6"
            >
              {item.imageUrl && (
                <div className="relative aspect-video mb-4 rounded-custom overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="space-y-2">
                <span className="text-sm text-accent uppercase tracking-wider">
                  {item.type}
                </span>
                <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-light">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
