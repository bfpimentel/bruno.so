type HeaderProps = {
  name: string
  photoUrl: string
  bio: string
  role: string
}

export default function Header({ name, photoUrl, bio, role }: HeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        className="mb-6 h-48 w-48 border-2 border-zinc-900 object-cover dark:border-white"
        src={photoUrl}
        alt="Profile Picture"
      />
      <h1 className="mb-2 mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{name}</h1>
      <h2 className="mb-4 text-xl font-medium text-zinc-600 dark:text-zinc-400">{role}</h2>
      <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-300">{bio}</p>
    </div>
  )
}
