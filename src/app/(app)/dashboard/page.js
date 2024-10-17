'use client'

import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import Header from '../Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardMetrics from '@/components/DashboardMetrics'
// export const metadata = {
//     title: 'Laravel - Dashboard',
// }

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            nilai_spk
            anggaran
            hps
            tkdn_percentage
        }
    }
`

const Dashboard = () => {
    const departments = ['bcp', 'igp', 'psr']
    const [metrics, setMetrics] = useState(null)

    const calculateMetrics = data => {
        const totalHPS = data.reduce((sum, item) => sum + item.hps, 0)
        const totalSPK = data.reduce((sum, item) => sum + item.nilai_spk, 0)
        const totalAnggaran = data.reduce((sum, item) => sum + item.anggaran, 0)
        const totalTKDN = data.reduce(
            (sum, item) => sum + item.tkdn_percentage,
            0,
        )
        const countTKDN = data.length

        // Calculate completed works
        const totalCompletedWorks = data.filter(
            item => item.nilai_spk !== null,
        ).length
        const totalWorks = data.length

        return {
            costEfficiencyHPS: totalHPS
                ? ((totalHPS - totalSPK) / totalHPS) * 100
                : 0,
            costEfficiencyAnggaran: totalAnggaran
                ? ((totalAnggaran - totalSPK) / totalAnggaran) * 100
                : 0,
            tkdn: countTKDN ? totalTKDN / countTKDN : 0,
            totalCompletedWorks,
            totalWorks,
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const newMetrics = {}
            for (const department of departments) {
                const { data } = await client.query({
                    query: GET_PENGADAANS,
                    variables: { departemen: department },
                })

                if (data && data.pengadaans) {
                    newMetrics[department] = calculateMetrics(data.pengadaans)
                }
            }
            setMetrics(newMetrics)
        }

        fetchData()
    }, [])

    return (
        <>
            <Header title="Dashboard" />

            {metrics && (
                <div className="py-12">
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <Tabs
                            orientation="vertical"
                            defaultValue="bcp"
                            className="space-y-4">
                            <div className="w-full overflow-x-auto pb-2">
                                <TabsList>
                                    <TabsTrigger value="bcp">BCP</TabsTrigger>
                                    <TabsTrigger value="igp">IGP</TabsTrigger>
                                    <TabsTrigger value="psr">PSR</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="bcp" className="space-y-4">
                                <DashboardMetrics metrics={metrics.bcp} />
                            </TabsContent>
                            <TabsContent value="igp" className="space-y-4">
                                <DashboardMetrics metrics={metrics.igp} />
                            </TabsContent>
                            <TabsContent value="psr" className="space-y-4">
                                <DashboardMetrics metrics={metrics.psr} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard
