import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@/components/ThemeProvider"
import Home from "@/pages/Home"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="bruno-so-theme">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
