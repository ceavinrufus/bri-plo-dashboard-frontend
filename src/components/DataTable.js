'use client'

import * as React from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import ProsesPengadaanTableToolbar from './ProsesPengadaanTableToolbar'

export function DataTable({ data, columns, defaultColumnVisibility }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState(
        defaultColumnVisibility,
    )
    const [rowSelection, setRowSelection] = React.useState({})
    const [selectedColumnId, setSelectedColumnId] = React.useState('')

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <ProsesPengadaanTableToolbar table={table} />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, idx) => {
                                    return (
                                        <TableHead
                                            className={cn(
                                                header.id ===
                                                    selectedColumnId &&
                                                    '[&>*:first-child]:bg-gray-100',
                                            )}
                                            onClick={() => {
                                                if (idx !== 0)
                                                    setSelectedColumnId(
                                                        header.id,
                                                    )
                                            }}
                                            key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-alert-state={
                                        data.find(
                                            item =>
                                                item.nodin_user ===
                                                row.original.nodin_user,
                                        )?.verification_alert_at &&
                                        new Date(
                                            data.find(
                                                item =>
                                                    item.nodin_user ===
                                                    row.original.nodin_user,
                                            ).verification_alert_at,
                                        ) <= new Date()
                                            ? 'red'
                                            : data.find(
                                                    item =>
                                                        item.nodin_user ===
                                                        row.original.nodin_user,
                                                )?.nodin_alert_at &&
                                                new Date(
                                                    data.find(
                                                        item =>
                                                            item.nodin_user ===
                                                            row.original
                                                                .nodin_user,
                                                    ).nodin_alert_at,
                                                ) <= new Date()
                                              ? 'yellow'
                                              : ''
                                    }
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
