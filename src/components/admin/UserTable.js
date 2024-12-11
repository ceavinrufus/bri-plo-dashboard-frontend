'use client'

import * as React from 'react'
import { fetchUserData } from '@/lib/actions'
import { useState, useEffect } from 'react'
import { DataTable } from '../DataTable'

const UserTable = () => {
    const [userData, setUserData] = useState([])
    const [filteredData, setFilteredData] = useState([])

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

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => row.getValue('name'),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => row.getValue('email'),
        },
        {
            accessorKey: 'pn',
            header: 'Phone Number',
            cell: ({ row }) => row.getValue('pn'),
        },
        {
            accessorKey: 'departemen',
            header: 'Departemen',
            cell: ({ row }) => (
                <div className="uppercase">{row.getValue('departemen')}</div>
            ),
        },
        {
            accessorKey: 'tim',
            header: 'Tim',
            cell: ({ row }) => (
                <div className="uppercase">{row.getValue('tim')}</div>
            ),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('role')}</div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: ({ row }) =>
                new Date(row.getValue('created_at')).toLocaleString(),
        },
        {
            accessorKey: 'updated_at',
            header: 'Updated At',
            cell: ({ row }) =>
                new Date(row.getValue('updated_at')).toLocaleString(),
        },
    ]
    return (
        <div className="w-full">
            <DataTable
                data={userData}
                columns={columns}
                filters={[
                    { kolom: 'role', isUppercaseValue: false },
                    { kolom: 'departemen', isUppercaseValue: true },
                    { kolom: 'tim', isUppercaseValue: true },
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
                onDataFilter={setFilteredData}
            />
        </div>
    )
}

export default UserTable
