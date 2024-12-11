'use client'

import * as React from 'react'
import { fetchUserData } from '@/lib/actions'
import { useState, useEffect } from 'react'
import { DataTable } from '../DataTable'
import { userColumns } from '@/data/Columns'

const UserTable = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchUserData()
                setUserData(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        loadData()
    }, [])

    return (
        <div className="w-full">
            <DataTable
                data={userData}
                columns={userColumns}
                filters={[
                    { kolom: 'role', isUppercaseValue: false },
                    { kolom: 'departemen', isUppercaseValue: true },
                    { kolom: 'tim', isUppercaseValue: true },
                ]}
                searches={[
                    { kolom: 'name', placeholder: 'Search name...' },
                    { kolom: 'pn', placeholder: 'Search personal number...' },
                ]}
                defaultColumnVisibility={{
                    id: true,
                    name: true,
                    email: true,
                    departemen: true,
                    role: true,
                    created_at: false,
                    updated_at: false,
                }}
            />
        </div>
    )
}

export default UserTable
