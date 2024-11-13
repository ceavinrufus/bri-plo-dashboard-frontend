import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

const MetricContent = ({ value, target }) => {
    const textColorByValue = () => {
        if (value > target) {
            return 'text-green-600'
        } else if (value < target) {
            return 'text-red-500'
        }
    }

    return (
        <CardContent>
            <div className={cn('text-2xl font-bold', textColorByValue())}>
                {value}%
            </div>
            {target && (
                <>
                    <p className="text-xs text-muted-foreground">
                        Target: {target}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Rasio dengan target: {(value / target).toFixed(2)}%
                    </p>
                </>
            )}
        </CardContent>
    )
}

const DashboardMetrics = ({ metrics }) => {
    return (
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
                <MetricContent
                    value={metrics.costEfficiencyHPS.toFixed(2)}
                    target={metrics.target}
                />
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
                <MetricContent
                    value={metrics.costEfficiencyAnggaran.toFixed(2)}
                    target={metrics.target}
                />
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
                <MetricContent value={metrics.tkdn.toFixed(2)} />
            </Card>
        </div>
    )
}

export default DashboardMetrics
