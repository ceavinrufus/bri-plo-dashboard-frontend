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

const ProsesPengadaanTableToolbar = ({ table }) => {
    const getUniqueValues = columnId => {
        const uniqueValues = new Set()

        table.getPreFilteredRowModel().rows.forEach(row => {
            const value = row.getValue(columnId)
            if (value) {
                uniqueValues.add(value)
            }
        })
        return Array.from(uniqueValues).map(value => ({
            value,
            label: value,
        }))
    }

    return (
        <div className="flex items-center py-4">
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

            {/* Filters */}
            <div className="flex mx-2 gap-2">
                <DataTableFacetedFilter
                    column={table.getColumn('tim')}
                    title="Tim"
                    options={getUniqueValues('tim')}
                />
                <DataTableFacetedFilter
                    column={table.getColumn('kode_user')}
                    title="Kode User"
                    options={getUniqueValues('kode_user')}
                />
                <DataTableFacetedFilter
                    column={table.getColumn('metode')}
                    title="Metode"
                    options={getUniqueValues('metode')}
                />
                <DataTableFacetedFilter
                    column={table.getColumn('proses_pengadaan')}
                    title="Proses Pengadaan"
                    options={getUniqueValues('proses_pengadaan')}
                />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
                                        ? 'Verified?'
                                        : column.id
                                              .split('_')
                                              .join(' ')
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

export default ProsesPengadaanTableToolbar
