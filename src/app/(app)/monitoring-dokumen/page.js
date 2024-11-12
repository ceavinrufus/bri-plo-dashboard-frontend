import MonitoringDokumenSPKTable from '@/components/monitoring-dokumen/MonitoringDokumenSPKTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MonitoringDokumen = () => {
    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <Tabs
                            orientation="vertical"
                            defaultValue="spk"
                            className="space-y-4">
                            <div className="w-full overflow-x-auto pb-2">
                                <TabsList>
                                    <TabsTrigger value="spk">SPK</TabsTrigger>
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
                            <TabsContent
                                value="jaminan"
                                className="space-y-4"></TabsContent>
                            <TabsContent
                                value="perjanjian"
                                className="space-y-4"></TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonitoringDokumen
