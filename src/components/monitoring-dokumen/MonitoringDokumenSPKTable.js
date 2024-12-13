'use client'

import React, { useContext } from 'react'
import { AddDataSheet } from '../monitoring-dokumen/AddDataSheet'
import { monitoringDokumenSPKColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DocumentType, DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'

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
            setDokumenSPKData(data.dokumen_spks)
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
                    columns={monitoringDokumenSPKColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default MonitoringDokumenSPKTable
