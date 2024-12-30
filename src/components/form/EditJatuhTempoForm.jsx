'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { updateJatuhTempoData, updateProjectData } from '@/lib/actions'
import { SelectItem } from '../ui/select'
import { useContext } from 'react'
import { Jatuh, JatuhTempoFormValidation } from '@/lib/validation'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ProjectContext } from '../context/ProjectContext'

export function EditJatuhTempoForm({ defaultValues }) {
    // const { updateProject } = useContext(ProjectContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(JatuhTempoFormValidation),
        defaultValues,
    })

    const onSubmit = async newData => {
        setIsProcessing(true)
        try {
            const response = await updateJatuhTempoData(defaultValues.id, {
                ...newData,
                dokumen_spk_id: defaultValues.dokumen_spk_id,
            })

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            // updateProject(defaultValues.kode, response.data)
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
                    name="keterangan"
                    label="Keterangan"
                    placeholder="Keterangan"
                />
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="tanggal_mulai"
                    label="Tanggal Mulai"
                />
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="tanggal_akhir"
                    label="Tanggal Akhir"
                />

                <Button type="submit">
                    {isProcessing ? (
                        <PulseLoader
                            size={8}
                            color="#ffffff"
                            speedMultiplier={0.5}
                        />
                    ) : (
                        'Submit'
                    )}
                </Button>
            </form>
        </Form>
    )
}
