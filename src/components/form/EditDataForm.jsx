'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updatePengadaanData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { PengadaanContext } from '../context/PengadaanContext'
import { ProgressPengadaanFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import PengadaanForm from './PengadaanForm'
import { transformPengadaanDataForSubmit } from '@/lib/utils'

export function EditDataForm({ defaultValues }) {
    const { updatePengadaan } = useContext(PengadaanContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(ProgressPengadaanFormValidation),
        defaultValues: {
            ...defaultValues,
            metode: defaultValues.metode || undefined,
            // nodin_plo:
            //     defaultValues.nodin_plos && defaultValues.nodin_plos.length > 0
            //         ? defaultValues.nodin_plos[
            //               defaultValues.nodin_plos.length - 1
            //           ].nodin
            //         : '',
            // tanggal_nodin_plo:
            //     defaultValues.nodin_plos && defaultValues.nodin_plos.length > 0
            //         ? formatDateYMD(
            //               defaultValues.nodin_plos[
            //                   defaultValues.nodin_plos.length - 1
            //               ].tanggal_nodin,
            //           )
            //         : '',
            nodin_user: '',
            tanggal_nodin_user: '',
            nodin_ip_pengadaan: '',
            tanggal_nodin_ip_pengadaan: '',
            nodin_plo: '',
            tanggal_nodin_plo: '',
            anggaran_investasi: defaultValues.anggaran_investasi?.amount,
            anggaran_eksploitasi: defaultValues.anggaran_eksploitasi?.amount,
            anggaran_currency: defaultValues.anggaran_investasi?.currency,
            anggaran_rate: defaultValues.anggaran_investasi?.rate,
            hps: defaultValues.hps?.amount,
            hps_currency: defaultValues.hps?.currency,
            hps_rate: defaultValues.hps?.rate,
            nilai_spk_investasi: defaultValues.spk_investasi?.amount,
            nilai_spk_eksploitasi: defaultValues.spk_eksploitasi?.amount,
            spk_currency: defaultValues.spk_investasi?.currency,
            spk_rate: defaultValues.spk_investasi?.rate,
            catatan: defaultValues.catatan || '',
            nomor_spk: defaultValues.nomor_spk || '',
            proses_pengadaan: defaultValues.proses_pengadaan || '',
            pelaksana_pekerjaan: defaultValues.pelaksana_pekerjaan || '',
            is_verification_complete: defaultValues.verification_completed_at
                ? true
                : false,
        },
    })

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformPengadaanDataForSubmit(
            defaultValues,
            data,
        )

        try {
            console.log(transformedData)
            const response = await updatePengadaanData(
                defaultValues.id,
                transformedData,
            )
            console.log(response.data)
            transformedData.nodin_plos = response.data.nodin_plos
            transformedData.nodin_users = response.data.nodin_users
            transformedData.nodin_ip_pengadaans = response.data.nodin_ip_pengadaans

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updatePengadaan(defaultValues.id, {
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
                    'An error occurred while editing data.',
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
                        'Save'
                    )}
                </Button>
            </PengadaanForm>
        </Form>
    )
}
