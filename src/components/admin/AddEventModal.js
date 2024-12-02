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
import { postHariLiburData } from '@/lib/actions'
import { toast } from '@/hooks/use-toast'

const AddEventModal = ({ onAddEvent }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [eventName, setEventName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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
            const response = await postHariLiburData(newEvent)
            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            onAddEvent(response.data)
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
        setEventName('')
        setStartDate('')
        setEndDate('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="mb-4">
                    + Add Event
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
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
                        Add Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddEventModal
