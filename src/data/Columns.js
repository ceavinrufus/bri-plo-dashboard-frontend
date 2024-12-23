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
import { EditDataSheet as EditPembayaranSheet } from '@/components/rekap-pembayaran/EditDataSheet'
import { InformationTooltip } from '@/components/InformationTooltip'
import { formatDateDMY, getLatestDate } from '@/lib/utils'
import {
    deleteDokumenPerjanjianData,
    deleteDokumenSPKData,
    deletePengadaanData,
    deleteRekapPembayaranData,
} from '@/lib/actions'
import { useContext } from 'react'
import { PengadaanContext } from '@/components/context/PengadaanContext'
import { toast } from '@/hooks/use-toast'
import { ProsesPengadaanLogSheet } from '@/components/proses-pengadaan/ProsesPengadaanLogSheet'
import { HariLiburContext } from '@/components/context/HariLiburContext'
import { useAuth } from '@/hooks/auth'
import { canEditThisData } from '@/utils/roleChecker'
import {
    DocumentType,
    DokumenContext,
} from '@/components/context/DokumenContext'
import { PembayaranContext } from '@/components/context/PembayaranContext'
import { EditUserDialog } from '@/components/EditUserDialog'

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

const monitoringDokumenSPKActions = (id = 'actions') => ({
    id,
    enableHiding: false,
    cell: ({ row }) => {
        const dokumen = row.original
        const { removeDokumenSPK } = useContext(DokumenContext)

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
                                await deleteDokumenSPKData(dokumen.id)

                                toast({
                                    title: 'Success',
                                    description:
                                        'Data has been deleted successfully!',
                                    status: 'success',
                                })
                                removeDokumenSPK(dokumen.id)
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
                    <EditDokumenSheet
                        type={DocumentType.SPK}
                        defaultValues={dokumen}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
})

const monitoringDokumenJaminanActions = (id = 'actions') => ({
    id,
    enableHiding: false,
    cell: ({ row }) => {
        const dokumen = row.original
        const { removeDokumenSPK } = useContext(DokumenContext)

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
                                await deleteDokumenSPKData(dokumen.id)

                                toast({
                                    title: 'Success',
                                    description:
                                        'Data has been deleted successfully!',
                                    status: 'success',
                                })
                                removeDokumenSPK(dokumen.id)
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
                    <EditDokumenSheet
                        type={DocumentType.JAMINAN}
                        defaultValues={dokumen}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
})

const monitoringDokumenPerjanjianActions = (id = 'actions') => ({
    id,
    enableHiding: false,
    cell: ({ row }) => {
        const dokumen = row.original
        const { removeDokumenPerjanjian } = useContext(DokumenContext)

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
                                await deleteDokumenPerjanjianData(dokumen.id)

                                toast({
                                    title: 'Success',
                                    description:
                                        'Data has been deleted successfully!',
                                    status: 'success',
                                })
                                removeDokumenPerjanjian(dokumen.id)
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
                    <EditDokumenSheet
                        type={DocumentType.PERJANJIAN}
                        defaultValues={dokumen}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
})

const rekapPembayaranActions = (id = 'actions') => ({
    id,
    enableHiding: false,
    cell: ({ row }) => {
        const rekapPembayaran = row.original
        const { removePembayaran } = useContext(PembayaranContext)

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
                                rekapPembayaran.nomor_spk,
                            )
                        }>
                        Salin nomor SPK
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            navigator.clipboard.writeText(
                                rekapPembayaran.nomor_invoice,
                            )
                        }>
                        Salin nomor invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={async () => {
                            try {
                                await deleteRekapPembayaranData(
                                    rekapPembayaran.id,
                                )

                                toast({
                                    title: 'Success',
                                    description:
                                        'Data has been deleted successfully!',
                                    status: 'success',
                                })
                                removePembayaran(rekapPembayaran.id)
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
                        Delete data rekap pembayaran
                    </DropdownMenuItem>
                    <EditPembayaranSheet defaultValues={rekapPembayaran} />
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

const dokumenSPKJaminanColumn = type => ({
    accessorKey: type,
    header: ({ column }) => (
        <div className="w-72 md:w-96">
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
                className="capitalize">
                {type.replace(/_/g, ' ')}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
    ),
    cell: ({ row }) => {
        const jaminans = row.getValue('dokumen_jaminans')[type]
        let jaminansKey = Object.keys(
            row.getValue('dokumen_jaminans')[type] || {},
        )
        jaminansKey = jaminansKey.filter(
            key => key !== 'type' && key !== '__typename' && key !== 'id',
        )
        return (
            <div className="">
                {jaminansKey &&
                    jaminansKey.map(key => (
                        <div key={key}>
                            {key === 'tanggal_diterima' ? (
                                <p>
                                    <strong>Tanggal Diterima:</strong>{' '}
                                    {formatDateDMY(jaminans[key])}
                                </p>
                            ) : key === 'waktu_mulai' ? (
                                <p>
                                    <strong>Waktu Mulai:</strong>{' '}
                                    {formatDateDMY(jaminans[key])}
                                </p>
                            ) : key === 'waktu_berakhir' ? (
                                <p>
                                    <strong>Waktu Berakhir:</strong>{' '}
                                    {formatDateDMY(jaminans[key])}
                                </p>
                            ) : key === 'nilai' ? (
                                <p>
                                    <strong>Nilai:</strong>{' '}
                                    {convertToCurrencyString(
                                        jaminans[key]?.amount,
                                        jaminans[key]?.currency,
                                    )}
                                </p>
                            ) : (
                                <p>
                                    <strong className="capitalize">
                                        {key.replace(/_/g, ' ')}:
                                    </strong>{' '}
                                    {jaminans[key]}
                                </p>
                            )}
                        </div>
                    ))}
            </div>
        )
    },
    enableSorting: false,
})

const jaminanAttributes = (type, attribute) => ({
    accessorKey: attribute + '_' + type,
    header: ({ column }) => (
        <div className="w-72 md:w-96">
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
                className="capitalize">
                {(attribute + '_' + type).replace(/_/g, ' ')}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
    ),
    cell: ({ row }) => {
        const jaminans = row.getValue('dokumen_jaminans')[type]

        if (!jaminans) return
        return (
            <div className="">
                {attribute === 'tanggal_diterima'
                    ? formatDateDMY(jaminans[attribute])
                    : attribute === 'waktu_mulai'
                      ? formatDateDMY(jaminans[attribute])
                      : attribute === 'waktu_berakhir'
                        ? formatDateDMY(jaminans[attribute])
                        : attribute === 'nilai'
                          ? convertToCurrencyString(
                                jaminans[attribute]?.amount,
                                jaminans[attribute]?.currency,
                            )
                          : jaminans[attribute]}
            </div>
        )
    },
    enableSorting: false,
})

export const monitoringDokumenSPKColumns = [
    // Tanggal Penyerahan Dokumen
    {
        accessorKey: 'tanggal_penyerahan_dokumen',
        header: () => null, // No header for the shadow column
        cell: () => null, // No cell rendering for the shadow column
        enableSorting: false,
        enableHiding: false, // Hides the column
    },
    // Dokumen Jaminans
    {
        accessorKey: 'dokumen_jaminans',
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
                    row.getValue('spk')?.amount,
                    row.getValue('spk')?.currency,
                )}
            </div>
        ),
    },
    // Jangka Waktu Pekerjaan
    {
        accessorKey: 'jangka_waktu',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Jangka Waktu Pekerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('jangka_waktu')}</div>,
    },
    monitoringDokumenSPKActions('actions1'),
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
        cell: ({ row }) => <div>{row.getValue('pic_pelaksana_pekerjaan')}</div>,
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
    monitoringDokumenSPKActions('actions2'),
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
    // SLA Pengambilan SPK
    {
        accessorKey: 'sla_pengambilan_spk',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                SLA Pengambilan SPK
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { calculateWorkingDays } = useContext(HariLiburContext)

            const tanggal_spk = new Date(row.getValue('tanggal_spk'))
            const diff = calculateWorkingDays(
                tanggal_spk,
                row.getValue('tanggal_pengambilan'),
            )
            const diffWithToday = calculateWorkingDays(
                tanggal_spk,
                new Date().toISOString().split('T')[0],
            )
            const isOverSla = row.getValue('tanggal_pengambilan')
                ? diff > 7
                : diffWithToday > 7

            return (
                <div className={`${isOverSla ? 'text-red-500' : ''}`}>
                    {row.getValue('tanggal_pengambilan')
                        ? diff
                        : `Ongoing (${diffWithToday} hari)`}{' '}
                    {diff && row.getValue('tanggal_pengambilan') ? 'hari' : ''}
                </div>
            )
        },
    },
    // SLA Pengembalian SPK
    {
        accessorKey: 'sla_pengembalian_spk',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                SLA Pengembalian SPK
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { calculateWorkingDays } = useContext(HariLiburContext)

            const tanggal_pengambilan = new Date(
                row.getValue('tanggal_pengambilan'),
            )
            const diff = calculateWorkingDays(
                tanggal_pengambilan,
                row.getValue('tanggal_pengembalian'),
            )
            const diffWithToday = calculateWorkingDays(
                tanggal_pengambilan,
                new Date().toISOString().split('T')[0],
            )
            const isOverSla = row.getValue('tanggal_pengembalian')
                ? diff > 7
                : diffWithToday > 7

            return (
                <div className={`${isOverSla ? 'text-red-500' : ''}`}>
                    {row.getValue('tanggal_pengembalian')
                        ? diff
                        : `Ongoing (${diffWithToday} hari)`}{' '}
                    {diff && row.getValue('tanggal_pengembalian') ? 'hari' : ''}
                </div>
            )
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
    // Tanggal Penyerahan Jaminan
    {
        accessorKey: 'tanggal_penyerahan_jaminan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Penyerahan Jaminan
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
    monitoringDokumenSPKActions('actions3'),
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
            <div className="w-72 md:w-96">
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Catatan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => <div>{row.getValue('catatan')}</div>,
        enableSorting: false,
    },
    // Jaminan Uang Muka
    dokumenSPKJaminanColumn('jaminan_uang_muka'),
    // Jaminan Pelaksanaan
    dokumenSPKJaminanColumn('jaminan_pembayaran'),
    // Jaminan Pemeliharaan
    dokumenSPKJaminanColumn('jaminan_pelaksanaan'),
    // Jaminan Pemeliharaan
    dokumenSPKJaminanColumn('jaminan_pemeliharaan'),
    // Actions
    monitoringDokumenSPKActions('actions4'),
]

export const monitoringDokumenJaminanColumns = [
    // Dokumen Jaminans
    {
        accessorKey: 'dokumen_jaminans',
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
    monitoringDokumenJaminanActions('actions1'),
    // Jaminan
    ...[
        'jaminan_uang_muka',
        'jaminan_pembayaran',
        'jaminan_pelaksanaan',
        'jaminan_pemeliharaan',
    ].flatMap(type =>
        [
            'tanggal_diterima',
            'penerbit',
            'nomor_jaminan',
            ...(type === 'jaminan_pelaksanaan' ? ['dokumen_keabsahan'] : []),
            'nilai',
            'waktu_mulai',
            'waktu_berakhir',
        ].map(attribute => jaminanAttributes(type, attribute)),
    ),
    // Actions
    monitoringDokumenJaminanActions('actions2'),
]

export const monitoringDokumenPerjanjianColumns = [
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
    // Tanggal Permohonan Diterima
    {
        accessorKey: 'tanggal_permohonan_diterima',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Permohonan Diterima
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {formatDateDMY(row.getValue('tanggal_permohonan_diterima'))}
            </div>
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
                    row.getValue('spk')?.amount,
                    row.getValue('spk')?.currency,
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
    monitoringDokumenPerjanjianActions('actions1'),
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
        cell: ({ row }) => <div>{row.getValue('pic_pelaksana_pekerjaan')}</div>,
    },
    // Nomor Kontrak
    {
        accessorKey: 'nomor_kontrak',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nomor Kontrak
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nomor_kontrak')}</div>,
    },
    // Tanggal Kontrak
    {
        accessorKey: 'tanggal_kontrak',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Kontrak
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_kontrak'))}</div>
        ),
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
    // Actions
    monitoringDokumenPerjanjianActions('actions2'),
]

export const rekapPembayaranColumns = [
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
    // PIC PC
    {
        accessorKey: 'pic_pc',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                PIC PC
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('pic_pc').name}</div>,
    },
    // Tanggal Terima
    {
        accessorKey: 'tanggal_terima',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Terima
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_terima'))}</div>
        ),
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
    // Nomor Perjanjian
    {
        accessorKey: 'nomor_perjanjian',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nomor Perjanjian
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nomor_perjanjian')}</div>,
    },
    // Tanggal Perjanjian
    {
        accessorKey: 'tanggal_perjanjian',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Perjanjian
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_perjanjian'))}</div>
        ),
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
    },
    rekapPembayaranActions('actions1'),
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
                    row.getValue('spk')?.amount,
                    row.getValue('spk')?.currency,
                )}
            </div>
        ),
    },
    // Vendor/Pelaksana Pekerjaan
    {
        accessorKey: 'vendor',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Vendor/Pelaksana Pekerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('vendor')}</div>,
    },
    // TKDN
    {
        accessorKey: 'tkdn',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                TKDN
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('tkdn')}%</div>,
    },
    // Nomor Invoice
    {
        accessorKey: 'nomor_invoice',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nomor Invoice
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nomor_invoice')}</div>,
    },
    // Nominal Invoice
    {
        accessorKey: 'invoice',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nominal Invoice
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {convertToCurrencyString(
                    row.getValue('invoice')?.amount,
                    row.getValue('invoice')?.currency,
                )}
            </div>
        ),
    },
    // Invoice Currency
    {
        accessorKey: 'invoice_currency',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Invoice Currency
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('invoice_currency')}</div>,
    },
    // Invoice Rate
    {
        accessorKey: 'invoice_rate',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Invoice Rate
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('invoice_rate')}</div>,
    },
    // Nomor Rekening
    {
        accessorKey: 'nomor_rekening',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nomor Rekening
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nomor_rekening')}</div>,
    },
    // PIC Pay
    {
        accessorKey: 'pic_pay',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                PIC Pay
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('pic_pay').name}</div>,
    },
    // Nota Fiat
    {
        accessorKey: 'nota_fiat',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Nota Fiat
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nota_fiat')}</div>,
    },
    // Tanggal Fiat
    {
        accessorKey: 'tanggal_fiat',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Fiat
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_fiat'))}</div>
        ),
    },
    // SLA
    {
        accessorKey: 'sla',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                SLA
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('sla')}</div>,
    },
    // Hari Pengerjaan
    {
        accessorKey: 'hari_pengerjaan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Hari Pengerjaan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('hari_pengerjaan')}</div>,
    },
    // Status Pembayaran
    {
        accessorKey: 'status_pembayaran',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Status Pembayaran
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('status_pembayaran')}</div>,
    },
    // Tanggal Pembayaran
    {
        accessorKey: 'tanggal_pembayaran',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Tanggal Pembayaran
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{formatDateDMY(row.getValue('tanggal_pembayaran'))}</div>
        ),
    },
    // Keterangan
    {
        accessorKey: 'keterangan',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }>
                Keterangan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('keterangan')}</div>,
    },
    // Actions
    rekapPembayaranActions('actions2'),
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
                        <EditUserDialog userData={userData} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
