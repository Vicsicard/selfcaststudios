interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage?: string;
  darkText?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  subtitle,
  backgroundImage,
  darkText = false,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`relative py-24 mt-20 ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-surface-dark opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-surface-darker opacity-30" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkText ? 'text-primary' : 'text-text-white'}`}>
            {title}
          </h1>
          {description && (
            <p className={`text-xl md:text-2xl ${darkText ? 'text-primary' : 'text-text-white opacity-90'}`}>
              {description}
            </p>
          )}
          {subtitle && (
            <p className={`text-lg md:text-xl ${darkText ? 'text-primary' : 'text-text-white opacity-80'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}
