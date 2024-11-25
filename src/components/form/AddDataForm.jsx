'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { postPengadaanData } from '@/lib/actions'
import { formatDateYMD, transformPengadaanDataForSubmit } from '@/lib/utils'
import { ProgressPengadaanFormValidation } from '@/lib/validation'
import { useContext, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { PengadaanContext } from '../context/PengadaanContext'
import { useAuth } from '@/hooks/auth'
import PengadaanForm from './PengadaanForm'

export function AddDataForm() {
    const { addPengadaan } = useContext(PengadaanContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })

    const defaultValues = {
        proyek: '',
        kode_user: '',
        nodin_users: null,
        nodin_user: '',
        tanggal_nodin_user: formatDateYMD(new Date()),
        tim: 'ptt',
        departemen: user.departemen,
        perihal: '',
        nomor_spk: '',
        tanggal_spk: '',
        tanggal_acuan: '',
        pelaksana_pekerjaan: '',
        metode: undefined,
        is_verification_complete: false,
        nodin_plos: null,
        nodin_plo: '',
        tanggal_nodin_plo: undefined,
        proses_pengadaan: '',
        catatan: '',
        pic: {
            id: user.id,
            name: user.name,
        },
    }

    const form = useForm({
        resolver: zodResolver(ProgressPengadaanFormValidation),
        defaultValues,
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformPengadaanDataForSubmit(
            defaultValues,
            data,
        )
        try {
            const response = await postPengadaanData(transformedData)

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            addPengadaan({
                id: response.data.id,
                ...transformedData,
                anggaran_investasi: JSON.parse(
                    transformedData.anggaran_investasi,
                ),
                anggaran_eksploitasi: JSON.parse(
                    transformedData.anggaran_eksploitasi,
                ),
                hps: JSON.parse(transformedData.hps),
                spk_investasi: JSON.parse(transformedData.spk_investasi),
                spk_eksploitasi: JSON.parse(transformedData.spk_eksploitasi),
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
            <PengadaanForm
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
            </PengadaanForm>
        </Form>
    )
}
