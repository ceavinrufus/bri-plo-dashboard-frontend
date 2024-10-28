'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { updateProjectData } from '@/lib/actions'
import { SelectItem } from '../ui/select'
import { useContext } from 'react'
import { ProjectFormValidation } from '@/lib/validation'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ProjectContext } from '../context/ProjectContext'

export function EditProjectForm({ defaultValues }) {
    const { updateProject } = useContext(ProjectContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(ProjectFormValidation),
        defaultValues,
    })

    const onSubmit = async newData => {
        setIsProcessing(true)
        try {
            const response = await updateProjectData(
                defaultValues.kode,
                newData,
            )

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            updateProject(defaultValues.kode, response.data)
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while submitting data.',
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
                    name="kode"
                    label="Kode Proyek"
                    placeholder="Kode Proyek"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="nama"
                    label="Nama Proyek"
                    placeholder="Nama Proyek"
                />
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="jenis"
                    label="Jenis Proyek">
                    <SelectItem value="kantor_pusat">Kantor Pusat</SelectItem>
                    <SelectItem value="kantor_cabang">Kantor Cabang</SelectItem>
                </CustomFormField>

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
