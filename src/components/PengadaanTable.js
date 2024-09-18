'use client'

import { fetchPengadaanData } from '@/lib/actions'
import React, { useEffect, useMemo, useState } from 'react'
import { DataTable } from './DataTable'
import { rekapPengadaanColumns } from '@/mocks/Columns'

const PengadaanTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchPengadaanData()
            console.log(result.data)
            setData(result.data)
            setLoading(false)
        }

        fetchData()
    }, [])

    // Memoize the data for performance optimization
    const memoizedData = useMemo(() => data, [data])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1>Pengadaan Data</h1>
            <DataTable data={memoizedData} columns={rekapPengadaanColumns} />
        </div>
    )
}

export default PengadaanTable
