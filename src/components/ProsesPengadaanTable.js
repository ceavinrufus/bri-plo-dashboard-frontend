'use client'

import * as React from 'react'
import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as XLSX from 'xlsx'
import { Button } from './ui/button'
import { DataTable } from './DataTable'
import { prosesPengadaanColumns } from '@/data/Columns'
import { AddDataSheet } from './AddDataSheet'
import { ProjectsSheet } from './ProjectsSheet'
import { ProsesPengadaanStats } from './ProsesPengadaanStats'
import { PengadaanContext } from '@/components/context/PengadaanContext'
import { useAuth } from '@/hooks/auth'
import client from '@/lib/apolloClient'

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            tim
            departemen
            proyek
            kode_user
            perihal
            nodin_users {
                id
                nodin
                tanggal_nodin
            }
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
            tanggal_acuan
            pelaksana_pekerjaan
            nilai_spk
            anggaran {
                amount
                tanggal_permohonan
                tanggal_terima
            }
            hps {
                amount
                tanggal_permohonan
                tanggal_terima
            }
            tkdn_percentage
            catatan
            pic {
                id
                name
            }
        }
    }
`

const calculateMetrics = data => {
    const totalHPS = data.reduce(
        (sum, item) => sum + (item.hps?.amount || 0),
        0,
    )
    const totalSPK = data.reduce((sum, item) => sum + (item.nilai_spk || 0), 0)
    const totalAnggaran = data.reduce(
        (sum, item) => sum + (item.anggaran?.amount || 0),
        0,
    )
    const totalTKDN = data.reduce(
        (sum, item) => sum + (item.tkdn_percentage || 0),
        0,
    )
    const countTKDN = data.filter(item => item.tkdn_percentage !== null).length
    const totalCompletedWorks = data.filter(
        item => item.nilai_spk !== null,
    ).length

    return {
        costEfficiencyHPS: totalHPS
            ? ((totalHPS - totalSPK) / totalHPS) * 100
            : 0,
        costEfficiencyAnggaran: totalAnggaran
            ? ((totalAnggaran - totalSPK) / totalAnggaran) * 100
            : 0,
        tkdn: countTKDN ? totalTKDN / countTKDN : 0,
        totalCompletedWorks,
        totalWorks: data.length,
    }
}

const ProsesPengadaanTable = () => {
    const { pengadaanData, setPengadaanData } = useContext(PengadaanContext)
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) return null

    const { loading, error, data } = useQuery(GET_PENGADAANS, {
        variables: { departemen: user.departemen },
        client,
        onCompleted: data => setPengadaanData(data.pengadaans),
    })

    const metrics = data ? calculateMetrics(data.pengadaans) : null

    const handleExport = () => {
        const exportData = []
        pengadaanData.forEach(item => {
            let maxLength = Math.max(
                item.nodin_plos.length,
                item.nodin_users.length,
            )
            maxLength = maxLength === 0 ? 1 : maxLength

            for (let i = 0; i < maxLength; i++) {
                const nodinPlo = item.nodin_plos[i] || {}
                const nodinUser = item.nodin_users[i] || {}

                exportData.push({
                    id: i === 0 ? item.id : '',
                    tim: i === 0 ? item.tim : '',
                    departemen: i === 0 ? item.departemen : '',
                    kode_user: i === 0 ? item.kode_user : '',
                    proyek: i === 0 ? item.proyek : '',
                    perihal: i === 0 ? item.perihal : '',
                    nodin_user: nodinUser.nodin || '',
                    tanggal_nodin_user: nodinUser.tanggal_nodin || '',
                    metode: i === 0 ? item.metode : '',
                    is_verification_complete:
                        i === 0
                            ? item.is_verification_complete
                                ? 'YES'
                                : 'NO'
                            : '',
                    proses_pengadaan: i === 0 ? item.proses_pengadaan : '',
                    nomor_spk: i === 0 ? item.nomor_spk : '',
                    tanggal_spk: i === 0 ? item.tanggal_spk : '',
                    tanggal_acuan: i === 0 ? item.tanggal_acuan : '',
                    pelaksana_pekerjaan:
                        i === 0 ? item.pelaksana_pekerjaan : '',
                    nilai_spk: i === 0 ? item.nilai_spk : '',
                    anggaran: i === 0 ? item.anggaran?.amount : '',
                    hps: i === 0 ? item.hps?.amount : '',
                    tanggal_permohonan_anggaran:
                        i === 0 ? item.anggaran?.tanggal_permohonan : '',
                    tanggal_permohonan_hps:
                        i === 0 ? item.hps?.tanggal_permohonan : '',
                    tanggal_terima_anggaran:
                        i === 0 ? item.anggaran?.tanggal_terima : '',
                    tanggal_terima_hps: i === 0 ? item.hps?.tanggal_terima : '',
                    tkdn_percentage: i === 0 ? item.tkdn_percentage : '',
                    catatan: i === 0 ? item.catatan : '',
                    pic_name: i === 0 ? item.pic.name : '',
                    nodin_plo: nodinPlo.nodin || '',
                    tanggal_nodin_plo: nodinPlo.tanggal_nodin || '',
                })
            }
        })

        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Pengadaan Data')
        XLSX.writeFile(wb, 'pengadaan_data.xlsx')
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className="flex">
                <h1>Pengadaan Data for {user.departemen.toUpperCase()}</h1>
                <div className="space-x-2 ml-auto">
                    <ProsesPengadaanStats metrics={metrics} />
                    {user.departemen === 'bcp' && <ProjectsSheet />}
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
                    data={pengadaanData}
                    columns={prosesPengadaanColumns}
                    defaultColumnVisibility={{
                        nodin_users: false,
                        nodin_plos: false,
                        departemen: false,
                        tanggal_acuan: false,
                        proyek: user.departemen === 'bcp',
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
