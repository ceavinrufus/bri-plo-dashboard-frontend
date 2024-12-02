'use client'

import ProsesPengadaanTable from '@/components/proses-pengadaan/ProsesPengadaanTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/auth'
import { canCheckAllPengadaanData } from '@/utils/roleChecker'

const ProsesPengadaan = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {canCheckAllPengadaanData(user.role) ? (
                            <Tabs
                                orientation="vertical"
                                defaultValue="all"
                                className="space-y-4">
                                <div className="w-full overflow-x-auto pb-2">
                                    <TabsList>
                                        <TabsTrigger value="all">
                                            All
                                        </TabsTrigger>
                                        <TabsTrigger value="bcp">
                                            BCP
                                        </TabsTrigger>
                                        <TabsTrigger value="igp">
                                            IGP
                                        </TabsTrigger>
                                        <TabsTrigger value="psr">
                                            PSR
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="all" className="space-y-4">
                                    <ProsesPengadaanTable />
                                </TabsContent>
                                <TabsContent value="bcp" className="space-y-4">
                                    <ProsesPengadaanTable departemen={'bcp'} />
                                </TabsContent>
                                <TabsContent value="igp" className="space-y-4">
                                    <ProsesPengadaanTable departemen={'igp'} />
                                </TabsContent>
                                <TabsContent value="psr" className="space-y-4">
                                    <ProsesPengadaanTable departemen={'psr'} />
                                </TabsContent>
                            </Tabs>
                        ) : (
                            <ProsesPengadaanTable
                                departemen={user.departemen}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProsesPengadaan
