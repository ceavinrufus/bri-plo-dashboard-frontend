'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { postDokumenPerjanjianData } from '@/lib/actions'
import { transformDokumenDataForSubmit } from '@/lib/utils'
import { DokumenPerjanjianFormValidation } from '@/lib/validation'
import { useContext, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import DokumenPerjanjianForm from './DokumenPerjanjianForm'

export function AddDokumenPerjanjianForm() {
    const { addDokumenPerjanjian } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })

    const defaultValues = {
        tanggal_spk_diterima: undefined,
        tim_pemrakarsa: '',
        nomor_spk: '',
        tanggal_spk: undefined,
        jenis_pekerjaan: '',
        pelaksana_pekerjaan: '',
        pic_legal: {
            id: user.id,
            name: user.name,
        },
        jangka_waktu: '',
        pic_pelaksana_pekerjaan: '',
        nomor_kontrak: '',
        tanggal_kontrak: undefined,
    }

    const form = useForm({
        resolver: zodResolver(DokumenPerjanjianFormValidation),
        defaultValues,
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformDokumenDataForSubmit(
            defaultValues,
            data,
        )
        try {
            const response = await postDokumenPerjanjianData(transformedData)

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            addDokumenPerjanjian({
                id: response.data.id,
                ...transformedData,
            })
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
            <DokumenPerjanjianForm form={form} onSubmit={onSubmit}>
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
            </DokumenPerjanjianForm>
        </Form>
    )
}
