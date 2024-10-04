'use client'

import React, { useState, useContext } from 'react'
import { DataTable } from './DataTable'
import { prosesPengadaanColumns } from '@/data/Columns'
import { AddDataSheet } from './AddDataSheet'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'
import { PengadaanContext } from '@/components/context/PengadaanContext' // Adjust the import path as necessary

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            tim
            departemen
            kode_user
            perihal
            nodin_user
            tanggal_nodin_user
            tanggal_spk
            metode
            is_verification_complete
            proses_pengadaan
            verification_alert_at
            nodin_alert_at
            nodin_plos {
                id
                nodin
                tanggal_nodin
            }
            nilai_spk
            anggaran
            hps
            tkdn_percentage
            catatan
        }
    }
`

const ProsesPengadaanTable = () => {
    const [departemen] = useState('igp')
    const { pengadaanData, setPengadaanData } = useContext(PengadaanContext)

    const { loading, error } = useQuery(GET_PENGADAANS, {
        variables: { departemen },
        client,
        onCompleted: data => {
            const pengadaanData = data.pengadaans

            setPengadaanData(pengadaanData)
        },
    })

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex">
                <h1>Pengadaan Data for {departemen.toUpperCase()}</h1>
                <AddDataSheet />
            </div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <DataTable
                    data={pengadaanData}
                    columns={prosesPengadaanColumns}
                    defaultColumnVisibility={{ nodin_plos: false }}
                />
            )}
        </div>
    )
}

export default ProsesPengadaanTable
