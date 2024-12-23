'use client'

import React, { useContext, useState } from 'react'
import { AddDataSheet } from '../monitoring-dokumen/AddDataSheet'
import { monitoringDokumenJaminanColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DocumentType, DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import client from '@/lib/apolloClient'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GET_DOKUMEN_JAMINANS = gql`
    query GetDokumenJaminans {
        dokumen_spks {
            id
            nomor_spk
            tanggal_spk
            jenis_pekerjaan
            dokumen_jaminans {
                id
                penerbit
                dokumen_keabsahan
                nilai {
                    currency
                    amount
                    rate
                }
                nomor_jaminan
                tanggal_diterima
                type
                waktu_berakhir
                waktu_mulai
            }
            pic_legal {
                name
            }
        }
    }
`
const DokumenDataTable = ({ type }) => {
    const { dokumenJaminanData } = useContext(DokumenContext)
    const [filteredData, setFilteredData] = React.useState([])

    const columnVisibilityKeys = [
        'jaminan_uang_muka',
        'jaminan_pembayaran',
        'jaminan_pelaksanaan',
        'jaminan_pemeliharaan',
    ]

    const columnVisibility = columnVisibilityKeys.reduce((acc, key) => {
        acc[`tanggal_diterima_${key}`] = type === key
        acc[`penerbit_${key}`] = type === key
        acc[`nomor_jaminan_${key}`] = type === key
        acc[`dokumen_keabsahan_${key}`] = type === key
        acc[`nilai_${key}`] = type === key
        acc[`waktu_mulai_${key}`] = type === key
        acc[`waktu_berakhir_${key}`] = type === key
        return acc
    }, {})

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0 capitalize">
                    Monitoring Dokumen {type.replace(/_/g, ' ')}
                </h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet type={DocumentType.JAMINAN} />
                </div>
            </div>
            <DataTable
                data={dokumenJaminanData}
                // filters={[
                //     { kolom: 'tim_pemrakarsa', isUppercaseValue: true },
                // ]}
                searches={[
                    {
                        kolom: 'jenis_pekerjaan',
                        placeholder: 'Search jenis pekerjaan...',
                    },
                    {
                        kolom: 'nomor_spk',
                        placeholder: 'Search nomor SPK...',
                    },
                ]}
                defaultColumnVisibility={columnVisibility}
                columns={monitoringDokumenJaminanColumns}
                onDataFilter={setFilteredData}
            />
        </>
    )
}

const MonitoringDokumenJaminanTable = () => {
    const { setDokumenJaminanData } = useContext(DokumenContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [activeTab, setActiveTab] = useState('jaminan_uang_muka')
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const type = searchParams.get('type') || 'spk' // Default to 'jaminan_uang_muka' if no type is provided
        if (
            [
                'jaminan_uang_muka',
                'jaminan_pembayaran',
                'jaminan_pelaksanaan',
                'jaminan_pelaksanaan',
            ].includes(type)
        ) {
            setActiveTab(type)
        }
    }, [searchParams])

    if (!user) return null

    const { loading, error, data } = useQuery(GET_DOKUMEN_JAMINANS, {
        client,
        onCompleted: data => {
            const transformedData = data.dokumen_spks.map(spk => {
                const transformedDokumenJaminans = spk.dokumen_jaminans.reduce(
                    (acc, dokumenJaminan) => {
                        const { type, ...rest } = dokumenJaminan
                        const typeMapping = {
                            JUM: 'jaminan_uang_muka',
                            JBayar: 'jaminan_pembayaran',
                            Jampel: 'jaminan_pelaksanaan',
                            JPelihara: 'jaminan_pemeliharaan',
                        }
                        const mappedType = typeMapping[type] || type
                        acc[mappedType] = { type, ...rest }
                        return acc
                    },
                    {},
                )
                return {
                    ...spk,
                    dokumen_jaminans: transformedDokumenJaminans,
                }
            })
            setDokumenJaminanData(transformedData)
        },
        onError: error => console.error(error),
    })

    if (loading) return <div>Loading...</div>

    return (
        <div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <Tabs
                    orientation="vertical"
                    defaultValue="spk"
                    value={activeTab}
                    onValueChange={value => {
                        setActiveTab(value)
                        const params = new URLSearchParams(searchParams)
                        params.set('type', value)

                        router.push(`?${params.toString()}`)
                    }}
                    className="">
                    <div className="w-full overflow-x-auto pb-4">
                        <TabsList>
                            <TabsTrigger value="jaminan_uang_muka">
                                Jaminan Uang Muka
                            </TabsTrigger>
                            <TabsTrigger value="jaminan_pembayaran">
                                Jaminan Pembayaran
                            </TabsTrigger>
                            <TabsTrigger value="jaminan_pelaksanaan">
                                Jaminan Pelaksanaan
                            </TabsTrigger>
                            <TabsTrigger value="jaminan_pemeliharaan">
                                Jaminan Pemeliharaan
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="jaminan_uang_muka" className="">
                        <DokumenDataTable type={activeTab} />
                    </TabsContent>
                    <TabsContent value="jaminan_pembayaran" className="">
                        <DokumenDataTable type={activeTab} />
                    </TabsContent>
                    <TabsContent value="jaminan_pelaksanaan" className="">
                        <DokumenDataTable type={activeTab} />
                    </TabsContent>
                    <TabsContent value="jaminan_pemeliharaan" className="">
                        <DokumenDataTable type={activeTab} />
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}

export default MonitoringDokumenJaminanTable
