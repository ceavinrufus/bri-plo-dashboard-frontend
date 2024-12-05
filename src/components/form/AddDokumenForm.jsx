'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { postDokumenData } from '@/lib/actions'
import { formatDateYMD, transformDokumenDataForSubmit } from '@/lib/utils'
import { DokumenFormValidation } from '@/lib/validation'
import { useContext, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { DokumenContext } from '../context/DokumenContext'
// import { useAuth } from '@/hooks/auth'
import DokumenForm from './DokumenForm'

export function AddDokumenForm() {
    const { addDokumen } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)
    // const { user } = useAuth({ middleware: 'auth' })

    const defaultValues = {
        perihal: '',
        nomor_spk: '',
        tanggal_spk: undefined,
        nama_vendor: '',
        pic_id: '',
        sla_spk_sejak_terbit: '',
        sla_spk_sejak_diambil: '',
        tanggal: undefined,
        jangka_waktu: '',
        tim: '',
        spk: '',
        identitas_vendor: '',
        info_vendor: '',
        tanggal_pengambilan: undefined,
        identitas_pengambil: '',
        tanggal_pengembalian: undefined,
        tanggal_jatuh_tempo: undefined,
        catatan: '',
        form_tkdn: '',
        tanggal_penyerahan_dokumen: undefined,
        penerima_dokumen: '',
    }

    const form = useForm({
        resolver: zodResolver(DokumenFormValidation),
        defaultValues,
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformDokumenDataForSubmit(
            defaultValues,
            data,
        )
        try {
            const response = await postDokumenData(transformedData)

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            addDokumen({
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
            <DokumenForm
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
            </DokumenForm>
        </Form>
    )
}
