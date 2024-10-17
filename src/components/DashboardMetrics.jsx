import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts'

const DashboardMetrics = ({ metrics }) => {
    // Data for the pie chart
    const pieData = [
        { name: 'Completed', value: metrics.totalCompletedWorks },
        {
            name: 'Not Completed',
            value: metrics.totalWorks - metrics.totalCompletedWorks,
        },
    ]

    // Colors for the pie chart slices
    const COLORS = ['#00C49F', '#FF8042']

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Cost Efficiency HPS
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {metrics.costEfficiencyHPS.toFixed(2)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Insert Description Here... (Ex: +20.1% from last
                            month)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Cost Efficiency Anggaran
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {metrics.costEfficiencyAnggaran.toFixed(2)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Insert Description Here... (Ex: +20.1% from last
                            month)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Rata-Rata Persentase TKDN
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground">
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {metrics.tkdn.toFixed(2)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Insert Description Here... (Ex: +20.1% from last
                            month)
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                <Card className="col-span-1 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Persentase Pekerjaan Selesai</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50} // Adjust for donut
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label>
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value, entry, index) => (
                                        <span>{`${value}: ${((pieData[index].value * 100) / metrics.totalWorks).toFixed(2)}%`}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Blablabla</CardTitle>
                        <CardDescription>This is description</CardDescription>
                    </CardHeader>
                    <CardContent>Tes</CardContent>
                </Card>
            </div>
        </>
    )
}

export default DashboardMetrics
