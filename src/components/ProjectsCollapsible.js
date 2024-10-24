'use client'

import React, { useContext, useState } from 'react'
import { ChevronsUpDown, Pencil, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ProjectContext } from './context/ProjectContext'
import { deleteProjectData, updateProjectData } from '@/lib/actions'
import { toast } from '@/hooks/use-toast'

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
                <Toolbar kode={projectData[0].kode} />
            </div>
            <CollapsibleContent className="space-y-2">
                {projectData.slice(1).map(project => (
                    <div
                        key={project.kode}
                        className="rounded-md border px-4 py-3 font-mono text-sm flex items-center justify-between">
                        <p>
                            {project.kode}: {project.nama}
                        </p>
                        <Toolbar kode={project.kode} />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

const Toolbar = ({ kode }) => {
    const { removeProject } = useContext(ProjectContext)

    const onDelete = async () => {
        try {
            await deleteProjectData(kode)

            toast({
                title: 'Success',
                description: 'Data has been deleted successfully!',
                status: 'success',
            })
            removeProject(kode)
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

    // const onUpdate = async data => {
    //     try {
    //         const response = await updateProjectData()

    //         toast({
    //             title: 'Success',
    //             description: 'Data has been submitted successfully!',
    //             status: 'success',
    //         })
    //         updateProject(response.data)
    //     } catch (error) {
    //         toast({
    //             title: 'Error',
    //             description:
    //                 error.response?.data?.message ||
    //                 'An error occurred while submitting data.',
    //             status: 'error',
    //         })
    //     }
    // }

    return (
        <div className="flex items-center gap-2">
            <Button className="py-1 px-2 m-0" variant="ghost">
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                className="py-1 px-2 m-0"
                variant="ghost"
                onClick={onDelete}>
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
