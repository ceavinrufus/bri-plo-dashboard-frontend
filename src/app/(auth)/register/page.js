'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const Page = () => {
    const { register, isLoading } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [pn, setPn] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState('')
    const [tim, setTim] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const teams = {
        bcp: [
            { label: 'BCD', value: 'bcd' },
            { label: 'BCR', value: 'bcr' },
            { label: 'BCG', value: 'bcg' },
        ],
        igp: [
            { label: 'PTS', value: 'pts' },
            { label: 'PTG', value: 'ptg' },
            { label: 'PTT', value: 'ptt' },
            { label: 'IGM', value: 'igm' },
        ],
        psr: [
            { label: 'PSG', value: 'psg' },
            { label: 'REN', value: 'ren' },
            { label: 'LEG', value: 'leg' },
        ],
    }

    const submitForm = async event => {
        event.preventDefault()

        try {
            await register({
                name,
                pn,
                email,
                password,
                departemen: department,
                tim,
                password_confirmation: passwordConfirmation,
                setErrors,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={submitForm}>
            {/* Name */}
            <div>
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                />

                <InputError messages={errors.name} className="mt-2" />
            </div>

            {/* Personal Number */}
            <div className="mt-4">
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

            {/* Email Address */}
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    className="block mt-1 w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <InputError messages={errors.email} className="mt-2" />
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
                    autoComplete="new-password"
                />

                <InputError messages={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>

                <Input
                    id="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    className="block mt-1 w-full"
                    onChange={event =>
                        setPasswordConfirmation(event.target.value)
                    }
                    required
                />

                <InputError
                    messages={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            {/* Department */}
            <div className="mt-4">
                <Label htmlFor="department">Departemen</Label>

                <Select
                    onValueChange={value => setDepartment(value)}
                    defaultValue={department}>
                    <SelectTrigger className="mt-1 w-full flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                        <SelectValue placeholder="Departemen" />
                    </SelectTrigger>
                    <SelectContent className="">
                        <SelectItem value="bcp">BCP</SelectItem>
                        <SelectItem value="igp">IGP</SelectItem>
                        <SelectItem value="psr">PSR</SelectItem>
                    </SelectContent>
                </Select>

                <InputError messages={errors.department} className="mt-2" />
            </div>

            {/* Tim */}
            {department && (
                <div className="mt-4">
                    <Label htmlFor="tim">Tim</Label>

                    <Select
                        onValueChange={value => setTim(value)}
                        defaultValue={tim}>
                        <SelectTrigger className="mt-1 w-full flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                            <SelectValue placeholder="Tim" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {teams[department.toLowerCase()].map(team => (
                                <SelectItem key={team.value} value={team.value}>
                                    {team.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError messages={errors.tim} className="mt-2" />
                </div>
            )}

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/login"
                    className="underline text-sm text-gray-600 hover:text-gray-900">
                    Already registered?
                </Link>

                <Button className="ml-4" disabled={isLoading}>
                    {isLoading ? (
                        <PulseLoader
                            size={8}
                            color="#ffffff"
                            speedMultiplier={0.5}
                        />
                    ) : (
                        'Register'
                    )}
                </Button>
            </div>
        </form>
    )
}

export default Page
