'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { postRekapPembayaranData } from '@/lib/actions'
import { formatDateYMD, transformRekapPembayaranSubmit } from '@/lib/utils'
import { RekapPembayaranFormValidation } from '@/lib/validation'
import { useContext, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { useAuth } from '@/hooks/auth'
import RekapPembayaranForm from './RekapPembayaranForm'
import { PembayaranContext } from '../context/PembayaranContext'

export function AddRekapPembayaranForm() {
    const { addPembayaran, userOptions } = useContext(PembayaranContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })
    const defaultValues = {
        pic_pc: {
            id: user.id,
            name: user.name,
        },
        tanggal_terima: undefined,
        nomor_spk: '',
        tanggal_spk: undefined,
        nomor_perjanjian: '',
        tanggal_perjanjian: undefined,
        perihal: '',
        nilai_spk: '',
        spk_currency: '',
        spk_rate: '',
        vendor: '',
        tkdn: '',
        nomor_invoice: '',
        nilai_invoice: '',
        invoice_currency: '',
        invoice_rate: '',
        nomor_rekening: '',
        nota_fiat: '',
        tanggal_fiat: undefined,
        sla: undefined,
        hari_pengerjaan: undefined,
        status_pembayaran: '',
        tanggal_pembayaran: undefined,
        keterangan: '',
    }

    const form = useForm({
        resolver: zodResolver(RekapPembayaranFormValidation),
        defaultValues,
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
            const response = await postRekapPembayaranData(transformedData)
            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            addPembayaran({
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
                        'Submit'
                    )}
                </Button>
            </RekapPembayaranForm>
        </Form>
    )
}
