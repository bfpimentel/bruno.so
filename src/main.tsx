import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"

import App from "@/App.tsx"

import "./styles.css"

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Could not find root element to mount to")
}

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
