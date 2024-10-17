'use client'

import React, { useState, useContext } from 'react'
import { DataTable } from './DataTable'
import { prosesPengadaanColumns } from '@/data/Columns'
import { AddDataSheet } from './AddDataSheet'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'
import { PengadaanContext } from '@/components/context/PengadaanContext' // Adjust the import path as necessary
import { useAuth } from '@/hooks/auth'

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
            nomor_spk
            tanggal_spk
            nomor_spk
            pelaksana_pekerjaan
            nilai_spk
            anggaran
            hps
            tkdn_percentage
            catatan
            pic {
                name
            }
        }
    }
`

const ProsesPengadaanTable = () => {
    const { pengadaanData, setPengadaanData } = useContext(PengadaanContext)
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) return null

    const { loading, error } = useQuery(GET_PENGADAANS, {
        variables: { departemen: user.departemen },
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
                <h1>Pengadaan Data for {user.departemen.toUpperCase()}</h1>
                <AddDataSheet />
            </div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <DataTable
                    data={pengadaanData}
                    columns={prosesPengadaanColumns}
                    defaultColumnVisibility={{
                        nodin_plos: false,
                        tanggal_nodin_plo: false,
                        nodin_plo: false,
                        tkdn_percentage: false,
                        pdn_percentage: false,
                        hps: false,
                        anggaran: false,
                        nilai_spk: false,
                    }}
                />
            )}
        </div>
    )
}

export default ProsesPengadaanTable
