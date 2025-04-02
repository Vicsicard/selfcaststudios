'use client';

interface ShareButtonProps {
  href: string;
  platform: string;
  color: string;
  hoverColor: string;
}

export function ShareButton({ href, platform, color, hoverColor }: ShareButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-8 py-3 text-white rounded-full transition-all hover:scale-105 font-medium"
      style={{ 
        backgroundColor: color,
        ['--hover-bg' as string]: hoverColor 
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = color)}
    >
      Share on {platform}
    </a>
  )
}
