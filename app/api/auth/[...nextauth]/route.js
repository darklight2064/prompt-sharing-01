import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { ConnectToDB } from '@/utils/database';
import User from '@/models/user';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 100000
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ username: session.user.name })
      session.user.id = sessionUser._id.toString()
      return session;
    },
    async signIn({ user }) {
      await ConnectToDB();

      try {
        const userExists = await User.findOne({ username: user?.name })
        if (userExists === null) {
          await User.create({
            username: user?.name,
            email: user?.email,
            image: user?.image
          })
        }
        return true;
      } catch (err) {
        console.log("sign in error: ", user)
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST };
