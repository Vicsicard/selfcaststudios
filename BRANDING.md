# Self Cast Studios - Branding Guide

## Typography

### Primary Font
- **Font Family**: Playfair Display
- **Usage**: All headings and body text
- **Implementation**: 
  ```css
  font-family: 'Playfair Display', serif;
  ```

## Color Palette

### Primary Colors
- **Deep Blue-Gray**: #1E293B
  - Light: #334155
  - Dark: #0F172A
  - Usage: Main backgrounds, headers

### Secondary Colors
- **Light Gray-Blue**: #F8FAFC
  - Dark: #E2E8F0
  - Usage: Secondary backgrounds, cards

### Accent Colors
- **Golden**: #C8A456
  - Light: #DEB874
  - Dark: #B18D3D
  - Usage: Highlights, buttons, interactive elements

### Text Colors
- **Primary Text**: #1E293B
- **Light Text**: #64748B
- **White Text**: #FFFFFF
- Usage: Various text elements based on background contrast

### Surface Colors
- **White**: #FFFFFF
- **Light Gray**: #F1F5F9
- Usage: Cards, content backgrounds

## Spacing

### Custom Spacing Units
- **Section Padding**: 6rem
- **Hero Height**: 80vh
- **Container**: max-width with padding
  ```css
  .container {
    max-width: 1280px;
    padding: 0 1rem;
    margin: 0 auto;
  }
  ```

## Components

### Buttons
- **Border Radius**: 0.625rem
- **Padding**: 1rem 2rem (py-4 px-8)
- **Transitions**: color, shadow
- **Shadow**: 
  - Default: 0 4px 20px rgba(0, 0, 0, 0.08)
  - Hover: 0 8px 30px rgba(0, 0, 0, 0.12)

### Cards
- **Border Radius**: 0.625rem
- **Padding**: 2rem (p-8)
- **Background**: Surface colors
- **Shadow**: Same as buttons
- **Hover Effect**: Enhanced shadow

### Navigation
- **Height**: Auto with padding (py-4)
- **Links**: 
  - Spacing: 2rem between items (space-x-8)
  - Hover: Accent color transition
  - Font: Regular weight

## Images

### Hero Background
- Source: https://imagestopost.carrd.co/assets/images/image05.jpg?v=547a2358
- Overlay: Primary dark color with 60% opacity
- Object Fit: Cover

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Considerations
- Navigation collapses to hamburger menu
- Grid columns adjust
- Font sizes reduce
- Spacing adjusts proportionally

## Animation/Transitions

### Hover Effects
- **Duration**: 300ms
- **Properties**: 
  - Colors
  - Shadows
  - Opacity

## Implementation Notes

### Tailwind Configuration
- Custom colors defined in `tailwind.config.js`
- Custom spacing and shadows
- Font family configuration
- Custom border radius

### CSS Variables
```css
:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}
```

### Best Practices
1. Maintain consistent spacing using theme values
2. Use semantic color names based on usage
3. Ensure sufficient contrast for accessibility
4. Maintain responsive design principles
5. Use provided shadow values for depth
6. Apply transitions for interactive elements
