'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { updateDokumenJaminanData, updateDokumenSPKData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { DokumenContext } from '../context/DokumenContext'
import { DokumenJaminanFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import DokumenJaminanForm from './DokumenJaminanForm'
import { transformDokumenJaminanDataForSubmit } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

export function EditDokumenJaminanForm({ defaultValues }) {
    const { updateDokumenJaminan } = useContext(DokumenContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const searchParams = useSearchParams()

    const typeMapping = {
        jaminan_uang_muka: 'JUM',
        jaminan_pembayaran: 'JBayar',
        jaminan_pelaksanaan: 'Jampel',
        jaminan_pemeliharaan: 'JPelihara',
    }

    const type = searchParams.get('type') || 'jaminan_uang_muka'
    const defaultJaminanValues = defaultValues.dokumen_jaminans[type]

    const form = useForm({
        resolver: zodResolver(DokumenJaminanFormValidation),
        defaultValues: {
            ...defaultValues,
            type: typeMapping[type],
            tanggal_diterima:
                defaultJaminanValues?.tanggal_diterima || undefined,
            penerbit: defaultJaminanValues?.penerbit,
            nomor_jaminan: defaultJaminanValues?.nomor_jaminan,
            dokumen_keabsahan: defaultJaminanValues?.dokumen_keabsahan,
            nilai_amount: defaultJaminanValues?.nilai?.amount,
            nilai_currency: defaultJaminanValues?.nilai?.currency,
            nilai_rate: defaultJaminanValues?.nilai?.rate,
            waktu_mulai: defaultJaminanValues?.waktu_mulai || undefined,
            waktu_berakhir: defaultJaminanValues?.waktu_berakhir || undefined,
        },
    })

    async function onSubmit(data) {
        setIsProcessing(true)

        const transformedData = transformDokumenJaminanDataForSubmit(
            defaultValues,
            data,
        )

        try {
            const defaultDokumenJaminans = defaultValues.dokumen_jaminans

            Object.keys(defaultDokumenJaminans).forEach(key => {
                defaultDokumenJaminans[key].nilai = defaultDokumenJaminans[key]
                    .nilai.amount
                    ? JSON.stringify({
                          amount: defaultDokumenJaminans[key].nilai.amount,
                          currency: defaultDokumenJaminans[key].nilai.currency,
                          rate: defaultDokumenJaminans[key].nilai.rate,
                      })
                    : null
            })

            const updatedDokumenJaminans = {
                dokumen_jaminans: {
                    ...defaultDokumenJaminans,
                    [type]: {
                        id: defaultJaminanValues?.id,
                        ...transformedData,
                    },
                },
            }

            const response = await updateDokumenSPKData(defaultValues.id, {
                ...defaultValues,
                ...updatedDokumenJaminans,
            })

            const transformedDataFinal = (() => {
                const spk = response.data
                const transformedDokumenJaminans = spk.dokumen_jaminans.reduce(
                    (acc, dokumenJaminan) => {
                        const { type, nilai, ...rest } = dokumenJaminan
                        const typeMapping = {
                            JUM: 'jaminan_uang_muka',
                            JBayar: 'jaminan_pembayaran',
                            Jampel: 'jaminan_pelaksanaan',
                            JPelihara: 'jaminan_pemeliharaan',
                        }
                        const mappedType = typeMapping[type] || type
                        acc[mappedType] = {
                            type,
                            nilai: JSON.parse(nilai),
                            ...rest,
                        }
                        return acc
                    },
                    {},
                )
                return {
                    ...spk,
                    dokumen_jaminans: transformedDokumenJaminans,
                }
            })()

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updateDokumenJaminan(defaultValues.id, transformedDataFinal)
        } catch (error) {
            console.error(error)
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
            <DokumenJaminanForm form={form} onSubmit={onSubmit}>
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
            </DokumenJaminanForm>
        </Form>
    )
}
