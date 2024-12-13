import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { AddDataForm } from '../form/AddDataForm'
import { AddDokumenSPKForm } from '../form/AddDokumenSPKForm'

export const DocumentType = {
    SPK: 'spk',
    JAMINAN: 'jaminan',
    PERJANJIAN: 'perjanjian',
}

export function AddDataSheet({ type }) {
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
                ) : type === DocumentType.JAMINAN ? (
                    <></>
                ) : type === DocumentType.PERJANJIAN ? (
                    <></>
                ) : (
                    <></>
                )}
            </SheetContent>
        </Sheet>
    )
}
