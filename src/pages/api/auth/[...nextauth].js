import NextAuth from 'next-auth';

const apiurl = process.env.NEXT_PUBLIC_API_URL;
const IWDROAuthProvider = {
    id: 'iwdr',
    name: 'International Working Dog Registry',
    type: 'oauth',
    version: "2.0",
    authorization: {
        url: `${apiurl}/oauth/authorize`,
        params: { grant_type: "authorization_code", scope: "api-applications.create support-ticket.create user.view references.* people.list region.list" },
    },
    token: `${apiurl}/oauth/token`,
    userinfo: `${apiurl}/api/public/v1/user-info`,
    clientId: process.env.IWDR_API_CLIENT_ID,
    clientSecret: process.env.IWDR_API_CLIENT_SECRET,
    async profile(profile, tokens) {
        console.log('IWDROAuthProvider profile', profile, tokens);

        const {data: user} = profile.data;

        return {
            iwdr_user: { ...user },
            access_token: tokens.access_token,
            id: user.usr_ID,
            email: user.usr_Email,
            name: user.usr_FirstName + ' ' + user.usr_LastName,
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
