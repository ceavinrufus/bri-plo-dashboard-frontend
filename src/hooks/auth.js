import useSWR from 'swr' // Importing SWR for data fetching
import axios from '@/lib/axios' // Importing axios for HTTP requests
import { useEffect, useState } from 'react' // Importing React hooks
import { useParams, useRouter } from 'next/navigation' // Importing Next.js navigation hooks

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter() // Initializing router for navigation
    const params = useParams() // Initializing params for URL parameters
    const [isLoading, setIsLoading] = useState(false) // State to manage loading status

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user') // Fetching user data from API
            .then(res => res.data) // Returning user data
            .catch(error => {
                if (error.response.status !== 409) throw error // Handling error

                router.push('/verify-email') // Redirecting to verify email page
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie') // Fetching CSRF token

    const register = async ({ setErrors, ...props }) => {
        setIsLoading(true) // Setting loading state
        await csrf() // Ensuring CSRF token is set

        setErrors([]) // Clearing previous errors

        axios
            .post('/register', props) // Sending registration request
            .then(() => mutate()) // Mutating user data
            .catch(error => {
                if (error.response.status !== 422) throw error // Handling error

                setErrors(error.response.data.errors) // Setting validation errors
            })
            .finally(() => setIsLoading(false)) // Resetting loading state
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setIsLoading(true) // Setting loading state
        await csrf() // Ensuring CSRF token is set

        setErrors([]) // Clearing previous errors
        setStatus(null) // Clearing previous status

        axios
            .post('/login', props) // Sending login request
            .then(() => mutate()) // Mutating user data
            .catch(error => {
                if (error.response.status !== 422) throw error // Handling error

                setErrors(error.response.data.errors) // Setting validation errors
            })
            .finally(() => setIsLoading(false)) // Resetting loading state
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf() // Ensuring CSRF token is set

        setErrors([]) // Clearing previous errors
        setStatus(null) // Clearing previous status

        axios
            .post('/forgot-password', { email }) // Sending forgot password request
            .then(response => setStatus(response.data.status)) // Setting status message
            .catch(error => {
                if (error.response.status !== 422) throw error // Handling error

                setErrors(error.response.data.errors) // Setting validation errors
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf() // Ensuring CSRF token is set

        setErrors([]) // Clearing previous errors
        setStatus(null) // Clearing previous status

        axios
            .post('/reset-password', { token: params.token, ...props }) // Sending reset password request
            .then(
                response =>
                    router.push('/login?reset=' + btoa(response.data.status)), // Redirecting to login page with status
            )
            .catch(error => {
                if (error.response.status !== 422) throw error // Handling error

                setErrors(error.response.data.errors) // Setting validation errors
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification') // Sending email verification request
            .then(response => setStatus(response.data.status)) // Setting status message
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate()) // Sending logout request and mutating user data
        }

        window.location.pathname = '/login' // Redirecting to login page
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            if (user?.role === 'admin')
                router.push('/admin') // Redirecting admin user to admin page
            else router.push(redirectIfAuthenticated) // Redirecting authenticated user
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated) // Redirecting if email is verified
        if (middleware === 'auth' || middleware === 'admin') {
            if (error) {
                logout() // Logging out if there is an error
            }
            // else {
            //     if (
            //         window.location.pathname === '/monitoring-dokumen' &&
            //         user?.departemen !== 'psr' &&
            //         user?.role !== 'admin'
            //     ) {
            //         router.push('/dashboard') // Redirecting user to dashboard if not authorized
            //     }
            // }
        }

        if (middleware === 'admin' && user) {
            if (user.role !== 'admin') router.push('/dashboard') // Redirecting non-admin user to dashboard
        }
    }, [user, error]) // Dependency array for useEffect

    return {
        user,
        isLoading,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    } // Returning authentication methods and state
}
