import axios from '@/lib/axios'
import useSWR from 'swr'
import {useAlertStore} from '@/stores/alertStore'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {
    const router = useRouter()
    const {showAlert, serverErrorAlert} = useAlertStore()

    const {
        data: user,
        error,
        mutate,
    } = useSWR(
        `/user-info`,
        () => axios.get('/user-info').then((res) => res.data?.data),
        {
            fallbackData: null,
            onError: () => {},
        }
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({setErrors, setLoading, redirect, ...form}) => {
        // Retrieve CSRF token
        await csrf()

        // Reset errors
        setErrors({usr_UserID: null, password: null})

        // Attempt login
        setLoading(true)
        axios
            .post('/login', form)
            .then(() => {
                // Mutate data
                mutate()
                showAlert('You are now signed in.', 'success', true, 6000)

                // Redirect the user to their desired destination
                if (redirect) {
                    let hrefURL = new URL(`${process.env.NEXT_PUBLIC_APP_URL}${redirect}`)
                    let pageURL = new URL(window.location)

                    // Ensure the redirect will not leave host domain
                    if (redirect.startsWith('/') || hrefURL.host === pageURL.host) {
                        router.push(hrefURL)
                    } else {
                        router.push('/')
                    }
                } else {
                    router.push('/')
                }
            })
            .catch((error) => {
                // Unknown error
                if (error.response?.status !== 422) {
                    serverErrorAlert()
                    return
                }

                // Capture field errors
                setErrors(
                    error.response?.data?.errors ?? {usr_UserID: null, password: null}
                )
            })
            .finally(() => setLoading(false))
    }

    const logout = async ({setLoading}) => {
        // There is no user so do not attempt logout
        if (error) {
            serverErrorAlert()
            return
        }

        // Perform logout
        setLoading(true)
        await axios
            .post('/logout')
            .then(() => {
                mutate(null)
                // Push back to index and show log out alert
                router.push('/')
                showAlert('You are now signed out.', 'success', true, 6000)
            })
            .catch(() => serverErrorAlert())
            .finally(() => setLoading(false))
    }

    return {
        user,
        login,
        logout,
    }
}
