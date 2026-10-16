import { HelmetProvider, type HelmetServerState } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@/components/ThemeProvider"
import Blog from "@/pages/Blog"
import BlogPost from "@/pages/BlogPost"
import Home from "@/pages/Home"

export type HelmetContext = { helmet?: HelmetServerState }

function App({ helmetContext }: { helmetContext?: HelmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider storageKey="bruno-so-theme">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
