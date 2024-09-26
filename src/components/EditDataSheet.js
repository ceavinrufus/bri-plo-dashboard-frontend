import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { EditDataForm } from './form/EditDataForm'

export function EditDataSheet({ defaultValues }) {
    return (
        <Sheet>
            <SheetTrigger
                className={
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                }>
                Edit informasi pengadaan
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Data</SheetTitle>
                    <SheetDescription>
                        Fill in the form below to edit data.
                    </SheetDescription>
                </SheetHeader>
                <EditDataForm defaultValues={defaultValues} />
            </SheetContent>
        </Sheet>
    )
}
