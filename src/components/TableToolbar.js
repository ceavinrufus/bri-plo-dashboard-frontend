import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DataTableFacetedFilter } from './ui/data-table-faceted-filter'

const TableToolbar = ({ filters, table }) => {
    const getUniqueValues = filter => {
        const uniqueValues = new Set()

        table.getPreFilteredRowModel().rows.forEach(row => {
            const value = row.getValue(filter.kolom)
            if (value) {
                uniqueValues.add(value)
            }
        })
        return Array.from(uniqueValues).map(value => ({
            value,
            label: filter.isUppercaseValue ? value.toUpperCase() : value,
        }))
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 py-4">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search pengadaan..."
                    value={table.getColumn('perihal')?.getFilterValue() ?? ''}
                    onChange={event =>
                        table
                            .getColumn('perihal')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Search nomor SPK..."
                    value={table.getColumn('nomor_spk')?.getFilterValue() ?? ''}
                    onChange={event =>
                        table
                            .getColumn('nomor_spk')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>

            {/* Filters */}
            {filters && (
                <div className="flex flex-wrap lg:mx-2 gap-2">
                    {filters.map(filter => (
                        <DataTableFacetedFilter
                            key={filter.kolim}
                            column={table.getColumn(filter.kolom)}
                            title={filter.kolom.split('_').join(' ')}
                            options={getUniqueValues(filter)}
                        />
                    ))}
                </div>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="h-96 overflow-auto" align="end">
                    {table
                        .getAllColumns()
                        .filter(column => column.getCanHide())
                        .map(column => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onClick={e => {
                                        column.toggleVisibility(
                                            !column.getIsVisible(),
                                        )
                                        e.preventDefault()
                                    }}
                                    // onCheckedChange={value =>
                                    //     column.toggleVisibility(!!value)
                                    // }
                                >
                                    {column.id === 'is_verification_complete'
                                        ? 'Dokumen Lengkap?'
                                        : column.id ===
                                            'verification_completed_at'
                                          ? 'Tanggal Dokumen Lengkap'
                                          : column.id
                                                .split('_')
                                                .join(' ')
                                                .replace(/\bip\b/g, 'IP')
                                                .replace(/\bspph\b/g, 'SPPH')
                                                .replace(/\bspk\b/g, 'SPK')
                                                .replace(/\bsla\b/g, 'SLA')
                                                .replace(/\bplo\b/g, 'PLO')
                                                .replace(/\bhps\b/g, 'HPS')
                                                .replace(/\bpic\b/g, 'PIC')
                                                .replace(/\btkdn\b/g, 'TKDN')
                                                .replace(/\bpdn\b/g, 'PDN')}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TableToolbar
