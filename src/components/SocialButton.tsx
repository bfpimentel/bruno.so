type SocialButtonProps = {
  link: string
  imgSrc: string
}

export default function SocialButton({ link, imgSrc }: SocialButtonProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center border border-zinc-300 bg-zinc-100 transition-colors hover:border-black hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-white dark:hover:bg-zinc-800"
    >
      <img className="h-5 w-5 dark:invert" src={imgSrc} alt="Social Icon" />
    </a>
  )
}
