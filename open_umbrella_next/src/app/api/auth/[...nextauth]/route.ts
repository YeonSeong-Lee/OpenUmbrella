import NextAuth from 'next-auth'
import FortyTwoProvider from 'next-auth/providers/42-school'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FortyTwoProvider({
      clientId: process.env.FORTYTWO_CLIENT_ID!,
      clientSecret: process.env.FORTYTWO_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) return false

      try {
        // 사용자 생성 또는 업데이트
        await prisma.user.upsert({
          where: { email: user.email },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId
          },
          update: {
            name: user.name,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId
          }
        })
        return true
      } catch (error) {
        console.error('Error saving user:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! }
        })
        if (dbUser) {
          session.user.id = dbUser.id
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth',
  }
})

export { handler as GET, handler as POST } 