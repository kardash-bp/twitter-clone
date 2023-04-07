import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string
    user: {
      email: string
      image: string
      name: string
      username?: string
      uid?: string
    }
  }
}