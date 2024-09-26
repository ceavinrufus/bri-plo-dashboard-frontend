'use client'

import React, { useMemo, useState, useContext } from 'react'
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
            proses_pengadaan
        }
    }
`

const ProsesPengadaanTable = () => {
    const [departemen, setDepartemen] = useState('igp')
    const { pengadaanData, setPengadaanData } = useContext(PengadaanContext)

    const { loading } = useQuery(GET_PENGADAANS, {
        variables: { departemen },
        client,
        onCompleted: data => {
            setPengadaanData(data.pengadaans)
        },
    })

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex">
                <h1>Pengadaan Data for {departemen.toUpperCase()}</h1>
                <AddDataSheet />
            </div>
            <DataTable data={pengadaanData} columns={prosesPengadaanColumns} />
        </div>
    )
}

export default ProsesPengadaanTable
