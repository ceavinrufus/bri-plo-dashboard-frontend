'use client'

import React, { useContext } from 'react'
import { DataTable } from './DataTable'
import { prosesPengadaanColumns } from '@/data/Columns'
import { AddDataSheet } from './AddDataSheet'
import { gql, useQuery } from '@apollo/client'
import client from '@/lib/apolloClient'
import { PengadaanContext } from '@/components/context/PengadaanContext'
import { useAuth } from '@/hooks/auth'
import * as XLSX from 'xlsx'
import { Button } from './ui/button'
import { ProjectSheet } from './ProjectSheet'

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            tim
            departemen
            proyek
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

    const handleExport = () => {
        const exportData = []

        pengadaanData.forEach(item => {
            // Jika ada beberapa nodin_plos, buat baris baru untuk setiap nodin_plos
            if (item.nodin_plos.length > 1) {
                item.nodin_plos.forEach(nodin => {
                    if (nodin.id === item.nodin_plos[0].id) {
                        exportData.push({
                            id: item.id,
                            tim: item.tim,
                            departemen: item.departemen,
                            kode_user: item.kode_user,
                            proyek: item.proyek,
                            perihal: item.perihal,
                            nodin_user: item.nodin_user,
                            tanggal_nodin_user: item.tanggal_nodin_user,
                            metode: item.metode,
                            is_verification_complete:
                                item.is_verification_complete ? 'YES' : 'NO',
                            proses_pengadaan: item.proses_pengadaan,
                            nomor_spk: item.nomor_spk,
                            tanggal_spk: item.tanggal_spk,
                            pelaksana_pekerjaan: item.pelaksana_pekerjaan,
                            nilai_spk: item.nilai_spk,
                            anggaran: item.anggaran?.amount,
                            hps: item.hps?.amount,
                            tanggal_permohonan_anggaran:
                                item.anggaran?.tanggal_permohonan,
                            tanggal_permohonan_hps:
                                item.hps?.tanggal_permohonan,
                            tanggal_terima_anggaran:
                                item.anggaran?.tanggal_terima,
                            tanggal_terima_hps: item.hps?.tanggal_terima,
                            tkdn_percentage: item.tkdn_percentage,
                            catatan: item.catatan,
                            pic_name: item.pic.name,
                            nodin_plo: nodin.nodin,
                            tanggal_nodin_plo: nodin.tanggal_nodin,
                        })
                    } else {
                        exportData.push({
                            id: '',
                            tim: '',
                            departemen: '',
                            kode_user: '',
                            proyek: '',
                            perihal: '',
                            nodin_user: '',
                            tanggal_nodin_user: '',
                            metode: '',
                            is_verification_complete: '',
                            proses_pengadaan: '',
                            nomor_spk: '',
                            tanggal_spk: '',
                            pelaksana_pekerjaan: '',
                            nilai_spk: '',
                            anggaran: '',
                            hps: '',
                            tanggal_permohonan_anggaran: '',
                            tanggal_permohonan_hps: '',
                            tanggal_terima_anggaran: '',
                            tanggal_terima_hps: '',
                            tkdn_percentage: '',
                            catatan: '',
                            pic_name: '',
                            nodin_plo: nodin.nodin,
                            tanggal_nodin_plo: nodin.tanggal_nodin,
                        })
                    }
                })
            } else {
                // Jika tidak ada nodin_plos, tambahkan item asli tanpa nodin_plos
                exportData.push({
                    id: item.id,
                    tim: item.tim,
                    departemen: item.departemen,
                    kode_user: item.kode_user,
                    proyek: item.proyek,
                    perihal: item.perihal,
                    nodin_user: item.nodin_user,
                    tanggal_nodin_user: item.tanggal_nodin_user,
                    metode: item.metode,
                    is_verification_complete: item.is_verification_complete
                        ? 'YES'
                        : 'NO',
                    proses_pengadaan: item.proses_pengadaan,
                    nomor_spk: item.nomor_spk,
                    tanggal_spk: item.tanggal_spk,
                    pelaksana_pekerjaan: item.pelaksana_pekerjaan,
                    nilai_spk: item.nilai_spk,
                    anggaran: item.anggaran?.amount,
                    hps: item.hps?.amount,
                    tanggal_permohonan_anggaran:
                        item.anggaran?.tanggal_permohonan,
                    tanggal_permohonan_hps: item.hps?.tanggal_permohonan,
                    tanggal_terima_anggaran: item.anggaran?.tanggal_terima,
                    tanggal_terima_hps: item.hps?.tanggal_terima,
                    tkdn_percentage: item.tkdn_percentage,
                    catatan: item.catatan,
                    pic_name: item.pic.name,
                    nodin_plo: item.nodin_plos[0]?.nodin || '',
                    tanggal_nodin_plo: item.nodin_plos[0]?.tanggal_nodin || '',
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
                    {user.departemen === 'bcp' && <ProjectSheet />}
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
                        nodin_plos: false,
                        departemen: false,
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
