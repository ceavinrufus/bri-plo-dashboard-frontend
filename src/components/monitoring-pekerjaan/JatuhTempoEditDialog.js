import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { EditJatuhTempoForm } from '../form/EditJatuhTempoForm'

export function JatuhTempoEditDialog({ data }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="py-1 px-2 m-0" variant="ghost">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit jatuh tempo</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your project here. Click save when
                        you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <EditJatuhTempoForm defaultValues={data} />
            </DialogContent>
        </Dialog>
    )
}
