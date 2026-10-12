import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App.jsx'

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID

const app = auth0Domain && auth0ClientId
  ? (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{ redirect_uri: window.location.origin, scope: 'openid profile email' }}
    >
      <App />
    </Auth0Provider>
  )
  : (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-800">
      <section className="max-w-lg border-l-4 border-amber-500 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase text-amber-700">Authentication setup required</p>
        <h1 className="mt-2 text-xl font-bold">Connect your Auth0 application</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID in your local environment, then restart the development server.
        </p>
      </section>
    </main>
  )

createRoot(document.getElementById('root')).render(<StrictMode>{app}</StrictMode>)
