import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { AddProjectForm } from './form/AddProjectForm'
import { ProjectCollapsible } from './ProjectsCollapsible'
import { Separator } from './ui/separator'

export function ProjectsSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Projects</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Projects</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                    <ProjectCollapsible />
                    <Separator className="mt-6" />
                    <AddProjectForm />
                </div>
            </SheetContent>
        </Sheet>
    )
}
