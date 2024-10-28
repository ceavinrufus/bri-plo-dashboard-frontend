'use client'

import React, { useContext, useState } from 'react'
import { ChevronsUpDown, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ProjectContext } from './context/ProjectContext'
import { deleteProjectData } from '@/lib/actions'
import { toast } from '@/hooks/use-toast'
import { ProjectEditDialog } from './ProjectEditDialog'

export function ProjectCollapsible() {
    const { projectData } = useContext(ProjectContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2">
            <div className="flex items-center justify-between space-x-4">
                <h4 className="text-sm font-semibold">Existing Projects</h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm flex items-center justify-between">
                <p>
                    {projectData[0].kode}: {projectData[0].nama}
                </p>
                <Toolbar data={projectData[0]} />
            </div>
            <CollapsibleContent className="space-y-2">
                {projectData.slice(1).map(project => (
                    <div
                        key={project.kode}
                        className="rounded-md border px-4 py-3 font-mono text-sm flex items-center justify-between">
                        <p>
                            {project.kode}: {project.nama}
                        </p>
                        <Toolbar data={project} />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

const Toolbar = ({ data }) => {
    const { removeProject } = useContext(ProjectContext)

    const onDelete = async () => {
        try {
            await deleteProjectData(data.kode)

            toast({
                title: 'Success',
                description: 'Data has been deleted successfully!',
                status: 'success',
            })
            removeProject(data.kode)
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while deleting data.',
                status: 'error',
            })
        }
    }

    return (
        <div className="flex items-center gap-2">
            <ProjectEditDialog data={data} />
            <Button
                className="py-1 px-2 m-0"
                variant="ghost"
                onClick={onDelete}>
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
