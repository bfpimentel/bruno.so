import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter, HashRouter } from "react-router-dom"

import App from "@/App.tsx"

import "./styles.css"

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Could not find root element to mount to")
}

const Router = import.meta.env.SSR ? BrowserRouter : HashRouter

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <Router>
      <App />
    </Router>
  )
} else {
  createRoot(rootElement).render(
    <Router>
      <App />
    </Router>
  )
}
