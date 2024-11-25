'use client'

import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { updatePengadaanData } from '@/lib/actions'
import { useContext, useState } from 'react'
import { PengadaanContext } from '../context/PengadaanContext'
import { PulseLoader } from 'react-spinners'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function EditPengadaanLogForm({ defaultValues, pengadaanId }) {
    const { updatePengadaan } = useContext(PengadaanContext)
    const [isProcessing, setIsProcessing] = useState(false)

    // State to manage form inputs
    const [logs, setLogs] = useState(
        defaultValues.map(log => ({
            stage: log.stage || '',
            tanggal: log.tanggal || '',
            document: log.document || '',
        })),
    )

    // Update the logs array on input change
    const handleInputChange = (index, field, value) => {
        const updatedLogs = [...logs]
        updatedLogs[index][field] = value
        setLogs(updatedLogs)
    }

    async function onSubmit(e) {
        e.preventDefault() // Prevent default form submission
        setIsProcessing(true)

        try {
            await updatePengadaanData(pengadaanId, {
                pengadaan_log: logs,
            })

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })

            // Update the context with the new data
            updatePengadaan(pengadaanId, {
                pengadaan_log: logs,
            })
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while editing data.',
                status: 'error',
            })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 mt-6">
            {logs.map((log, index) => (
                <div
                    key={index}
                    className="grid grid-cols-5 gap-2 items-center w-full justify-between">
                    <Label className="shad-input-label">{log.stage}</Label>
                    <div className="col-span-2">
                        <Label className="shad-input-label">Tanggal</Label>
                        <div className="flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                            <Input
                                value={log.tanggal}
                                onChange={e =>
                                    handleInputChange(
                                        index,
                                        'tanggal',
                                        e.target.value,
                                    )
                                }
                                type="date"
                                className="shad-input border-0"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <Label className="shad-input-label">Dokumen</Label>
                        <div className="flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                            <Input
                                value={log.document}
                                onChange={e =>
                                    handleInputChange(
                                        index,
                                        'document',
                                        e.target.value,
                                    )
                                }
                                type="text"
                                placeholder="Dokumen"
                                className="shad-input border-0"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button type="submit">
                {isProcessing ? (
                    <PulseLoader
                        size={8}
                        color="#ffffff"
                        speedMultiplier={0.5}
                    />
                ) : (
                    'Save'
                )}
            </Button>
        </form>
    )
}
