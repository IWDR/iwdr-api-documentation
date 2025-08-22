import NextAuth from 'next-auth';

const apiurl = process.env.NEXT_PUBLIC_API_URL;
const IWDROAuthProvider = {
    id: 'iwdr',
    name: 'International Working Dog Registry',
    type: 'oauth',
    version: "2.0",
    authorization: {
        url: `${apiurl}/oauth/authorize`,
        params: { grant_type: "authorization_code", scope: "api-applications.create user.view geolocate.view references.* people.list region.list" },
    },
    token: `${apiurl}/oauth/token`,
    userinfo: `${apiurl}/api/public/v1/user-info`,
    clientId: process.env.IWDR_API_CLIENT_ID,
    clientSecret: process.env.IWDR_API_CLIENT_SECRET,
    async profile(profile, tokens) {
        return {
            iwdr_user: { ...profile.data },
            access_token: tokens.access_token,
            id: profile.data.usr_ID,
            email: profile.data.usr_Email,
            name: profile.data.usr_FirstName + ' ' + profile.data.usr_LastName,
            image: '',
        };
    },
};

export const authOptions = {
    providers: [IWDROAuthProvider],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user;
            }

            return token;
        },
        session({ session, token }) {
            if (token.user) {
                session.user = token.user;
            }

            return session;
        },
    },
};

export default NextAuth(authOptions);
