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

export function AddDataSheet() {
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
                <AddDataForm />
            </SheetContent>
        </Sheet>
    )
}