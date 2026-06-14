# Resume Frontend (Vite + React)

A high-performance, animated resume website built with React and Vite.

## Features

- **React + TypeScript**: Type-safe component development.
- **Framer Motion**: Smooth modal transitions and UI interactions.
- **Tailwind CSS**: Modern, utility-first styling.
- **Cloudflare Turnstile**: Integrated bot protection.
- **Vite**: Ultra-fast development server and build tool.

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Backend Configuration**:
   Ensure the backend service is running. The contact form is currently configured to send requests to `http://localhost:8000/api/contact`.
   _Note: If your backend is using SSL, update the protocol to `https` in `src/components/ContactModal.tsx`._

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```
