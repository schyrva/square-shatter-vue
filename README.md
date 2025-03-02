# Square Shatter Vue

A modern Vue 3 application showcasing interactive animations and e-commerce functionality using TypeScript, Pinia, Vue Router, and Quasar Framework.

## Features

- Dynamic Square Shatter animation with Canvas and SVG rendering modes
- Product catalog with filtering and sorting capabilities
- Shopping cart functionality with persistent storage
- Responsive design supporting mobile and desktop experiences
- Landing page with custom styling

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code with Prettier
npm run format
```

## Project Structure

```
square-shatter-vue/
├── public/               # Static assets that will be served as-is
├── src/
│   ├── assets/           # Project assets
│   │   ├── images/       # Image files
│   │   ├── icons/        # Icon files
│   │   └── landing/      # Landing page specific assets
│   ├── components/       # Reusable Vue components
│   │   ├── cart/         # Cart related components
│   │   ├── catalog/      # Catalog related components
│   │   ├── layout/       # Layout components (header, footer)
│   │   ├── SquareShatter/ # Square shatter animation components
│   │   └── ui/           # Generic UI components
│   ├── composables/      # Vue composition API functions
│   ├── constants/        # Application constants
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia stores for state management
│   ├── styles/           # Global and shared styles
│   │   ├── base.css      # Base styles
│   │   ├── variables.css # CSS variables
│   │   └── landing/      # Landing page specific styles
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── views/            # Page components
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Technology Stack

- **Vue 3**: Frontend framework with Composition API
- **TypeScript**: For type-safe code
- **Pinia**: State management
- **Vue Router**: Navigation and routing
- **Quasar Framework**: UI component library
- **Vite**: Build tool and development server
- **ESLint & Prettier**: Code quality and formatting

## Best Practices

- **Component Organization**: Components are organized by feature and functionality
- **TypeScript Usage**: Strong typing for better developer experience
- **State Management**: Using Pinia with composition API for state management
- **Code Formatting**: Consistent code style with ESLint and Prettier
- **Responsive Design**: Mobile-first approach with adaptive layouts

## License

MIT
