import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectToDB from "@/utils/database";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks : {
        async session({session}) {
            const sessionUser = await User.findOne({
                email : session.user.email
            }) 
    
            session.user.id = sessionUser._id.toString(); 
            return session;
        }, 
    
        async signIn({profile}) {
            try{
                await connectToDB();
                const userExists = await User.findOne({ email : profile.email})
    
                if(!userExists) {
                    await User.create({
                        email : profile.email, 
                        name : profile.name, 
                        image: profile.picture
                    })
                }
                return true;
            }catch (error) {
                console.log(error);
                return false;
            }
        } 
    }
})

export { handler as GET, handler as POST }