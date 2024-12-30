'use client'

import RekapPembayaranTable from '@/components/rekap-pembayaran/RekapPembayaranTable'
import { useAuth } from '@/hooks/auth'
import { canSeeRekapPembayaran } from '@/utils/roleChecker'
import React from 'react'

const RekapPembayaran = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {canSeeRekapPembayaran(user) ? (
                            <RekapPembayaranTable />
                        ) : (
                            'You have no access to see this page'
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RekapPembayaran
