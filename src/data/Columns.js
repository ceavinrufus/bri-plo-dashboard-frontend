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
import {
    calculateDaysDifference,
    calculateWorkingDaysDifference,
    convertToCurrencyString,
} from '@/utils'
import { EditDataSheet } from '@/components/proses-pengadaan/EditDataSheet'
import { InformationTooltip } from '@/components/InformationTooltip'
import { formatDateDMY, getLatestDate } from '@/lib/utils'
import { deletePengadaanData } from '@/lib/actions'
import { useContext } from 'react'
import { PengadaanContext } from '@/components/context/PengadaanContext'
import { toast } from '@/hooks/use-toast'

const prosesPengadaanActions =
    // Actions
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const pengadaan = row.original
            const { removePengadaan } = useContext(PengadaanContext)

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
                                    pengadaan.nomor_spk,
                                )
                            }>
                            Salin nomor SPK
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                                try {
                                    await deletePengadaanData(pengadaan.id)

                                    toast({
                                        title: 'Success',
                                        description:
                                            'Data has been deleted successfully!',
                                        status: 'success',
                                    })
                                    removePengadaan(pengadaan.id)
                                } catch (error) {
                                    toast({
                                        title: 'Error',
                                        description:
                                            error.response?.data?.message ||
                                            'An error occurred while deleting data.',
                                        status: 'error',
                                    })
                                }
                            }}>
                            Delete data pengadaan
                        </DropdownMenuItem>
                        <EditDataSheet defaultValues={pengadaan} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }

export const prosesPengadaanColumns = [
    // Nodin Users
    {
        accessorKey: 'nodin_users',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    // Nodin PLOs
    {
        accessorKey: 'nodin_plos',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    // Departemen
    {
        accessorKey: 'departemen',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    // Tanggal Acuan
    {
        accessorKey: 'tanggal_acuan',
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
    // Tim
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
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
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
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // Proyek
    {
        accessorKey: 'proyek',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Proyek
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="uppercase text-center">
                    {row.getValue('proyek')}
                </div>
            )
        },
        enableSorting: true,
        enableHiding: false, // Hides the column
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
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
        enableHiding: false, // Hides the column
    },
    prosesPengadaanActions,
    // Nodin User
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
        cell: ({ row }) => (
            <div className="">
                {row.getValue('nodin_users').map(nodin_user => (
                    <p key={nodin_user.nodin}>{nodin_user.nodin}</p>
                ))}
            </div>
        ),
    },
    // Tanggal Nodin User
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
            <div className="">
                {row.getValue('nodin_users').map(nodin_user => (
                    <p key={nodin_user.tanggal_nodin}>
                        {formatDateDMY(nodin_user.tanggal_nodin)}
                    </p>
                ))}
            </div>
        ),
    },
    // SLA Usulan User
    {
        accessorKey: 'sla_usulan_user',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    SLA Usulan User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const tanggalNodinUser = row
                .getValue('nodin_users')
                .map(nodin_user => nodin_user.tanggal_nodin)
            const diff = calculateDaysDifference(
                getLatestDate(tanggalNodinUser),
                row.getValue('tanggal_spk'),
            )
            const diffWithToday = calculateDaysDifference(
                getLatestDate(tanggalNodinUser),
                new Date().toISOString().split('T')[0],
            )
            const isOverSla = row.getValue('tanggal_spk')
                ? diff > 16
                : diffWithToday > 16

            return (
                <div className={`${isOverSla ? 'text-red-500' : ''}`}>
                    {row.getValue('tanggal_spk')
                        ? diff
                        : `Ongoing (${diffWithToday} hari)`}{' '}
                    {diff && row.getValue('tanggal_spk') ? 'hari' : ''}
                </div>
            )
        },
    },
    // SLA Proses Pengadaan
    {
        accessorKey: 'sla_proses_pengadaan',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    SLA Proses Pengadaan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const metode = row.getValue('metode')
            const slaDays = {
                'Penunjukkan Langsung': 9,
                Lelang: 30,
                'Pemilihan Langsung': 28,
                Seleksi: 28,
            }
            const tanggalNodinUser = row
                .getValue('nodin_users')
                .map(nodin_user => nodin_user.tanggal_nodin)

            const diff = calculateWorkingDaysDifference(
                row.getValue('tanggal_acuan') ||
                    getLatestDate(tanggalNodinUser),
                row.getValue('tanggal_spk'),
            )
            const diffWithToday = calculateWorkingDaysDifference(
                row.getValue('tanggal_acuan') ||
                    getLatestDate(tanggalNodinUser),
                new Date().toISOString().split('T')[0],
            )

            const slaLimit = slaDays[metode] || 0
            const isOverSla = row.getValue('tanggal_spk')
                ? diff > slaLimit
                : diffWithToday > slaLimit

            return (
                <div className={`${isOverSla ? 'text-red-500' : ''}`}>
                    {row.getValue('tanggal_spk')
                        ? diff
                        : `Ongoing (${diffWithToday} hari)`}{' '}
                    {diff && row.getValue('tanggal_spk') ? 'hari' : ''}
                </div>
            )
        },
    },
    // Metode
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
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // Is Verification Complete
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
    // Proses Pengadaan
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
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // Nomor SPK
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
    // Tanggal SPK
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
            <div className="">{formatDateDMY(row.getValue('tanggal_spk'))}</div>
        ),
    },
    // Pelaksana Pekerjaan
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
    // PIC
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
    // Tanggal Nodin PLO
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
                        {formatDateDMY(nodin_plo.tanggal_nodin)}
                    </p>
                ))}
            </div>
        ),
    },
    // Nodin PLO
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
    // HPS
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
        cell: ({ row }) => (
            <div className="">
                {convertToCurrencyString(
                    row.getValue('hps').amount,
                    row.getValue('hps').currency,
                )}
            </div>
        ),
    },
    // Anggaran
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
        cell: ({ row }) => (
            <div className="">
                {convertToCurrencyString(
                    row.getValue('anggaran').amount,
                    row.getValue('anggaran').currency,
                )}
            </div>
        ),
    },
    // Nilai SPK
    {
        accessorKey: 'spk',
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
        cell: ({ row }) => (
            <div className="">
                {convertToCurrencyString(
                    row.getValue('spk').amount,
                    row.getValue('spk').currency,
                )}
            </div>
        ),
    },
    // TKDN Percentage
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
    // PDN Percentage
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
    // Catatan
    {
        accessorKey: 'catatan',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    prosesPengadaanActions,
]

