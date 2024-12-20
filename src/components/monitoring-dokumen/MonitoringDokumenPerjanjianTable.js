'use client'

import React, { useContext } from 'react'
import { AddDataSheet } from './AddDataSheet'
import { monitoringDokumenPerjanjianColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'
import { DocumentType, DokumenContext } from '../context/DokumenContext'
import { useAuth } from '@/hooks/auth'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'

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

    if (!user) return null

    const { loading, error, data } = useQuery(GET_DOKUMEN_PERJANJIANS, {
        client,
        onCompleted: data => {
            // console.log(data.dokumen_perjanjians)
            setDokumenPerjanjianData(data.dokumen_perjanjians)
        },
        onError: error => console.error(error),
    })

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">Monitoring Dokumen Perjanjian</h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet type={DocumentType.PERJANJIAN} />
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
