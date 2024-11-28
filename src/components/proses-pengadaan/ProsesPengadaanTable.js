'use client'

import * as React from 'react'
import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as XLSX from 'xlsx'
import { Button } from '../ui/button'
import { DataTable } from '../DataTable'
import { prosesPengadaanColumns } from '@/data/Columns'
import { ProjectsSheet } from './ProjectsSheet'
import { ProsesPengadaanStats } from './ProsesPengadaanStats'
import { PengadaanContext } from '@/components/context/PengadaanContext'
import { useAuth } from '@/hooks/auth'
import client from '@/lib/apolloClient'
import { calculateMetrics } from '@/lib/utils'
import { AddDataSheet } from './AddDataSheet'

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
            nodin_ip_pengadaans {
                id
                nodin
                tanggal_nodin
            }
            metode
            verification_completed_at
            proses_pengadaan
            pengadaan_log {
                stage
                tanggal
                document
            }
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
            spk_investasi {
                amount
                currency
                rate
            }
            spk_eksploitasi {
                amount
                currency
                rate
            }
            anggaran_investasi {
                amount
                currency
                rate
            }
            anggaran_eksploitasi {
                amount
                currency
                rate
            }
            hps {
                amount
                currency
                rate
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

const ProsesPengadaanTable = () => {
    const { pengadaanData, setPengadaanData } = useContext(PengadaanContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])

    if (!user) return null

    const { loading, error, data } = useQuery(GET_PENGADAANS, {
        variables: { departemen: user.departemen },
        client,
        onCompleted: data => setPengadaanData(data.pengadaans),
    })

    const metrics = calculateMetrics(filteredData)

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
                    verification_completed_at:
                        i === 0
                            ? item.verification_completed_at
                                ? 'YES'
                                : 'NO'
                            : '',
                    proses_pengadaan: i === 0 ? item.proses_pengadaan : '',
                    nomor_spk: i === 0 ? item.nomor_spk : '',
                    tanggal_spk: i === 0 ? item.tanggal_spk : '',
                    tanggal_acuan: i === 0 ? item.tanggal_acuan : '',
                    pelaksana_pekerjaan:
                        i === 0 ? item.pelaksana_pekerjaan : '',
                    nilai_spk_investasi:
                        i === 0 ? item.spk_investasi.amount : '',
                    nilai_spk_eksploitasi:
                        i === 0 ? item.spk_eksploitasi.amount : '',
                    anggaran_investasi:
                        i === 0 ? item.anggaran_investasi?.amount : '',
                    anggaran_eksploitasi:
                        i === 0 ? item.anggaran_eksploitasi?.amount : '',
                    hps: i === 0 ? item.hps?.amount : '',
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
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">
                    Pengadaan Data for {user.departemen.toUpperCase()}
                </h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    {/* Stats */}
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
                <>
                    <div className="hidden lg:block">
                        <DataTable
                            data={pengadaanData}
                            columns={prosesPengadaanColumns}
                            defaultColumnVisibility={{
                                nodin_users: false,
                                nodin_plos: false,
                                departemen: false,
                                nodin_ip_pengaaaan: false,
                                tanggal_nodin_ip_pengadaan: false,
                                tanggal_acuan: false,
                                tanggal_spph: false,
                                proyek: user.departemen === 'bcp',
                                tanggal_nodin_plo: false,
                                nodin_plo: false,
                                tkdn_percentage: false,
                                pdn_percentage: false,
                            }}
                            onDataFilter={setFilteredData}
                        />
                    </div>
                    <div className="lg:hidden">
                        <DataTable
                            data={pengadaanData}
                            columns={prosesPengadaanColumns}
                            defaultColumnVisibility={{
                                nodin_users: false,
                                nodin_plos: false,
                                departemen: false,
                                tanggal_acuan: false,
                                tanggal_spph: false,
                                tim: false,
                                kode_user: false,
                                proyek: user.departemen === 'bcp',
                                nodin_user: false,
                                tanggal_nodin_user: false,
                                nodin_ip_pengaaaan: false,
                                tanggal_nodin_ip_pengadaan: false,
                                sla_usulan_user: false,
                                sla_proses_pengadaan: false,
                                is_verification_complete: false,
                                tanggal_spk: false,
                                pelaksana_pekerjaan: false,
                                tanggal_nodin_plo: false,
                                nodin_plo: false,
                                tkdn_percentage: false,
                                pdn_percentage: false,
                            }}
                            onDataFilter={setFilteredData}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default ProsesPengadaanTable
