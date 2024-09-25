'use client'

import React, { useMemo } from 'react'
import { DataTable } from './DataTable'
import { prosesPengadaanColumns } from '@/mocks/Columns'
import { AddDataSheet } from './AddDataSheet'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'

const GET_PENGADAANS = gql`
    query GetPengadaans {
        pengadaans {
            id
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
    const { loading, data } = useQuery(GET_PENGADAANS, { client })

    // Memoize the data for performance optimization
    const memoizedData = useMemo(() => data, [data])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex">
                <h1>Pengadaan Data</h1>
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