export const monitoringDokumenSPKColumns = [
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
    // Perihal
    {
        accessorKey: 'perihal',
        header: ({ column }) => (
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
        ),
        cell: ({ row }) => <div>{row.getValue('perihal')}</div>,
        enableHiding: false,
    },
    // Nomor SPK
    {
        accessorKey: 'nomor_spk',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nomor SPK
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nomor_spk')}</div>,
    },
    // Tanggal SPK
    {
        accessorKey: 'tanggal_spk',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal SPK
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_spk'))}</div>
        ),
    },
    // Nama Vendor
    {
        accessorKey: 'nama_vendor',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nama Vendor
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nama_vendor')}</div>,
    },
    // PIC
    {
        accessorKey: 'pic',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                PIC
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('pic').name}</div>,
    },
    // SLA SPK Sejak Terbit
    {
        accessorKey: 'sla_spk_sejak_terbit',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                SLA SPK Sejak Terbit
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('sla_spk_sejak_terbit')}</div>,
    },
    // SLA SPK Sejak Diambil
    {
        accessorKey: 'sla_spk_sejak_diambil',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                SLA SPK Sejak Diambil
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('sla_spk_sejak_diambil')}</div>,
    },
    // Tanggal
    {
        accessorKey: 'tanggal',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{formatDateDMY(row.getValue('tanggal'))}</div>,
    },
    // Jangka Waktu
    {
        accessorKey: 'jangka_waktu',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Jangka Waktu
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('jangka_waktu')}</div>,
    },
    // Tim
    {
        accessorKey: 'tim',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tim
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('tim')}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // Nilai SPK
    {
        accessorKey: 'spk',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nilai SPK
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {convertToCurrencyString(
                    row.getValue('spk').amount,
                    row.getValue('spk').currency,
                )}
            </div>
        ),
    },
    // Identitas Vendor
    {
        accessorKey: 'identitas_vendor',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Identitas Vendor
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('identitas_vendor')}</div>,
    },
    // Info Vendor
    {
        accessorKey: 'info_vendor',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Info Vendor
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('info_vendor')}</div>,
    },
    // Tanggal Pengambilan
    {
        accessorKey: 'tanggal_pengambilan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Pengambilan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_pengambilan'))}</div>
        ),
    },
    // Identitas Pengambil
    {
        accessorKey: 'identitas_pengambil',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Identitas Pengambil
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('identitas_pengambil')}</div>,
    },
    // Tanggal Pengembalian
    {
        accessorKey: 'tanggal_pengembalian',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Pengembalian
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_pengembalian'))}</div>
        ),
    },
    // Tanggal Jatuh Tempo
    {
        accessorKey: 'tanggal_jatuh_tempo',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Jatuh Tempo
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_jatuh_tempo'))}</div>
        ),
    },
    // Catatan
    {
        accessorKey: 'catatan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Catatan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('catatan')}</div>,
        enableSorting: false,
    },
    // Form TKDN
    {
        accessorKey: 'form_tkdn',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Form TKDN
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('form_tkdn')}</div>,
    },
    // Tanggal Penyerahan Dokumen
    {
        accessorKey: 'tanggal_penyerahan_dokumen',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Penyerahan Dokumen
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {formatDateDMY(row.getValue('tanggal_penyerahan_dokumen'))}
            </div>
        ),
    },
    // Penerima Dokumen
    {
        accessorKey: 'penerima_dokumen',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Penerima Dokumen
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('penerima_dokumen')}</div>,
    },
    // Actions
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const pengadaan = row.original
            const { removePengadaan } = useContext(PengadaanContext)

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
                                    pengadaan.nomor_spk,
                                )
                            }>
                            Salin nomor SPK
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                                try {
                                    await deletePengadaanData(pengadaan.id)

                                    toast({
                                        title: 'Success',
                                        description:
                                            'Data has been deleted successfully!',
                                        status: 'success',
                                    })
                                    removePengadaan(pengadaan.id)
                                } catch (error) {
                                    toast({
                                        title: 'Error',
                                        description:
                                            error.response?.data?.message ||
                                            'An error occurred while deleting data.',
                                        status: 'error',
                                    })
                                }
                            }}>
                            Delete data pengadaan
                        </DropdownMenuItem>
                        <EditDataSheet defaultValues={pengadaan} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
