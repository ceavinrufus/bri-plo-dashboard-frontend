import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { AddProjectForm } from './form/AddProjectForm'

export function ProjectSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Projects</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Project</SheetTitle>
                    <SheetDescription>
                        Fill in the form below to add new data.
                    </SheetDescription>
                </SheetHeader>
                <AddProjectForm />
            </SheetContent>
        </Sheet>
    )
}
