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

        const user = await prisma.user.findFirst({
          where: { 
            email: credentials.email,
            password: { not: null }
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password)

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async linkAccount({ user, account }) {
      console.log('Account linked:', { userId: user.id, provider: account.provider })
    },
    async signIn({ user, account, profile, isNewUser }) {
      console.log('Sign in event:', { 
        userId: user.id, 
        provider: account?.provider, 
        isNewUser,
        email: user.email 
      })
    }
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For now, just allow all Google OAuth sign-ins without database interaction
        if (account?.provider === "google") {
          console.log("Google OAuth sign in:", user.email)
          return true
        }
        return true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return true // Allow sign in even if there's an error
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly
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
        
        // For now, don't try to connect to database in session callback
        // This will be fixed once we move to a proper database solution
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