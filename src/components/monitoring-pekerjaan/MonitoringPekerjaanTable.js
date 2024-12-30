'use client'

import React, { useContext } from 'react'
import { monitoringPekerjaanColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DocumentType, DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'
import { calculateJatuhTempoMetrics, formatDateMY } from '@/lib/utils'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import * as XLSX from 'xlsx'
import { AddDataSheet } from './AddDataSheet'
import { HariLiburContext } from '../context/HariLiburContext'
import { MonitoringPekerjaanStats } from './MonitoringPekerjaanStats'

const GET_PEKERJAANS = gql`
    query GetPekerjaans($department: String) {
        dokumen_spks(department: $department) {
            id
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
            jatuh_tempos {
                id
                keterangan
                tanggal_mulai
                tanggal_akhir
            }
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
            catatan
            is_pekerjaan_selesai
        }
    }
`

const MonitoringPekerjaanTable = ({ department }) => {
    const { calculateWorkingDays } = useContext(HariLiburContext)
    const { dokumenSPKData, setDokumenSPKData } = useContext(DokumenContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])
    const router = useRouter()

    if (!user) return null

    const { loading, error, data } = useQuery(GET_PEKERJAANS, {
        client,
        variables: { department }, // Pass department argument here
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

            setDokumenSPKData(transformedData)
        },
        onError: error => console.error(error),
    })
    const metrics = calculateJatuhTempoMetrics(
        filteredData,
        calculateWorkingDays,
    )

    const handleExport = () => {
        const exportData = dokumenSPKData.map(item => ({
            id: item.id,
            tim_pemrakarsa: item.tim_pemrakarsa,
            pic_pengadaan_id: item.pic_pengadaan?.id,
            pic_pengadaan_name: item.pic_pengadaan?.name,
            nomor_spk: item.nomor_spk,
            tanggal_spk: item.tanggal_spk,
            jenis_pekerjaan: item.jenis_pekerjaan,
            nilai_spk: item.spk?.amount,
            currency_spk: item.spk?.currency,
            rate_spk: item.spk?.rate,
            pelaksana_pekerjaan: JSON.parse(item.pelaksana_pekerjaan).name,
            no_telp_pelaksana_pekerjaan: JSON.parse(item.pelaksana_pekerjaan)
                .phone_number,
            pic_pelaksana_pekerjaan: item.pic_pelaksana_pekerjaan,
            // Jaminan Uang Muka
            tanggal_diterima_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.tanggal_diterima,
            penerbit_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.penerbit,
            nomor_jaminan_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.nomor_jaminan,
            nilai_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.nilai?.amount,
            currency_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.nilai?.currency,
            rate_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.nilai?.rate,
            waktu_mulai_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.waktu_mulai,
            waktu_berakhir_jaminan_uang_muka:
                item.dokumen_jaminans.jaminan_uang_muka?.waktu_berakhir,
            // Jaminan Pembayaran
            tanggal_diterima_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.tanggal_diterima,
            penerbit_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.penerbit,
            nomor_jaminan_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.nomor_jaminan,
            nilai_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.nilai?.amount,
            currency_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.nilai?.currency,
            rate_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.nilai?.rate,
            waktu_mulai_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.waktu_mulai,
            waktu_berakhir_jaminan_pembayaran:
                item.dokumen_jaminans.jaminan_pembayaran?.waktu_berakhir,
            // Jaminan Pelaksanaan
            tanggal_diterima_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.tanggal_diterima,
            penerbit_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.penerbit,
            nomor_jaminan_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.nomor_jaminan,
            dokumen_keabsahan_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.dokumen_keabsahan,
            nilai_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.nilai?.amount,
            currency_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.nilai?.currency,
            rate_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.nilai?.rate,
            waktu_mulai_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.waktu_mulai,
            waktu_berakhir_jaminan_pelaksanaan:
                item.dokumen_jaminans.jaminan_pelaksanaan?.waktu_berakhir,
            // Jaminan Pemeliharaan
            tanggal_diterima_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.tanggal_diterima,
            penerbit_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.penerbit,
            nomor_jaminan_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.nomor_jaminan,
            dokumen_keabsahan_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.dokumen_keabsahan,
            nilai_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.nilai?.amount,
            currency_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.nilai?.currency,
            rate_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.nilai?.rate,
            waktu_mulai_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.waktu_mulai,
            waktu_berakhir_jaminan_pemeliharaan:
                item.dokumen_jaminans.jaminan_pemeliharaan?.waktu_berakhir,
            catatan: item.catatan,
        }))

        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Pekerjaan Data')
        XLSX.writeFile(wb, 'pekerjaan_data.xlsx')
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">
                    Monitoring Pekerjaan {department.toUpperCase()}
                </h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    {/* Stats */}
                    <MonitoringPekerjaanStats metrics={metrics} />

                    <AddDataSheet />
                    <Button
                        onClick={() =>
                            router.push(
                                '/monitoring-dokumen/bulk-import?tab=spk',
                            )
                        }
                        variant="default">
                        Bulk Import
                    </Button>
                    <Button
                        onClick={handleExport}
                        variant=""
                        className="default bg-green-700 hover:bg-green-600">
                        Export as Excel
                    </Button>
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
                        jatuh_tempos: false,
                        tanggal_penyerahan_dokumen: false,
                        jatuh_tempo_jaminan_uang_muka: false,
                        jatuh_tempo_jaminan_pembayaran: false,
                        jatuh_tempo_jaminan_pelaksanaan: false,
                        jatuh_tempo_jaminan_pemeliharaan: false,
                        is_pekerjaan_selesai: false,
                    }}
                    columns={monitoringPekerjaanColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default MonitoringPekerjaanTable
