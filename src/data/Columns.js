import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { calculateDaysDifference } from '@/utils'
import { EditDataSheet } from '@/components/EditDataSheet'
import { InformationTooltip } from '@/components/InformationTooltip'

export const prosesPengadaanColumns = [
    {
        accessorKey: 'nodin_plos',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    // Select
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={value =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // Kode User
    {
        accessorKey: 'tim',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Tim
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="uppercase text-center">{row.getValue('tim')}</div>
        ),
    },
    // Kode User
    {
        accessorKey: 'kode_user',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Kode User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="uppercase text-center">
                {row.getValue('kode_user')}
            </div>
        ),
    },
    // Perihal
    {
        accessorKey: 'perihal',
        header: ({ column }) => {
            return (
                <div className="w-72 md:w-96">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }>
                        Perihal
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('perihal')}</div>,
    },
    // Nodin
    {
        accessorKey: 'nodin_user',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nodin User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('nodin_user')}</div>,
    },
    // Tanggal Nodin
    {
        accessorKey: 'tanggal_nodin_user',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Tanggal Nodin User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">{row.getValue('tanggal_nodin_user')}</div>
        ),
    },
    {
        accessorKey: 'sla',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    SLA
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const diff = calculateDaysDifference(
                row.getValue('tanggal_spk'),
                row.getValue('tanggal_nodin_user'),
            )
            const diffWithToday = calculateDaysDifference(
                new Date().toISOString().split('T')[0],
                row.getValue('tanggal_nodin_user'),
            )
            return (
                <div className="">
                    {row.getValue('tanggal_spk')
                        ? diff
                        : `Ongoing (${diffWithToday} hari)`}{' '}
                    {diff && row.getValue('tanggal_spk') ? 'hari' : ''}
                </div>
            )
        },
    },
    {
        accessorKey: 'metode',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Metode
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('metode')}</div>,
    },
    {
        accessorKey: 'is_verification_complete',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Verified?
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.getValue('is_verification_complete') ? (
                    <p>YES</p>
                ) : (
                    <p>NO</p>
                )}
                {row.getValue('catatan') && (
                    <InformationTooltip>
                        {row.getValue('catatan')}
                    </InformationTooltip>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'proses_pengadaan',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Proses Pengadaan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">{row.getValue('proses_pengadaan')}</div>
        ),
    },
    {
        accessorKey: 'nomor_spk',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nomor SPK
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('nomor_spk')}</div>,
    },
    {
        accessorKey: 'tanggal_spk',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Tanggal SPK
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">{row.getValue('tanggal_spk')}</div>
        ),
    },
    {
        accessorKey: 'pelaksana_pekerjaan',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Pelaksana Pekerjaan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">{row.getValue('pelaksana_pekerjaan')}</div>
        ),
    },
    {
        accessorKey: 'pic',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    PIC
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('pic').name}</div>,
    },
    {
        accessorKey: 'tanggal_nodin_plo',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Tanggal Nodin PLO
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {row.getValue('nodin_plos').map(nodin_plo => (
                    <p key={nodin_plo.tanggal_nodin}>
                        {nodin_plo.tanggal_nodin}
                    </p>
                ))}
            </div>
        ),
    },
    {
        accessorKey: 'nodin_plo',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nodin PLO
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {row.getValue('nodin_plos').map(nodin_plo => (
                    <p key={nodin_plo.nodin}>{nodin_plo.nodin}</p>
                ))}
            </div>
        ),
    },
    {
        accessorKey: 'hps',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    HPS
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('hps')}</div>,
    },
    {
        accessorKey: 'anggaran',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Anggaran
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('anggaran')}</div>,
    },
    {
        accessorKey: 'nilai_spk',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nilai SPK
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue('nilai_spk')}</div>,
    },
    {
        accessorKey: 'tkdn_percentage',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    TKDN Percentage
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {row.getValue('tkdn_percentage')
                    ? row.getValue('tkdn_percentage') + '%'
                    : ''}
            </div>
        ),
    },
    {
        accessorKey: 'pdn_percentage',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    PDN Percentage
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const pdnPercentage = row.getValue('tkdn_percentage') > 0 ? 100 : 0
            return (
                <div className="">
                    {row.getValue('tkdn_percentage') ? pdnPercentage + '%' : ''}
                </div>
            )
        },
    },
    {
        accessorKey: 'catatan',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const pengadaan = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    pengadaan.nodin_user,
                                )
                            }>
                            Salin nodin user
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Lihat detail pengadaan
                        </DropdownMenuItem>
                        <EditDataSheet defaultValues={pengadaan} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
