'use client'

import * as React from 'react'
import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as XLSX from 'xlsx'
import { Button } from '../ui/button'
import { DataTable } from '../DataTable'
import { rekapPembayaranColumns } from '@/data/Columns'
import { PembayaranContext } from '@/components/context/PembayaranContext'
import { useAuth } from '@/hooks/auth'
import client from '@/lib/apolloClient'
import { AddDataSheet } from './AddDataSheet'

const GET_REKAP_PEMBAYARANS = gql`
    query GetRekapPembayarans {
        rekap_pembayarans(limit: 100) {
            id
            pic_pc {
                id
                name
            }
            tanggal_terima
            nomor_spk
            tanggal_spk
            nomor_perjanjian
            tanggal_perjanjian
            perihal
            spk {
                amount
                currency
                rate
            }
            pelaksana_pekerjaan
            tkdn
            nomor_invoice
            invoice {
                amount
                currency
                rate
            }
            nomor_rekening
            pic_pay {
                id
                name
            }
            nota_fiat
            tanggal_fiat
            sla
            hari_pengerjaan
            status_pembayaran
            tanggal_pembayaran
            keterangan
        }
    }
`

const RekapPembayaranTable = () => {
    const { pembayaranData, setPembayaranData } = useContext(PembayaranContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])

    if (!user) return null

    const { loading, error } = useQuery(GET_REKAP_PEMBAYARANS, {
        client,
        onCompleted: data => {
            setPembayaranData(data.rekap_pembayarans)
        },
        onError: error => console.error(error),
    })

    const handleExport = () => {
        const exportData = pembayaranData.map(item => ({
            id: item.id,
            pic_pc: item.pic_pc,
            tanggal_terima: item.tanggal_terima,
            nomor_spk: item.nomor_spk,
            tanggal_spk: item.tanggal_spk,
            nomor_perjanjian: item.nomor_perjanjian,
            tanggal_perjanjian: item.tanggal_perjanjian,
            perihal: item.perihal,
            nilai_spk: item.nilai_spk,
            pelaksana_pekerjaan: item.pelaksana_pekerjaan,
            tkdn: item.tkdn,
            nomor_invoice: item.nomor_invoice,
            nominal_invoice: item.nominal_invoice,
            invoice_currency: item.invoice_currency,
            invoice_rate: item.invoice_rate,
            nomor_rekening: item.nomor_rekening,
            pic_pay: item.pic_pay,
            nota_fiat: item.nota_fiat,
            tanggal_fiat: item.tanggal_fiat,
            sla: item.sla,
            hari_pengerjaan: item.hari_pengerjaan,
            status_pembayaran: item.status_pembayaran,
            tanggal_pembayaran: item.tanggal_pembayaran,
            keterangan: item.keterangan,
        }))

        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Pembayaran Data')
        XLSX.writeFile(wb, 'pembayaran_data.xlsx')
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">All pembayaran data</h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet />
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
                    data={pembayaranData}
                    filters={[
                        {
                            kolom: 'status_pembayaran',
                            isUppercaseValue: false,
                        },
                    ]}
                    searches={[
                        {
                            kolom: 'perihal',
                            placeholder: 'Search perihal...',
                        },
                        {
                            kolom: 'nomor_invoice',
                            placeholder: 'Search nomor invoice...',
                        },
                        {
                            kolom: 'nomor_spk',
                            placeholder: 'Search nomor SPK...',
                        },
                    ]}
                    columns={rekapPembayaranColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default RekapPembayaranTable
