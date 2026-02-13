import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"

import App from "./App"

export async function render(url: string, helmetContext: any) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App helmetContext={helmetContext} />
      </StaticRouter>
    </StrictMode>
  )
}
