import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <div className="flex w-full justify-center pt-8">
      <Link to="/#" className="transition-opacity hover:opacity-80">
        <svg
          width="48"
          height="48"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-zinc-900 dark:fill-white"
        >
          <path d="M233.563 650H566.507V300H281.127V250H614.07V700H186V100H233.563V650ZM518.943 600H281.127V350H518.943V600ZM328.69 550H471.38V400H328.69V550ZM423.816 500H376.253V450H423.816V500Z" />
        </svg>
      </Link>
    </div>
  )
}
