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
    query GetPengadaans($departemen: String) {
        pengadaans(departemen: $departemen, limit: 100) {
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

const ProsesPengadaanTable = ({ departemen }) => {
    const { pengadaanData, setPengadaanData } = useContext(PengadaanContext)
    const { user } = useAuth({ middleware: 'auth' })
    const [filteredData, setFilteredData] = React.useState([])

    if (!user) return null

    const { loading, error } = useQuery(GET_PENGADAANS, {
        variables: departemen ? { departemen } : {},
        client,
        onCompleted: data => {
            console.log(data.pengadaans)
            setPengadaanData(data.pengadaans)
        },
    })

    const metrics = calculateMetrics(filteredData)
    const nodinDelimiter = ';'

    const handleExport = () => {
        const exportData = []
        pengadaanData.forEach(item => {
            let maxLength = Math.max(
                item.nodin_plos.length,
                item.nodin_users.length,
                item.nodin_ip_pengadaans.length,
            )
            maxLength = maxLength === 0 ? 1 : maxLength

            let nodinPloCombined = []
            let tanggalNodinPloCombined = []
            let nodinUserCombined = []
            let tanggalNodinUserCombined = []
            let nodinIpPengadaanCombined = []
            let tanggalNodinIpPengadaanCombined = []

            for (let i = 0; i < maxLength; i++) {
                const nodinPlo = item.nodin_plos[i] || {}
                const nodinUser = item.nodin_users[i] || {}
                const nodinIpPengadaan = item.nodin_ip_pengadaans[i] || {}

                if (nodinPlo.nodin) {
                    nodinPloCombined.push(nodinPlo.nodin)
                    tanggalNodinPloCombined.push(nodinPlo.tanggal_nodin)
                }

                if (nodinUser.nodin) {
                    nodinUserCombined.push(nodinUser.nodin)
                    tanggalNodinUserCombined.push(nodinUser.tanggal_nodin)
                }

                if (nodinIpPengadaan.nodin) {
                    nodinIpPengadaanCombined.push(nodinIpPengadaan.nodin)
                    tanggalNodinIpPengadaanCombined.push(
                        nodinIpPengadaan.tanggal_nodin,
                    )
                }
            }

            exportData.push({
                id: item.id,
                tim: item.tim,
                departemen: item.departemen,
                proyek: item.proyek,
                kode_user: item.kode_user,
                perihal: item.perihal,
                nodin_user: nodinUserCombined.join(nodinDelimiter) || '',
                tanggal_nodin_user:
                    tanggalNodinUserCombined.join(nodinDelimiter) || '',
                nodin_ip_pengadaan:
                    nodinIpPengadaanCombined.join(nodinDelimiter) || '',
                tanggal_nodin_ip_pengadaan:
                    tanggalNodinIpPengadaanCombined.join(nodinDelimiter) || '',
                metode: item.metode,
                tanggal_dokumen_lengkap: item.verification_completed_at || '',
                catatan: item.catatan,
                proses_pengadaan: item.proses_pengadaan,
                nodin_plo: nodinPloCombined.join(nodinDelimiter) || '',
                tanggal_nodin_plo:
                    tanggalNodinPloCombined.join(nodinDelimiter) || '',
                nomor_spk: item.nomor_spk,
                tanggal_spk: item.tanggal_spk,
                tanggal_spph: item.tanggal_acuan,
                pelaksana_pekerjaan: item.pelaksana_pekerjaan,
                currency_spk_investasi: `${item.spk_investasi.currency}`,
                nilai_spk_investasi: `${item.spk_investasi.amount}`,
                rate_spk_investasi: `${item.spk_investasi.rate}`,
                currency_spk_eksploitasi: `${item.spk_eksploitasi.currency}`,
                nilai_spk_eksploitasi: `${item.spk_eksploitasi.amount}`,
                rate_spk_eksploitasi: `${item.spk_eksploitasi.rate}`,
                currency_anggaran_investasi: `${item.anggaran_investasi.currency}`,
                nilai_anggaran_investasi: `${item.anggaran_investasi?.amount}`,
                rate_anggaran_investasi: `${item.anggaran_investasi?.rate}`,
                currency_anggaran_eksploitasi: `${item.anggaran_eksploitasi.currency}`,
                nilai_anggaran_eksploitasi: `${item.anggaran_eksploitasi?.amount}`,
                rate_anggaran_eksploitasi: `${item.anggaran_eksploitasi?.rate}`,
                currency_hps: `${item.hps.currency}`,
                nilai_hps: `${item.hps?.amount}`,
                rate_hps: `${item.hps?.rate}`,
                tkdn_percentage: item.tkdn_percentage,
                pic_name: item.pic.name,
            })
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
                    {departemen
                        ? `Pengadaan Data for ${departemen.toUpperCase()}`
                        : 'All pengadaan data'}
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
                            filters={[
                                { kolom: 'proyek', isUppercaseValue: false },
                                { kolom: 'tim', isUppercaseValue: true },
                                { kolom: 'kode_user', isUppercaseValue: false },
                                { kolom: 'metode', isUppercaseValue: false },
                                {
                                    kolom: 'proses_pengadaan',
                                    isUppercaseValue: false,
                                },
                            ]}
                            columns={prosesPengadaanColumns}
                            defaultColumnVisibility={{
                                nodin_users: false,
                                nodin_plos: false,
                                departemen: false,
                                nodin_ip_pengadaan: false,
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
                            filters={[
                                { kolom: 'proyek', isUppercaseValue: false },
                                { kolom: 'tim', isUppercaseValue: true },
                                { kolom: 'kode_user', isUppercaseValue: false },
                                { kolom: 'metode', isUppercaseValue: false },
                                {
                                    kolom: 'proses_pengadaan',
                                    isUppercaseValue: false,
                                },
                            ]}
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
                                nodin_ip_pengadaan: false,
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
