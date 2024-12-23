import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { EditUserForm } from './form/EditUserForm'

export function EditUserDialog({ userData }) {
    return (
        <Dialog>
            <DialogTrigger
                className={
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'
                }>
                Edit User
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <EditUserForm defaultValues={userData} />
            </DialogContent>
        </Dialog>
    )
}
