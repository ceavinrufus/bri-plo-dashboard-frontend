'use client'

import MonitoringDokumenSPKTable from '@/components/monitoring-dokumen/MonitoringDokumenSPKTable'
import MonitoringPekerjaanTable from '@/components/monitoring-pekerjaan/MonitoringPekerjaanTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MonitoringPekerjaan = () => {
    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <MonitoringPekerjaanTable />
                        {/* <Tabs
                            orientation="vertical"
                            defaultValue="igm"
                            className="space-y-4">
                            <div className="w-full overflow-x-auto pb-2">
                                <TabsList>
                                    <TabsTrigger value="igm">IGM</TabsTrigger>
                                    <TabsTrigger value="bcg">BCG</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="igm" className="space-y-4">
                                <MonitoringPekerjaanTable />
                            </TabsContent>
                            <TabsContent
                                value="bcg"
                                className="space-y-4"></TabsContent>
                        </Tabs> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonitoringPekerjaan
