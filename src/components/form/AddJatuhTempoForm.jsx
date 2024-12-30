'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { postJatuhTempoData, updateProjectData } from '@/lib/actions'
import { SelectItem } from '../ui/select'
import { useContext } from 'react'
import { JatuhTempoFormValidation } from '@/lib/validation'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ProjectContext } from '../context/ProjectContext'
import { JatuhTempoCollapsible } from '../monitoring-pekerjaan/JatuhTempoCollapsible'

// DefaultValues = data dokumen SPK
export function AddJatuhTempoForm({ defaultValues }) {
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(JatuhTempoFormValidation),
    })
    console.log(defaultValues)

    const onSubmit = async newData => {
        setIsProcessing(true)
        try {
            const response = await postJatuhTempoData({
                ...newData,
                dokumen_spk_id: defaultValues.id,
            })

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            window.location.reload()

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
        <div className="">
            <JatuhTempoCollapsible defaultValues={defaultValues} />
            <Form {...form}>
                <h3 className="text-sm font-semibold mt-6 mb-4">
                    Tambah Tahapan Jatuh Tempo
                </h3>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
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
                            'Save changes'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
