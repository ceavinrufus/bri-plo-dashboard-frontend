'use client'

import React, { useContext } from 'react'
import { AddDataSheet } from '../monitoring-dokumen/AddDataSheet'
import { monitoringDokumenSPKColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DocumentType, DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'
import { formatDateMY } from '@/lib/utils'

const GET_DOKUMEN_SPKS = gql`
    query GetDokumenSPKs {
        dokumen_spks {
            id
            tanggal_spk_diterima
            tim_pemrakarsa
            pic_pengadaan {
                id
                name
            }
            nomor_spk
            tanggal_spk
            jenis_pekerjaan
            spk {
                amount
                currency
                rate
            }
            jangka_waktu
            pelaksana_pekerjaan
            pic_pelaksana_pekerjaan
            dokumen_pelengkap
            tanggal_info_ke_vendor
            tanggal_pengambilan
            identitas_pengambil
            tanggal_pengembalian
            dokumen_yang_dikembalikan
            tkdn_percentage
            tanggal_penyerahan_dokumen
            penerima_dokumen
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
            catatan
        }
    }
`

const MonitoringDokumenSPKTable = () => {
    const { dokumenSPKData, setDokumenSPKData } = useContext(DokumenContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])

    if (!user) return null

    const { loading, error, data } = useQuery(GET_DOKUMEN_SPKS, {
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
                        acc[mappedType] = rest
                        return acc
                    },
                    {},
                )
                return {
                    ...spk,
                    dokumen_jaminans: transformedDokumenJaminans,
                    jatuh_tempo_jaminan_uang_muka: formatDateMY(
                        transformedDokumenJaminans.jaminan_uang_muka
                            ?.waktu_berakhir,
                    ),
                    jatuh_tempo_jaminan_pembayaran: formatDateMY(
                        transformedDokumenJaminans.jaminan_pembayaran
                            ?.waktu_berakhir,
                    ),
                    jatuh_tempo_jaminan_pelaksanaan: formatDateMY(
                        transformedDokumenJaminans.jaminan_pelaksanaan
                            ?.waktu_berakhir,
                    ),
                    jatuh_tempo_jaminan_pemeliharaan: formatDateMY(
                        transformedDokumenJaminans.jaminan_pemeliharaan
                            ?.waktu_berakhir,
                    ),
                }
            })

            console.log('transformedData', transformedData)
            setDokumenSPKData(transformedData)
        },
        onError: error => console.error(error),
    })

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">Monitoring Dokumen SPK</h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet type={DocumentType.SPK} />
                </div>
            </div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <DataTable
                    data={dokumenSPKData}
                    filters={[
                        { kolom: 'tim_pemrakarsa', isUppercaseValue: true },
                        { kolom: 'jatuh_tempo_jaminan_uang_muka' },
                        { kolom: 'jatuh_tempo_jaminan_pembayaran' },
                        { kolom: 'jatuh_tempo_jaminan_pelaksanaan' },
                        { kolom: 'jatuh_tempo_jaminan_pemeliharaan' },
                    ]}
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
                    defaultColumnVisibility={{
                        tanggal_penyerahan_dokumen: false,
                    }}
                    columns={monitoringDokumenSPKColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default MonitoringDokumenSPKTable
