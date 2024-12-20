'use client'

import MonitoringDokumenJaminanTable from '@/components/monitoring-dokumen/MonitoringDokumenJaminanTable'
import MonitoringDokumenPerjanjianTable from '@/components/monitoring-dokumen/MonitoringDokumenPerjanjianTable'
import MonitoringDokumenSPKTable from '@/components/monitoring-dokumen/MonitoringDokumenSPKTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MonitoringDokumen = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('spk')

    useEffect(() => {
        const tab = searchParams.get('tab') || 'spk' // Default to 'spk' if no tab is provided
        if (['spk', 'jaminan', 'perjanjian'].includes(tab)) {
            setActiveTab(tab)
        }
    }, [searchParams])

    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <Tabs
                            orientation="vertical"
                            defaultValue="spk"
                            value={activeTab}
                            onValueChange={value => {
                                setActiveTab(value)
                                router.push(`?tab=${value}`)
                            }}
                            className="space-y-4">
                            <div className="w-full overflow-x-auto pb-2">
                                <TabsList>
                                    <TabsTrigger value="spk">
                                        SPK & Jaminan
                                    </TabsTrigger>
                                    <TabsTrigger value="jaminan">
                                        Jaminan
                                    </TabsTrigger>
                                    <TabsTrigger value="perjanjian">
                                        Perjanjian
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="spk" className="space-y-4">
                                <MonitoringDokumenSPKTable />
                            </TabsContent>
                            <TabsContent value="jaminan" className="space-y-4">
                                <MonitoringDokumenJaminanTable />
                            </TabsContent>
                            <TabsContent
                                value="perjanjian"
                                className="space-y-4">
                                <MonitoringDokumenPerjanjianTable />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonitoringDokumen
