'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updateDokumenData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { DokumenContext } from '../context/DokumenContext'
import { DokumenFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import DokumenForm from './DokumenForm'
import { transformDokumenDataForSubmit } from '@/lib/utils'

export function EditDokumenForm({ defaultValues }) {
    const { updateDokumen } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(DokumenFormValidation),
        defaultValues: {
            ...defaultValues,
            perihal: defaultValues.perihal || '',
            nomor_spk: defaultValues.nomor_spk || '',
            tanggal_spk: defaultValues.tanggal_spk || undefined,
            nama_vendor: defaultValues.nama_vendor || '',
            pic: defaultValues.pic || { id: '', name: '' },
            sla_spk_sejak_terbit: defaultValues.sla_spk_sejak_terbit || '',
            sla_spk_sejak_diambil: defaultValues.sla_spk_sejak_diambil || '',
            tanggal: defaultValues.tanggal || undefined,
            jangka_waktu: defaultValues.jangka_waktu || '',
            tim: defaultValues.tim || '',
            spk: defaultValues.spk || '',
            identitas_vendor: defaultValues.identitas_vendor || '',
            info_vendor: defaultValues.info_vendor || '',
            tanggal_pengambilan: defaultValues.tanggal_pengambilan || undefined,
            identitas_pengambil: defaultValues.identitas_pengambil || '',
            tanggal_pengembalian:
                defaultValues.tanggal_pengembalian || undefined,
            tanggal_jatuh_tempo: defaultValues.tanggal_jatuh_tempo || undefined,
            catatan: defaultValues.catatan || '',
            form_tkdn: defaultValues.form_tkdn || '',
            tanggal_penyerahan_dokumen:
                defaultValues.tanggal_penyerahan_dokumen || undefined,
            penerima_dokumen: defaultValues.penerima_dokumen || '',
        },
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformDokumenDataForSubmit(
            defaultValues,
            data,
        )

        try {
            const response = await updateDokumenData(
                defaultValues.id,
                transformedData,
            )

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updateDokumen(defaultValues.id, {
                ...transformedData,
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
                        'Save'
                    )}
                </Button>
            </DokumenForm>
        </Form>
    )
}
