'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updateRekapPembayaranData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { RekapPembayaranFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import RekapPembayaranForm from './RekapPembayaranForm'
import { transformRekapPembayaranSubmit } from '@/lib/utils'
import { PembayaranContext } from '../context/PembayaranContext'

export function EditRekapPembayaranForm({ defaultValues }) {
    const { updatePembayaran, userOptions } = useContext(PembayaranContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(RekapPembayaranFormValidation),
        defaultValues: {
            ...defaultValues,
            tanggal_terima: defaultValues.tanggal_terima || undefined,
            nomor_spk: defaultValues.nomor_spk || '',
            tanggal_spk: defaultValues.tanggal_spk || undefined,
            nomor_perjanjian: defaultValues.nomor_perjanjian || '',
            tanggal_perjanjian: defaultValues.tanggal_perjanjian || undefined,
            perihal: defaultValues.perihal || '',
            nilai_spk: defaultValues.nilai_spk || '',
            spk_currency: defaultValues.spk_currency || '',
            spk_rate: defaultValues.spk_rate || '',
            vendor: defaultValues.vendor || '',
            tkdn: defaultValues.tkdn || '',
            nomor_invoice: defaultValues.nomor_invoice || '',
            nilai_invoice: defaultValues.nilai_invoice || '',
            invoice_currency: defaultValues.invoice_currency || '',
            invoice_rate: defaultValues.invoice_rate || '',
            nomor_rekening: defaultValues.nomor_rekening || '',
            nota_fiat: defaultValues.nota_fiat || '',
            tanggal_fiat: defaultValues.tanggal_fiat || undefined,
            sla: defaultValues.sla || undefined,
            hari_pengerjaan: defaultValues.hari_pengerjaan,
            status_pembayaran: defaultValues.status_pembayaran || '',
            tanggal_pembayaran: defaultValues.tanggal_pembayaran || undefined,
            keterangan: defaultValues.keterangan || '',
        },
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformRekapPembayaranSubmit(defaultValues, {
            ...data,
            pic_pay: {
                id: Number(data.pic_pay_id),
                name: userOptions.find(
                    option => Number(option.value) === Number(data.pic_pay_id),
                )?.label,
            },
        })

        try {
            const response = await updateRekapPembayaranData(
                defaultValues.id,
                transformedData,
            )

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updatePembayaran(defaultValues.id, {
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
            <RekapPembayaranForm
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
            </RekapPembayaranForm>
        </Form>
    )
}
