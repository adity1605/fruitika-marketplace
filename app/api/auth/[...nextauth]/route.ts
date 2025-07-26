import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  // Temporarily disable adapter for production
  // adapter: process.env.DATABASE_URL ? PrismaAdapter(prisma) : undefined,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Simple test user for now
        if (credentials.email === "test@fruitika.com" && credentials.password === "password123") {
          return {
            id: "1",
            email: "test@fruitika.com",
            name: "Test User",
            role: "user",
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Allow all sign-ins for now
        console.log("Sign in attempt:", { 
          email: user.email, 
          provider: account?.provider 
        })
        return true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return true // Allow sign in even if there's an error
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly
      console.log("Redirect callback:", { url, baseUrl })
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (url.startsWith(baseUrl)) return url
      return baseUrl
    },
    async jwt({ token, user, account }) {
      // Include user info in JWT token
      if (user) {
        token.role = user.role || 'user'
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.id as string) || (token.sub as string)
        session.user.role = (token.role as string) || 'user'
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
})

export { handler as GET, handler as POST }