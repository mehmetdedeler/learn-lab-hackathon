import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Tell the parent page (Learn Lab) when the lesson crashes, so it can ask Claude to fix it.
function report(message) {
  window.parent?.postMessage({ type: 'app-error', message: String(message).slice(0, 2000) }, '*')
}
window.addEventListener('error', (e) => report(e.message))
window.addEventListener('unhandledrejection', (e) => report(e.reason))

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error) {
    report(error.message)
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="grid min-h-screen place-items-center p-8 text-center">
        <div>
          <p className="text-xl font-semibold text-rose-600">Something broke in this lesson.</p>
          <p className="mt-2 text-slate-500">{this.state.error.message}</p>
        </div>
      </div>
    )
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
