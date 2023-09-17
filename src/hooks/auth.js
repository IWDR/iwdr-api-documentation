import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useAlertStore } from '@/stores/alertStore';
import { useContext } from 'react';
import { AuthContext } from '@/lib/contexts/AuthProvider';

export const getUserServerSide = async (request) => {
    const user_url = new URL('/user-info', process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(user_url, {
        headers: new Headers({
            Cookie: request.headers.cookie ?? '',
            'X-XSRF-TOKEN': request.cookies['XSRF-TOKEN'] ?? '',
            'X-Requested-With': 'XMLHttpRequest',
        }),
        credentials: 'include',
    });

    if (res.status !== 200) return null;

    const data = await res.json();
    return data.data;
};

export const getUserWithTitleProps = async (title, context) => {
    const user = await getUserServerSide(context.req);

    return {
        title,
        user,
    };
};

export const useAuth = () => {
    const router = useRouter();
    const { setUser, revalidate } = useContext(AuthContext);
    const { successAlert, errorAlert, serverErrorAlert } = useAlertStore();

    const csrf = async () => await axios.get('/sanctum/csrf-cookie');

    const login = async ({ setErrors, successRedirect, form }) => {
        // Retrieve CSRF token
        await csrf();

        // Reset errors
        setErrors({ usr_UserID: null, password: null });

        // Attempt login
        await axios
            .post('/login', form)
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res);
                    return;
                }

                revalidate();
                setUser({});
                // Check for two factor being enabled
                // if (res.data?.two_factor) {
                //     const two_factor_url = new URL('/auth/two-factor-challenge', process.env.NEXT_PUBLIC_APP_URL);
                //
                //     // Forward redirect to 2fa page
                //     if (successRedirect) {
                //         two_factor_url.searchParams.set('redirect', successRedirect);
                //     }
                //
                //     router.push(two_factor_url);
                //     return;
                // }

                // Redirect the user to their desired destination
                if (successRedirect) {
                    let redirectURL = new URL(decodeURIComponent(successRedirect), process.env.NEXT_PUBLIC_APP_URL);
                    router.push(redirectURL);
                } else {
                    router.push('/');
                }

                // Show success
                successAlert('You have been signed in.', true, 6000);
            })
            .catch((error) => {
                // Unknown error
                if (error.response?.status !== 422) {
                    serverErrorAlert();
                    return;
                }

                // Capture field errors
                errorAlert('There was an issue with your submission. Please review and try again.', true, 6000);
                setErrors(error.response?.data?.errors ?? { usr_UserID: null, password: null });
            });
    };

    const logout = async () => {
        // Perform logout
        await axios
            .post('/logout')
            .then(() => {
                revalidate();
                setUser(null);
                // Show log-out alert
                router.push('/login').then(() => {
                    successAlert('You have been signed out.', true, 6000);
                });
            })
            .catch((err) => {
                console.log(err);
                // An issue was encountered attempting to sign out the user
                serverErrorAlert();
            });
    };

    return {
        login,
        logout,
    };
};
