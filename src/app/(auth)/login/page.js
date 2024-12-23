'use client'

import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import { Button } from '@/components/ui/button'
import { PulseLoader } from 'react-spinners'

const Login = () => {
    const router = useRouter()

    const { login, isLoading } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [pn, setPn] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        try {
            await login({
                pn,
                password,
                remember: shouldRemember,
                setErrors,
                setStatus,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                {/* Personal Number */}
                <div>
                    <Label htmlFor="pn">Personal Number</Label>

                    <Input
                        id="pn"
                        type="text"
                        value={pn}
                        className="block mt-1 w-full"
                        onChange={event => setPn(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.pn} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <InputError messages={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/forgot-password"
                        className="underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </Link>

                    <Button className="ml-3" disabled={isLoading}>
                        {isLoading ? (
                            <PulseLoader
                                size={8}
                                color="#ffffff"
                                speedMultiplier={0.5}
                            />
                        ) : (
                            'Login'
                        )}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login
