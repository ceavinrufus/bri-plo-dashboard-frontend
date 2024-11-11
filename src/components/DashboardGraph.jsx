import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import TotalWorksPieChart from './graph/TotalWorksPieChart'
import ProsesPengadaanBarChart from './graph/ProsesPengadaanBarChart'

const DashboardGraph = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Persentase Pekerjaan Selesai</CardTitle>
                    <CardDescription>
                        Total: {metrics.totalWorks}
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <TotalWorksPieChart metrics={metrics} />
                </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                    <CardTitle>Proses Pengadaan yang Belum Selesai</CardTitle>
                    <CardDescription>
                        Total:{' '}
                        {metrics.totalWorks - metrics.totalCompletedWorks}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProsesPengadaanBarChart
                        counts={metrics.prosesPengadaanCounts}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardGraph
