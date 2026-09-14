import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Invalid credentials");
        }

        await dbConnect();

        // Backend validation for admin credentials
        const configuredAdminEmail = (
          process.env.ADMIN_EMAIL || "shikha5389@gmail.com"
        ).trim().toLowerCase();
        const configuredAdminPassword = process.env.ADMIN_PASSWORD;

        const adminEmails = process.env.ADMIN_EMAILS
          ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
          : [configuredAdminEmail];

        let user = await User.findOne({ email });

        if (adminEmails.includes(email)) {
          // Admin credentials MUST match configuredAdminPassword or verified existing admin user password
          let isMatch = false;
          if (configuredAdminPassword && password === configuredAdminPassword) {
            isMatch = true;
          } else if (user && user.role === "admin" && user.password) {
            isMatch = await bcrypt.compare(password, user.password);
          }

          if (!isMatch) {
            throw new Error("Invalid credentials");
          }

          // Ensure admin user exists in DB and has hashed password and admin role
          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
              email,
              name: email === configuredAdminEmail ? "Admin Shikha" : "Admin",
              password: hashedPassword,
              role: "admin",
            });
          } else if (user.role !== "admin" || !user.password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.role = "admin";
            user.password = hashedPassword;
            await user.save();
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || (email === configuredAdminEmail ? "Admin Shikha" : "Admin"),
            role: "admin",
          };
        }

        // Standard user login (must have password and cannot be admin role)
        if (!user || !user?.password || user.role === "admin") {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            providerAccountId: account.providerAccountId,
          });
        }
        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // user object is only available on sign in
        if (account?.provider === "google") {
          await dbConnect();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
          }
        } else {
          token.id = user.id;
        }
        if (user.email) {
          token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.id;
        if (token.email) {
          session.user.email = token.email as string;
        }
      }
      return session;
    },
  },
  secret: (() => {
    if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET is required in production environments");
    }
    return process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_purposes_only_replace_in_production";
  })(),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
