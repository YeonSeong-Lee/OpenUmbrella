import NextAuth from 'next-auth'
import FortyTwoProvider from 'next-auth/providers/42-school'
import GoogleProvider from 'next-auth/providers/google'

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
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async session({ session }) {
      return session
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
})

export { handler as GET, handler as POST } 