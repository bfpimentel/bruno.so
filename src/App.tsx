import { HelmetProvider } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@/components/ThemeProvider"
import Blog from "@/pages/Blog"
import BlogPost from "@/pages/BlogPost"
import Home from "@/pages/Home"

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="bruno-so-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
