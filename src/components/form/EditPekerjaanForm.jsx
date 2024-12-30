'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updateDokumenSPKData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { DokumenContext } from '../context/DokumenContext'
import { PekerjaanFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import PekerjaanForm from './PekerjaanForm'
import { transformDokumenSpkDataForSubmit } from '@/lib/utils'
import { useAuth } from '@/hooks/auth'

export function EditPekerjaanForm({ defaultValues }) {
    const { updateDokumenSPK } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })

    const form = useForm({
        resolver: zodResolver(PekerjaanFormValidation),
        defaultValues: {
            ...defaultValues,
            jenis_pekerjaan: defaultValues.jenis_pekerjaan || '',
            nomor_spk: defaultValues.nomor_spk || '',
            tanggal_spk: defaultValues.tanggal_spk || undefined,
            pelaksana_pekerjaan: defaultValues.nama_vendor || '',
            pic_legal: defaultValues.pic_legal || {
                id: user.id,
                name: user.name,
            },
            tim_pemrakarsa: defaultValues.tim_pemrakarsa || '',
            nilai_spk: defaultValues.spk?.amount,
            spk_currency: defaultValues.spk?.currency,
            spk_rate: defaultValues.spk?.rate,
            pic_pelaksana_pekerjaan:
                defaultValues.pic_pelaksana_pekerjaan || '',
            catatan: defaultValues.catatan || '',
        },
    })

    async function onSubmit(data) {
        setIsProcessing(true)

        const transformedData = transformDokumenSpkDataForSubmit(
            defaultValues,
            {
                ...data,
                pic_legal:
                    user.tim === 'leg' && user.role !== 'admin'
                        ? {
                              id: user.id,
                              name: user.name,
                          }
                        : null,
            },
        )

        try {
            const response = await updateDokumenSPKData(
                defaultValues.id,
                transformedData,
            )

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updateDokumenSPK(defaultValues.id, {
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
            <PekerjaanForm
                form={form}
                onSubmit={onSubmit}
                defaultValues={defaultValues}>
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
            </PekerjaanForm>
        </Form>
    )
}
