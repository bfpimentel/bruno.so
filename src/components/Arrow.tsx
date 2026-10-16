export default function Arrow({ symbol }: { symbol: string }) {
  return (
    <span
      aria-hidden="true"
      className="col-start-2 row-start-1 -translate-x-1 text-zinc-500 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none sm:col-start-auto sm:row-start-auto dark:text-zinc-400"
    >
      {symbol}
    </span>
  )
}
