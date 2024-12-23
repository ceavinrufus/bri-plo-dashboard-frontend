'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { z } from 'zod'
import { updateUserData } from '@/lib/actions'
import { SelectItem } from '../ui/select'
import { teams } from '@/data/Tim'
import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'

// Validation schema
const UserFormValidation = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    pn: z.string().min(1, 'Personal Number is required'),
    departemen: z.string().optional(),
    tim: z.string().optional(),
    role: z.string().min(1, 'Role is required'),
})

export function EditUserForm({ defaultValues }) {
    const [isProcessing, setIsProcessing] = useState(false)
    const { updateUser } = useContext(UsersContext)

    const form = useForm({
        resolver: zodResolver(UserFormValidation),
        defaultValues,
    })

    const onSubmit = async data => {
        setIsProcessing(true)
        try {
            await updateUserData(defaultValues.id, data)
            toast({
                title: 'Success',
                description: 'User updated successfully!',
                status: 'success',
            })
            updateUser(defaultValues.id, data)
        } catch (error) {
            toast({
                title: 'Error',
                description: error?.message || 'Failed to update user',
                status: 'error',
            })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6">
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Enter user name"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="pn"
                    label="Personal Number"
                    placeholder="Enter personal number"
                />
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="departemen"
                    label="Departemen">
                    <SelectItem value="bcp">BCP</SelectItem>
                    <SelectItem value="igp">IGP</SelectItem>
                    <SelectItem value="psr">PSR</SelectItem>
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="tim"
                    label="Tim">
                    {teams[form.watch('departemen').toLowerCase()].map(team => (
                        <SelectItem key={team.value} value={team.value}>
                            {team.label}
                        </SelectItem>
                    ))}
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="role"
                    label="Role"
                    placeholder="Enter role"
                />
                <Button type="submit">
                    {isProcessing ? (
                        <PulseLoader
                            size={8}
                            color="#ffffff"
                            speedMultiplier={0.5}
                        />
                    ) : (
                        'Save changes'
                    )}
                </Button>
            </form>
        </Form>
    )
}
