'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateHariLiburData } from '@/lib/actions'
import { toast } from '@/hooks/use-toast'
import { Pencil } from 'lucide-react'

const EditEventModal = ({ data, handleEditEvent }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [eventName, setEventName] = useState(data.keterangan)
    const [startDate, setStartDate] = useState(
        new Date(data.tanggal_mulai).toISOString().split('T')[0],
    )
    const [endDate, setEndDate] = useState(
        new Date(data.tanggal_selesai).toISOString().split('T')[0],
    )

    const handleSubmit = async () => {
        if (!eventName || !startDate || !endDate) {
            alert('Please fill in all fields.')
            return
        }

        const newEvent = {
            keterangan: eventName,
            tanggal_mulai: startDate,
            tanggal_selesai: endDate,
        }

        try {
            const response = await updateHariLiburData(data.id, newEvent)
            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            handleEditEvent(response.data)
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while submitting data.',
                status: 'error',
            })
        }
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="py-1 px-2 m-0" variant="ghost">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Event Name
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={e => setEventName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Start Date
                        </label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            End Date
                        </label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="secondary"
                        onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditEventModal
