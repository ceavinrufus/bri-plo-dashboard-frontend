'use client'

import React, { useContext } from 'react'
import { AddDataSheet } from './AddDataSheet'
import { monitoringDokumenPerjanjianColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DocumentType, DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import * as XLSX from 'xlsx'

const GET_DOKUMEN_PERJANJIANS = gql`
    query GetDokumenPerjanjians {
        dokumen_perjanjians {
            id
            tanggal_permohonan_diterima
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
            nomor_kontrak
            tanggal_kontrak
            pic_legal {
                id
                name
            }
        }
    }
`

const MonitoringDokumenPerjanjianTable = () => {
    const { dokumenPerjanjianData, setDokumenPerjanjianData } =
        useContext(DokumenContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])
    const router = useRouter()

    if (!user) return null

    const { loading, error, data } = useQuery(GET_DOKUMEN_PERJANJIANS, {
        client,
        onCompleted: data => {
            // console.log(data.dokumen_perjanjians)
            setDokumenPerjanjianData(data.dokumen_perjanjians)
        },
        onError: error => console.error(error),
    })

    const handleExport = () => {
        const exportData = dokumenPerjanjianData.map(item => ({
            id: item.id,
            tanggal_permohonan_diterima: item.tanggal_permohonan_diterima,
            tim_pemrakarsa: item.tim_pemrakarsa,
            pic_pengadaan_id: item.pic_pengadaan?.id,
            pic_pengadaan_name: item.pic_pengadaan?.name,
            nomor_spk: item.nomor_spk,
            tanggal_spk: item.tanggal_spk,
            jenis_pekerjaan: item.jenis_pekerjaan,
            nilai_spk: item.spk?.amount,
            currency_spk: item.spk?.currency,
            rate_spk: item.spk?.rate,
            jangka_waktu: item.jangka_waktu,
            pelaksana_pekerjaan: item.pelaksana_pekerjaan,
            pic_pelaksana_pekerjaan: item.pic_pelaksana_pekerjaan,
            nomor_kontrak: item.nomor_kontrak,
            tanggal_kontrak: item.tanggal_kontrak,
            pic_legal_id: item.pic_legal?.id,
            pic_legal_name: item.pic_legal?.name,
        }))

        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Dokumen Perjanjian Data')
        XLSX.writeFile(wb, 'dokumen_perjanjian_data.xlsx')
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">Monitoring Dokumen Perjanjian</h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet type={DocumentType.PERJANJIAN} />
                    <Button
                        onClick={() =>
                            router.push(
                                '/monitoring-dokumen/bulk-import?tab=perjanjian',
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
                    data={dokumenPerjanjianData}
                    filters={[
                        { kolom: 'tim_pemrakarsa', isUppercaseValue: true },
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
                    columns={monitoringDokumenPerjanjianColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default MonitoringDokumenPerjanjianTable
