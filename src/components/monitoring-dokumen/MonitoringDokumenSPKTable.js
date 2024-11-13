'use client'

import React from 'react'
import { AddDataSheet } from '../proses-pengadaan/AddDataSheet'
import { monitoringDokumenSPKColumns } from '@/data/Columns'
import { DataTable } from '../DataTable'

// Mock data
const mockData = [
    {
        perihal:
            'Pengadaan CCTV untuk Ruang Audit Standard & Quality Deveolpment Division Gedung BRI 2 Lantai 25',
        nomor_spk: '4200003551-PLO/IGP/PTT/01/2024',
        tanggal_spk: '2023-11-01',
        nama_vendor: 'Koperasi Swakarya BRI',
        pic: { name: 'Ceavin Rufus' },
        sla_spk_sejak_terbit: 'CLEAR',
        sla_spk_sejak_diambil: 'CLEAR',
        tanggal: '2023-11-02',
        jangka_waktu: '30 hari',
        tim: 'IT Procurement Team',
        nilai_spk: 'Rp 49.700.000',
        identitas_vendor: 'Hari (087772367861)',
        info_vendor: '',
        tanggal_pengambilan: '2023-11-05',
        identitas_pengambil: 'Aditia Santara (081283205120)',
        tanggal_pengembalian: '2023-11-10',
        tanggal_jatuh_tempo: '2023-12-01',
        catatan: '',
        form_tkdn: 'DONE',
    },
]

const MonitoringDokumenSPKTable = () => {
    const [filteredData, setFilteredData] = React.useState([])

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h1 className="mb-4 md:mb-0">Monitoring Dokumen SPK</h1>
                <div className="flex gap-2 ml-auto flex-wrap">
                    <AddDataSheet />
                </div>
            </div>
            {false ? (
                <p>Error:</p>
            ) : (
                <DataTable
                    data={mockData}
                    columns={monitoringDokumenSPKColumns}
                    onDataFilter={setFilteredData}
                />
            )}
        </div>
    )
}

export default MonitoringDokumenSPKTable
