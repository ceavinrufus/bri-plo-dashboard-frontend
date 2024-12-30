'use client'

import MonitoringDokumenSPKTable from '@/components/monitoring-dokumen/MonitoringDokumenSPKTable'
import MonitoringPekerjaanTable from '@/components/monitoring-pekerjaan/MonitoringPekerjaanTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/auth'
import { canSeeMonitoringPekerjaan } from '@/utils/roleChecker'
import { useState } from 'react'

const MonitoringPekerjaan = () => {
    const { user } = useAuth({ middleware: 'auth' })

    const [activeTab, setActiveTab] = useState('igp')

    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {/* <MonitoringPekerjaanTable /> */}
                        {canSeeMonitoringPekerjaan(user) ? (
                            <Tabs
                                orientation="vertical"
                                defaultValue="igp"
                                value={activeTab}
                                onValueChange={value => {
                                    setActiveTab(value)
                                }}
                                className="space-y-4">
                                <div className="w-full overflow-x-auto pb-2">
                                    <TabsList>
                                        <TabsTrigger value="all">
                                            All
                                        </TabsTrigger>
                                        <TabsTrigger value="igp">
                                            IGP
                                        </TabsTrigger>
                                        <TabsTrigger value="bcp">
                                            BCP
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                {activeTab === 'all' ? (
                                    <MonitoringPekerjaanTable />
                                ) : (
                                    <MonitoringPekerjaanTable
                                        department={activeTab}
                                    />
                                )}
                            </Tabs>
                        ) : (
                            'You have no access to see this page'
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonitoringPekerjaan
