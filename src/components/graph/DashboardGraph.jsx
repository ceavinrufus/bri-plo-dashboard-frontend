import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import TotalWorksPieChart from './TotalWorksPieChart'
import ProsesPengadaanBarChart from './ProsesPengadaanBarChart'
import JatuhTempoPieChart from './JatuhTempoPieChart'

const DashboardGraph = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-7">
            <Card className="col-span-1 xl:col-span-2">
                <CardHeader>
                    <CardTitle>Persentase Pekerjaan Selesai</CardTitle>
                    <CardDescription>
                        Total: {metrics.pengadaan.totalWorks}
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <TotalWorksPieChart metrics={metrics.pengadaan} />
                </CardContent>
            </Card>
            <Card className="col-span-1 xl:col-span-2">
                <CardHeader>
                    <CardTitle>Jatuh Tempo SPK</CardTitle>
                    <CardDescription>
                        Total: {metrics.pekerjaan.totalWorks}
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <JatuhTempoPieChart metrics={metrics.pekerjaan} />
                </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-2 xl:col-span-3">
                <CardHeader>
                    <CardTitle>Proses Pengadaan yang Belum Selesai</CardTitle>
                    <CardDescription>
                        Total:{' '}
                        {metrics.pengadaan.totalWorks -
                            metrics.pengadaan.totalCompletedWorks}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProsesPengadaanBarChart
                        counts={metrics.pengadaan.prosesPengadaanCounts}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardGraph
