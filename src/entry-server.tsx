import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"

import App, { type HelmetContext } from "./App"

export async function render(url: string, helmetContext: HelmetContext) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App helmetContext={helmetContext} />
      </StaticRouter>
    </StrictMode>
  )
}
