'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updateDokumenPerjanjianData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { DokumenContext } from '../context/DokumenContext'
import { DokumenPerjanjianFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import DokumenPerjanjianForm from './DokumenPerjanjianForm'
import { transformDokumenPerjanjianDataForSubmit } from '@/lib/utils'

export function EditDokumenPerjanjianForm({ defaultValues }) {
    const { updateDokumenPerjanjian } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(DokumenPerjanjianFormValidation),
        defaultValues: {
            ...defaultValues,
            jenis_pekerjaan: defaultValues.jenis_pekerjaan || '',
            nomor_spk: defaultValues.nomor_spk || '',
            pelaksana_pekerjaan: defaultValues.nama_vendor || '',
            pic_legal: defaultValues.pic_legal || { id: '', name: '' },
            jangka_waktu: defaultValues.jangka_waktu || '',
            tim_pemrakarsa: defaultValues.tim_pemrakarsa || '',
            nilai_spk: defaultValues.spk?.amount,
            spk_currency: defaultValues.spk?.currency,
            spk_rate: defaultValues.spk?.rate,
            pic_pelaksana_pekerjaan:
                defaultValues.pic_pelaksana_pekerjaan || '',
            nomor_kontrak: defaultValues.nomor_kontrak || '',
        },
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformDokumenPerjanjianDataForSubmit(
            defaultValues,
            data,
        )

        try {
            const response = await updateDokumenPerjanjianData(
                defaultValues.id,
                transformedData,
            )

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updateDokumenPerjanjian(defaultValues.id, {
                ...transformedData,
                spk: JSON.parse(transformedData.spk),
            })
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while editing data.',
                status: 'error',
            })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Form {...form}>
            <DokumenPerjanjianForm form={form} onSubmit={onSubmit}>
                <Button type="submit">
                    {isProcessing ? (
                        <PulseLoader
                            size={8}
                            color="#ffffff"
                            speedMultiplier={0.5}
                        />
                    ) : (
                        'Save'
                    )}
                </Button>
            </DokumenPerjanjianForm>
        </Form>
    )
}
