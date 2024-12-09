'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updateDokumenData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { DokumenContext } from '../context/DokumenContext'
import { DokumenSPKFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import DokumenForm from './DokumenForm'
import { transformDokumenDataForSubmit } from '@/lib/utils'

export function EditDokumenForm({ defaultValues }) {
    const { updateDokumen } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(DokumenSPKFormValidation),
        defaultValues: {
            ...defaultValues,
            jenis_pekerjaan: defaultValues.jenis_pekerjaan || '',
            nomor_spk: defaultValues.nomor_spk || '',
            tanggal_spk: defaultValues.tanggal_spk || undefined,
            pelaksana_pekerjaan: defaultValues.nama_vendor || '',
            pic_legal: defaultValues.pic_legal || { id: '', name: '' },
            tanggal_spk_diterima:
                defaultValues.tanggal_spk_diterima || undefined,
            jangka_waktu: defaultValues.jangka_waktu || '',
            tim_pemrakarsa: defaultValues.tim_pemrakarsa || '',
            nilai_spk: defaultValues.spk?.amount,
            spk_currency: defaultValues.spk?.currency,
            spk_rate: defaultValues.spk?.rate,
            identitas_vendor: defaultValues.identitas_vendor || '',
            tanggal_info_ke_vendor:
                defaultValues.tanggal_info_ke_vendor || undefined,
            tanggal_pengambilan: defaultValues.tanggal_pengambilan || undefined,
            dokumen_pelengkap: defaultValues.dokumen_pelengkap || [],
            dokumen_yang_dikembalikan:
                defaultValues.dokumen_yang_dikembalikan || [],
            identitas_pengambil: defaultValues.identitas_pengambil || '',
            tanggal_pengembalian:
                defaultValues.tanggal_pengembalian || undefined,
            catatan: defaultValues.catatan || '',
            tkdn_percentage: defaultValues.tkdn_percentage || '',
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
