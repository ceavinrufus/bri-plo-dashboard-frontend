'use client'

import React, { useContext } from 'react'
import { AddDataSheet } from '../monitoring-dokumen/AddDataSheet'
import { monitoringDokumenSPKColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'

const GET_DOKUMENS = gql`
    query GetDokumens {
        dokumens {
            sla_spk_sejak_diambil
            pic {
                id
                name
            }
            id
            identitas_pengambil
            identitas_vendor
            info_vendor
            jangka_waktu
            nama_vendor
            spk {
                amount
                currency
                rate
            }
            nomor_spk
            penerima_dokumen
            perihal
            sla_spk_sejak_terbit
            tanggal
            tanggal_jatuh_tempo
            tanggal_pengambilan
            tanggal_pengembalian
            tanggal_penyerahan_dokumen
            tanggal_spk
            tim
        }
    }
`

const MonitoringDokumenSPKTable = () => {
    const { dokumenData, setDokumenData } = useContext(DokumenContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])

    if (!user) return null

    const { loading, error, data } = useQuery(GET_DOKUMENS, {
        variables: { departemen: user.departemen },
        client,
        onCompleted: data => setDokumenData(data.dokumens),
    })

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">Monitoring Dokumen SPK</h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet />
                </div>
            </div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <DataTable
                    data={dokumenData}
                    columns={monitoringDokumenSPKColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default MonitoringDokumenSPKTable
