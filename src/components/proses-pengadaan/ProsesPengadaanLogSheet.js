import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { EditPengadaanLogForm } from '../form/EditPengadaanLogForm'

export function ProsesPengadaanLogSheet({ defaultValues }) {
    return (
        <Sheet>
            <SheetTrigger
                className={
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'
                }>
                Manage proses pengadaan
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Proses Pengadaan</SheetTitle>
                    <SheetDescription>Detail proses pengadaan</SheetDescription>
                </SheetHeader>
                <EditPengadaanLogForm
                    defaultValues={defaultValues.pengadaan_log}
                    pengadaanId={defaultValues.id}
                />
            </SheetContent>
        </Sheet>
    )
}
