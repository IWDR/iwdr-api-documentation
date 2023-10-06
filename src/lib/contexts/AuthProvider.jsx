import { createContext, useEffect } from 'react';

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    revalidate: () => {},
});

export default function AuthProvider({ value, children }) {
    const client_side_user = null;
    const mutate = () => {};
    // const { data: client_side_user, mutate } = useSWR(
    //     '/user-info',
    //     async () =>
    //         await axios.get('/user-info', { headers: { 'Cache-Control': 'no-cache' } }).then((r) => r?.data?.data),
    //     {
    //         fallbackData: null,
    //         onError: () => {},
    //     }
    // );

    useEffect(() => {
        value.setUser(client_side_user);
    }, [client_side_user]);

    return <AuthContext.Provider value={{ ...value, revalidate: mutate }}>{children}</AuthContext.Provider>;
}
