import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    image?: string
    provider: string
    providerId: string
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/providers/42-school' {
  interface FortyTwoProfile {
    id: number
    email: string
    login: string
    first_name: string
    last_name: string
    usual_full_name: string
    usual_first_name: null
    url: string
    phone: string
    displayname: string
    image_url: string
    // Add other fields as needed
  }
} 