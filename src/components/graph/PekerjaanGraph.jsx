import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import JatuhTempoPieChart from './JatuhTempoPieChart'

const PekerjaanGraph = ({ metrics }) => {
    return (
        <div className="">
            <Card className="">
                <CardHeader>
                    <CardTitle>Jatuh Tempo SPK</CardTitle>
                    <CardDescription>
                        Total: {metrics.totalWorks}
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <JatuhTempoPieChart metrics={metrics} />
                </CardContent>
            </Card>
        </div>
    )
}

export default PekerjaanGraph
