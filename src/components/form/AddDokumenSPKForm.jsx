'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { postDokumenSPKData } from '@/lib/actions'
import { formatDateYMD, transformDokumenSpkDataForSubmit } from '@/lib/utils'
import { DokumenSPKFormValidation } from '@/lib/validation'
import { useContext, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import DokumenSPKForm from './DokumenSPKForm'

export function AddDokumenSPKForm() {
    const { addDokumenSPK } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })

    const defaultValues = {
        tanggal_spk_diterima: new Date().toISOString().split('T')[0],
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
        tanggal_info_ke_vendor: '',
        tanggal_pengambilan: undefined,
        identitas_pengambil: '',
        tanggal_pengembalian: undefined,
        catatan: '',
        form_tkdn: '',
        tanggal_penyerahan_dokumen: undefined,
        penerima_dokumen: '',
    }

    const form = useForm({
        resolver: zodResolver(DokumenSPKFormValidation),
        defaultValues,
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformDokumenSpkDataForSubmit(
            defaultValues,
            data,
        )
        try {
            const response = await postDokumenSPKData(transformedData)

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            addDokumenSPK({
                id: response.data.id,
                ...transformedData,
                spk: JSON.parse(transformedData.spk),
                dokumen_jaminans: [],
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
            <DokumenSPKForm
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
                        'Submit'
                    )}
                </Button>
            </DokumenSPKForm>
        </Form>
    )
}
