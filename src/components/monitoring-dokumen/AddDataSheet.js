import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { AddDokumenSPKForm } from '../form/AddDokumenSPKForm'
import { AddDokumenPerjanjianForm } from '../form/AddDokumenPerjanjianForm'
import { DocumentType } from '../context/DokumenContext'

export function AddDataSheet({ type }) {
    if (type === DocumentType.JAMINAN) return
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Add Data</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Data</SheetTitle>
                    <SheetDescription>
                        Fill in the form below to add new data.
                    </SheetDescription>
                </SheetHeader>
                {type === DocumentType.SPK ? (
                    <AddDokumenSPKForm />
                ) : type === DocumentType.PERJANJIAN ? (
                    <AddDokumenPerjanjianForm />
                ) : (
                    <></>
                )}
            </SheetContent>
        </Sheet>
    )
}
