import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectToDatabase } from "../../../../utils/database";
import User from "../../../../models/user";


const handler = NextAuth({

    session:{
        strategy: "jwt"
    },

    pages:{
        signIn: "/Login",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({ token , session}){
            
            session.user.id = token.id;
            session.user.role = token.role;
            return session;

        },

        async jwt({ token , account}) {

            
            //load user from database to check role 
            if(account){
                //account sirf singin kay waqt available hota hai singin kay bad is block main nahi ana so checkking account
                    await connectToDatabase();
                    
                    const DBuser = await User.findOne({email: token.email});
                    if(!DBuser){
                        return token;
                    } else {
                        token.id = DBuser._id.toString();
                        token.role = DBuser.role;
                        return token;
                    }
        } else {
            return token;
        }

        },

        async signIn({profile}){
            try {         
                await connectToDatabase();
                // Check if user exists
                const user = await User.findOne({email: profile.email});
                if (!user) {
                    // Create user if not found
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                        role: "user"
                    });
                }
                return true;
            }
            catch (error) {
                console.log("Error in signIn callback");
                console.log(error);
                return false;
            }
        },
        redirect () {
            return '/Admin'
        }
    }
});

export {handler as GET, handler as POST}
