import { Helmet } from "react-helmet-async"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function SEO({
  title = "Bruno Pimentel",
  description = "Senior Software Engineer",
  image = "/bfmp.svg",
  url = "https://bruno.so",
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="bruno.so" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
