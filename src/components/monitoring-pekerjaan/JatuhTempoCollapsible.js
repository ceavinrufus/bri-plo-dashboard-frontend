'use client'

import React, { useContext, useState } from 'react'
import { ChevronsUpDown, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ProjectContext } from '../context/ProjectContext'
import { deleteJatuhTempoData, deleteProjectData } from '@/lib/actions'
import { toast } from '@/hooks/use-toast'
import { JatuhTempoEditDialog } from './JatuhTempoEditDialog'

export function JatuhTempoCollapsible({ defaultValues }) {
    const [isOpen, setIsOpen] = useState(false)
    const jatuhTempos = defaultValues.jatuh_tempos

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="mt-4 w-full space-y-2">
            <div className="flex items-center justify-between space-x-4">
                <h4 className="text-sm font-semibold">
                    Tahapan Jatuh Tempo Existing
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono flex text-sm items-center justify-between">
                <div className="text-sm">
                    <p>Keterangan: {jatuhTempos[0].keterangan}</p>
                    <p className="">
                        Tanggal mulai: {jatuhTempos[0].tanggal_mulai}
                    </p>
                    <p className="">
                        Tanggal akhir: {jatuhTempos[0].tanggal_akhir}
                    </p>
                </div>
                <Toolbar data={jatuhTempos[0]} />
            </div>
            <CollapsibleContent className="space-y-2">
                {jatuhTempos.slice(1).map((jt, id) => (
                    <div
                        key={id}
                        className="rounded-md border px-4 py-3 font-mono flex text-sm items-center justify-between">
                        <div className="text-sm">
                            <p>Keterangan: {jt.keterangan}</p>
                            <p className="">
                                Tanggal mulai: {jt.tanggal_mulai}
                            </p>
                            <p className="">
                                Tanggal akhir: {jt.tanggal_akhir}
                            </p>
                        </div>
                        <Toolbar data={jt} />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

const Toolbar = ({ data }) => {
    // const { removeProject } = useContext(ProjectContext)

    const onDelete = async () => {
        try {
            await deleteJatuhTempoData(data.id)

            toast({
                title: 'Success',
                description: 'Data has been deleted successfully!',
                status: 'success',
            })
            window.location.reload()
            // removeProject(data.kode)
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
            <JatuhTempoEditDialog data={data} />
            <Button
                className="py-1 px-2 m-0"
                variant="ghost"
                onClick={onDelete}>
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
