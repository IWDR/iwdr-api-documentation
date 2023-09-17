import { createContext, useEffect } from 'react';
import useSWR from 'swr';
import axios from '@/lib/axios';

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    revalidate: () => {},
});

export default function AuthProvider({ value, children }) {
    const { data: client_side_user, mutate } = useSWR(
        '/user-info',
        () => axios.get('/user-info').then((r) => r?.data?.data),
        {
            fallbackData: null,
            onError: () => {},
        }
    );

    useEffect(() => {
        value.setUser(client_side_user);
    }, [client_side_user]);

    return <AuthContext.Provider value={{ ...value, revalidate: mutate }}>{children}</AuthContext.Provider>;
}
