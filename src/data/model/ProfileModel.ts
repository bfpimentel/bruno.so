export default interface ProfileModel {
  name: string
  photoUrl: string
  bio: string
  role: string
  projects: { name: string; description: string; link: string }[]
}
