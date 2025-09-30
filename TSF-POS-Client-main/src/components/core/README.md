# Modern UI Component Library

This document provides guidelines for using the modern UI component library consistently across the application.

## Core Components

### Buttons
```jsx
// Primary Button
<Button 
  title="Submit" 
  className="modern-btn modern-btn-primary" 
/>

// Secondary Button
<Button 
  title="Cancel" 
  className="modern-btn modern-btn-secondary" 
/>

// Success Button
<Button 
  title="Save" 
  className="modern-btn modern-btn-success" 
/>

// Danger Button
<Button 
  title="Delete" 
  className="modern-btn modern-btn-danger" 
/>

// Outline Button
<Button 
  title="Edit" 
  className="modern-btn modern-btn-outline" 
/>
```

### Cards
```jsx
<div className="modern-card">
  <div className="modern-card-header">
    <h2 className="modern-card-title">Card Title</h2>
  </div>
  <div className="modern-card-body">
    Card content goes here
  </div>
</div>
```

### Forms
```jsx
<div className="modern-form-group">
  <label className="modern-form-label">Label</label>
  <input className="modern-input" type="text" />
</div>
```

### Tables
```jsx
<table className="modern-table">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

### Status Badges
```jsx
<span className="status-badge status-success">Success</span>
<span className="status-badge status-warning">Warning</span>
<span className="status-badge status-danger">Danger</span>
<span className="status-badge status-info">Info</span>
<span className="status-badge status-default">Default</span>
```

## Utility Classes

### Spacing
- `modern-mb-{size}` - Margin bottom (xs, sm, md, lg, xl, 2xl, 3xl)
- `modern-mt-{size}` - Margin top (xs, sm, md, lg, xl, 2xl, 3xl)
- `modern-p-{size}` - Padding (xs, sm, md, lg, xl, 2xl, 3xl)
- `modern-py-{size}` - Padding top and bottom
- `modern-px-{size}` - Padding left and right

### Flexbox
- `modern-flex` - Display flex
- `modern-flex-center` - Center content
- `modern-flex-between` - Space between
- `modern-flex-column` - Column direction
- `modern-flex-wrap` - Wrap content
- `modern-gap-{size}` - Gap between items

### Typography
- `modern-text-center` - Center text
- `modern-text-{size}` - Font size (sm, base, lg, xl, 2xl, 3xl, 4xl)
- `modern-font-{weight}` - Font weight (light, normal, medium, semibold, bold)
- `modern-text-gray-{number}` - Gray text colors (100-900)

### Grid
- `modern-grid` - Display grid
- `modern-grid-cols-{number}` - Grid columns (1-12)
- Responsive variants: `sm:`, `md:`, `lg:`, `xl:`

### Animations
- `modern-fade-in` - Fade in animation
- `modern-slide-in-right` - Slide in from right
- `modern-scale-in` - Scale in animation

## Responsive Design

The component library is fully responsive with breakpoints at:
- Small: 640px
- Medium: 768px
- Large: 1024px
- Extra Large: 1280px

Use responsive prefixes for different screen sizes:
```html
<div className="modern-grid md:modern-grid-cols-2 lg:modern-grid-cols-3">
  <!-- Content -->
</div>
```

## Color Palette

- Primary: `var(--primary-color)` (#4361ee)
- Secondary: `var(--secondary-color)` (#7209b7)
- Success: `var(--success-color)` (#4ade80)
- Warning: `var(--warning-color)` (#facc15)
- Danger: `var(--danger-color)` (#f87171)
- Info: `var(--info-color)` (#60a5fa)
- Gray Scale: `var(--gray-100)` to `var(--gray-900)`

## Spacing Scale

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

## Best Practices

1. Always use utility classes for consistent spacing
2. Use the card component for content containers
3. Apply status badges for visual feedback
4. Use responsive grid classes for layouts
5. Follow the color palette for consistent UI
6. Apply animations for smoother user experience
7. Use semantic HTML with appropriate class names