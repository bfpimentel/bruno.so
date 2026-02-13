type HeaderProps = {
  name: string
  photoUrl: string
  bio: string
}

export default function Header({ name, photoUrl, bio }: HeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        className="mb-6 size-48 border-2 border-zinc-900 object-cover dark:border-white sm:size-32"
        fetchPriority="high"
        src={photoUrl}
        alt="Profile Picture"
      />
      <h1 className="max-w-md text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
        {name}
      </h1>
      <h3 className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-300 sm:text-md">
        {bio}
      </h3>
    </div>
  )
}
