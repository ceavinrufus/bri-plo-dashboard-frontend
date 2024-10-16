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

const ProsesPengadaanTableToolbar = ({ table }) => {
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
