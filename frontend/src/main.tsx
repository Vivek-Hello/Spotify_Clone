
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ClerkProvider } from '@clerk/clerk-react'
import {BrowserRouter} from "react-router-dom"
import AuthProviders from './providers/AuthProviders.tsx'
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <BrowserRouter>
    <AuthProviders>
      <App />
    </AuthProviders>
  </BrowserRouter>
</ClerkProvider>

)
