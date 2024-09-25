'use client'

import React, { useMemo, useState } from 'react'
import { DataTable } from './DataTable'
import { prosesPengadaanColumns } from '@/data/Columns'
import { AddDataSheet } from './AddDataSheet'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            tim
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

    const { loading, data } = useQuery(GET_PENGADAANS, {
        variables: { departemen },
        client,
    })

    // Memoize the data for performance optimization
    const memoizedData = useMemo(() => data, [data])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex">
                <h1>Pengadaan Data for {departemen.toUpperCase()}</h1>
                <AddDataSheet />
            </div>
            <DataTable
                data={memoizedData.pengadaans}
                columns={prosesPengadaanColumns}
            />
        </div>
    )
}

export default ProsesPengadaanTable
