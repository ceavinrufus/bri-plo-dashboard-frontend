'use client'

import * as React from 'react'
import { DataTable } from '../DataTable'
import { userColumns } from '@/data/Columns'
import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'

const UserTable = () => {
    const { usersData } = useContext(UsersContext)

    return (
        <div className="w-full">
            <DataTable
                data={usersData}
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
