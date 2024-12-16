import RekapPembayaranTable from '@/components/rekap-pembayaran/RekapPembayaranTable'
import React from 'react'

const RekapPembayaran = () => {
    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <RekapPembayaranTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RekapPembayaran
