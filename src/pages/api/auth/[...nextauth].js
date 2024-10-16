import NextAuth from 'next-auth';
import axios from '@/lib/axios';

const apiurl = process.env.NEXT_PUBLIC_API_URL;
const IWDROAuthProvider = {
    id: 'iwdr',
    name: 'International Working Dog Registry',
    type: 'oauth',
    authorization: {
        url: `${apiurl}/oauth/authorize`,
        params: {
            response_type: 'code',
            scope: 'access-application.create user.view geolocate.view references.* people.list region.list',
        },
    },
    token: { url: `${apiurl}/oauth/token`, params: { grant_type: 'authorization_code' } },
    userinfo: {
        url: `${apiurl}/api/public/v1/user-info`,
        request: async (context) => {
            let token = context.tokens.access_token;
            return await axios
                .get(`${apiurl}/api/public/v1/user-info`, { headers: { Authorization: 'Bearer ' + token } })
                .then((r) => {
                    return r?.data?.data;
                })
                .catch((err) => {
                    console.log(err);
                    return null;
                });
        },
    },
    idToken: false,
    clientId: process.env.IWDR_API_CLIENT_ID,
    clientSecret: process.env.IWDR_API_CLIENT_SECRET,
    profile: (profile, token) => {
        return {
            ...profile,
            access_token: token.access_token,
            id: profile.usr_ID,
            email: profile.usr_Email,
            name: profile.usr_FirstName + ' ' + profile.usr_LastName,
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
