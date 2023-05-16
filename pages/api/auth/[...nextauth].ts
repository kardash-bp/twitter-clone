import NextAuth, { Session, } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: any = {
  // Configure one or more authentication providers  
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: AdapterUser }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase()
      session.user.uid = token.id as string
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

export default NextAuth(authOptions)