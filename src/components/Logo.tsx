import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <Link to="/" aria-label="Home" className="shrink-0 transition-opacity hover:opacity-70">
      <svg
        width="28"
        height="28"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="size-7 fill-zinc-900 dark:fill-zinc-100"
        aria-hidden="true"
      >
        <path d="M233.563 650H566.507V300H281.127V250H614.07V700H186V100H233.563V650ZM518.943 600H281.127V350H518.943V600ZM328.69 550H471.38V400H328.69V550ZM423.816 500H376.253V450H423.816V500Z" />
      </svg>
    </Link>
  )
}
