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
import { convertToCurrencyString } from '@/utils'
import { EditDataSheet } from '@/components/proses-pengadaan/EditDataSheet'
import { EditDataSheet as EditDokumenSheet } from '@/components/monitoring-dokumen/EditDataSheet'
import { InformationTooltip } from '@/components/InformationTooltip'
import { formatDateDMY, getLatestDate } from '@/lib/utils'
import { deleteDokumenData, deletePengadaanData } from '@/lib/actions'
import { useContext } from 'react'
import { PengadaanContext } from '@/components/context/PengadaanContext'
import { toast } from '@/hooks/use-toast'
import { ProsesPengadaanLogSheet } from '@/components/proses-pengadaan/ProsesPengadaanLogSheet'
import { HariLiburContext } from '@/components/context/HariLiburContext'
import { useAuth } from '@/hooks/auth'
import { canEditThisData } from '@/utils/roleChecker'
import { DokumenContext } from '@/components/context/DokumenContext'

const prosesPengadaanActions = (id = 'actions') => ({
    id,
    enableHiding: false,
    cell: ({ row }) => {
        const pengadaan = row.original
        const { removePengadaan } = useContext(PengadaanContext)
        const { user } = useAuth({ middleware: 'auth' })

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
                            navigator.clipboard.writeText(pengadaan.nomor_spk)
                        }>
                        Salin nomor SPK
                    </DropdownMenuItem>
                    {canEditThisData(user, pengadaan) && (
                        <>
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
                            <ProsesPengadaanLogSheet
                                defaultValues={pengadaan}
                            />
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
})

const monitoringDokumenActions = (id = 'actions') => ({
    id,
    enableHiding: false,
    cell: ({ row }) => {
        const dokumen = row.original
        const { removeDokumen } = useContext(DokumenContext)

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
                            navigator.clipboard.writeText(dokumen.nomor_spk)
                        }>
                        Salin nomor SPK
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={async () => {
                            try {
                                await deleteDokumenData(dokumen.id)

                                toast({
                                    title: 'Success',
                                    description:
                                        'Data has been deleted successfully!',
                                    status: 'success',
                                })
                                removeDokumen(dokumen.id)
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
                        Delete data dokumen
                    </DropdownMenuItem>
                    <EditDokumenSheet defaultValues={dokumen} />
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
})

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
    // Nodin PLOs
    {
        accessorKey: 'nodin_ip_pengadaans',
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
    prosesPengadaanActions('actions1'),
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
    // Nodin IP Pengadaan
    {
        accessorKey: 'nodin_ip_pengadaan',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nodin IP Pengadaan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {row.getValue('nodin_ip_pengadaans').map(nodin_ip_pengadaan => (
                    <p key={nodin_ip_pengadaan.nodin}>
                        {nodin_ip_pengadaan.nodin}
                    </p>
                ))}
            </div>
        ),
    },
    // Tanggal Nodin IP Pengadaan
    {
        accessorKey: 'tanggal_nodin_ip_pengadaan',
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
                {row.getValue('nodin_ip_pengadaans').map(nodin_ip_pengadaan => (
                    <p key={nodin_ip_pengadaan.tanggal_nodin}>
                        {formatDateDMY(nodin_ip_pengadaan.tanggal_nodin)}
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
            const { calculateWorkingDays } = useContext(HariLiburContext)

            const tanggalNodinUser = row
                .getValue('nodin_users')
                .map(nodin_user => nodin_user.tanggal_nodin)
            const diff = calculateWorkingDays(
                getLatestDate(tanggalNodinUser),
                row.getValue('tanggal_spk'),
            )
            const diffWithToday = calculateWorkingDays(
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
    // SLA Dokumen Lengkap
    {
        accessorKey: 'sla_dokumen_lengkap',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    SLA Dokumen Lengkap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { calculateWorkingDays } = useContext(HariLiburContext)

            const diff = calculateWorkingDays(
                row.getValue('verification_completed_at'),
                row.getValue('tanggal_spk'),
            )
            const diffWithToday = calculateWorkingDays(
                row.getValue('verification_completed_at'),
                new Date().toISOString().split('T')[0],
            )
            const isOverSla = false

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
            const { calculateWorkingDays } = useContext(HariLiburContext)

            const metode = row.getValue('metode')
            const slaDays = {
                'Penunjukan Langsung': 9,
                Lelang: 30,
                'Pemilihan Langsung': 28,
                Seleksi: 28,
            }
            const tanggalNodinUser = row
                .getValue('nodin_users')
                .map(nodin_user => nodin_user.tanggal_nodin)

            const diff = calculateWorkingDays(
                row.getValue('tanggal_acuan') ||
                    getLatestDate(tanggalNodinUser),
                row.getValue('tanggal_spk'),
            )
            const diffWithToday = calculateWorkingDays(
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
    // Tanggal SPPH
    {
        accessorKey: 'tanggal_spph',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Tanggal SPPH
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {formatDateDMY(row.getValue('tanggal_acuan'))}
            </div>
        ),
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
                    Dokumen Lengkap?
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.getValue('verification_completed_at') ? (
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
    // Tanggal Dokumen Lengkap
    {
        accessorKey: 'verification_completed_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Tanggal Dokumen Lengkap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {formatDateDMY(row.getValue('verification_completed_at'))}
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
        cell: ({ row }) => <div className="">{row.getValue('pic')?.name}</div>,
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
                    row.getValue('hps')?.amount,
                    row.getValue('hps')?.currency,
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
                    row.getValue('anggaran_investasi')?.amount +
                        row.getValue('anggaran_eksploitasi')?.amount,
                    row.getValue('anggaran_investasi')?.currency ||
                        row.getValue('anggaran_eksploitasi')?.currency,
                )}
            </div>
        ),
    },
    // Anggaran Investasi
    {
        accessorKey: 'anggaran_investasi',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Anggaran Investasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {row.getValue('anggaran_investasi') &&
                    convertToCurrencyString(
                        row.getValue('anggaran_investasi')?.amount,
                        row.getValue('anggaran_investasi')?.currency,
                    )}
            </div>
        ),
    },
    // Anggaran Eksploitasi
    {
        accessorKey: 'anggaran_eksploitasi',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Anggaran Eksploitasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {convertToCurrencyString(
                    row.getValue('anggaran_eksploitasi')?.amount,
                    row.getValue('anggaran_eksploitasi')?.currency,
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
                    row.getValue('spk_investasi')?.amount +
                        row.getValue('spk_eksploitasi')?.amount,
                    row.getValue('spk_investasi')?.currency ||
                        row.getValue('spk_eksploitasi')?.currency,
                )}
            </div>
        ),
    },
    // Nilai SPK Investasi
    {
        accessorKey: 'spk_investasi',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nilai SPK Investasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {convertToCurrencyString(
                    row.getValue('spk_investasi')?.amount,
                    row.getValue('spk_investasi')?.currency,
                )}
            </div>
        ),
    },
    // Nilai SPK Eksploitasi
    {
        accessorKey: 'spk_eksploitasi',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nilai SPK Eksploitasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="">
                {convertToCurrencyString(
                    row.getValue('spk_eksploitasi')?.amount,
                    row.getValue('spk_eksploitasi')?.currency,
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
    prosesPengadaanActions('actions2'),
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
    // Tanggal SPK Diterima
    {
        accessorKey: 'tanggal_spk_diterima',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal SPK Diterima
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_spk_diterima'))}</div>
        ),
    },
    // Tim
    {
        accessorKey: 'tim_pemrakarsa',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tim Pemrakarsa
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="uppercase text-center">
                {row.getValue('tim_pemrakarsa')}
            </div>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // PIC
    {
        accessorKey: 'pic_pengadaan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                PIC Pengadaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('pic_pengadaan').name}</div>,
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
    // Jenis Pekerjaan
    {
        accessorKey: 'jenis_pekerjaan',
        header: ({ column }) => (
            <div className="w-72 md:w-96">
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Jenis Pekerjaan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => <div>{row.getValue('jenis_pekerjaan')}</div>,
        enableHiding: false,
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
    monitoringDokumenActions('actions1'),
    // Pelaksana Pekerjaan
    {
        accessorKey: 'pelaksana_pekerjaan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Pelaksana Pekerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{JSON.parse(row.getValue('pelaksana_pekerjaan')).name}</div>
        ),
    },
    // Alamat Pelaksana Pekerjaan
    {
        accessorKey: 'alamat_pelaksana_pekerjaan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Alamat Pelaksana Pekerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{JSON.parse(row.getValue('pelaksana_pekerjaan')).address}</div>
        ),
    },
    // Nomor Telepon Pelaksana Pekerjaan
    {
        accessorKey: 'no_telp_pelaksana_pekerjaan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                No Telp Pelaksana Pekerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {JSON.parse(row.getValue('pelaksana_pekerjaan')).phone_number}
            </div>
        ),
    },
    // PIC Pelaksana Pekerjaan
    {
        accessorKey: 'pic_pelaksana_pekerjaan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                PIC Pelaksana Pekerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue('pic_pelaksana_pekerjaan') &&
                    JSON.parse(row.getValue('pic_pelaksana_pekerjaan')).name +
                        ' (' +
                        JSON.parse(row.getValue('pic_pelaksana_pekerjaan'))
                            .phone_number +
                        ')'}
            </div>
        ),
    },
    // Dokumen Pelengkap Pengembalian SPK
    {
        accessorKey: 'dokumen_pelengkap',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Dokumen Pelengkap Pengembalian SPK
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{row.getValue('dokumen_pelengkap')?.join(', ')}</div>
        ),
    },
    // Info Vendor
    {
        accessorKey: 'tanggal_info_ke_vendor',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Info ke Vendor
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('tanggal_info_ke_vendor')}</div>,
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
        cell: ({ row }) => {
            const tanggal_pengambilan = new Date(
                row.getValue('tanggal_pengambilan'),
            )
            const jatuh_tempo = tanggal_pengambilan.setDate(
                tanggal_pengambilan.getDate() + 7,
            )
            return <div>{formatDateDMY(jatuh_tempo)}</div>
        },
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
    // Dokumen yang Dikembalikan
    {
        accessorKey: 'dokumen_yang_dikembalikan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Dokumen yang Dikembalikan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{row.getValue('dokumen_yang_dikembalikan')?.join(', ')}</div>
        ),
    },
    // TKDN Percentage
    {
        accessorKey: 'tkdn_percentage',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                TKDN Percentage
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('tkdn_percentage')}</div>,
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
    // PIC Legal
    {
        accessorKey: 'pic_legal',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                PIC Legal
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('pic_legal').name}</div>,
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
    // Actions
    monitoringDokumenActions('actions2'),
]

export const userColumns = [
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
        header: 'Personal Number',
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
    {
        id: 'action',
        enableHiding: false,
        cell: ({ row }) => {
            const userData = row.original
            const { user } = useAuth({ middleware: 'auth' })

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
                                navigator.clipboard.writeText(userData.pn)
                            }>
                            Salin PN
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                                try {
                                    toast({
                                        title: 'Success',
                                        description:
                                            'Password reset successfully!',
                                        status: 'success',
                                    })
                                } catch (error) {
                                    toast({
                                        title: 'Error',
                                        description:
                                            error.response?.data?.message ||
                                            'An error occurred while resetting password',
                                        status: 'error',
                                    })
                                }
                            }}>
                            Reset password
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
