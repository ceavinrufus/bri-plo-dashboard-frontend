'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardMetrics from '@/components/DashboardMetrics'

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            nilai_spk
            anggaran {
                amount
            }
            hps {
                amount
            }
            tkdn_percentage
        }
    }
`

const Dashboard = () => {
    const departments = ['bcp', 'igp', 'psr']
    const [metrics, setMetrics] = useState(null)

    const calculateMetrics = data => {
        const totalHPS = data.reduce(
            (sum, item) => sum + item.hps?.amount || 0,
            0,
        )
        const totalSPK = data.reduce(
            (sum, item) => sum + item.nilai_spk || 0,
            0,
        )
        const totalAnggaran = data.reduce(
            (sum, item) => sum + item.anggaran?.amount || 0,
            0,
        )
        const totalTKDN = data.reduce(
            (sum, item) => sum + (item.tkdn_percentage || 0),
            0,
        )
        const countTKDN = data.filter(
            item => item.tkdn_percentage !== null,
        ).length
        const totalCompletedWorks = data.filter(
            item => item.nilai_spk !== null,
        ).length

        return {
            costEfficiencyHPS: totalHPS
                ? ((totalHPS - totalSPK) / totalHPS) * 100
                : 0,
            costEfficiencyAnggaran: totalAnggaran
                ? ((totalAnggaran - totalSPK) / totalAnggaran) * 100
                : 0,
            tkdn: countTKDN ? totalTKDN / countTKDN : 0,
            totalCompletedWorks,
            totalWorks: data.length,
        }
    }

    const aggregateMetrics = allData => {
        return allData.reduce((acc, data) => {
            Object.keys(data).forEach(key => {
                acc[key] = (acc[key] || 0) + data[key]
            })
            return acc
        }, {})
    }

    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.all(
                departments.map(department =>
                    client.query({
                        query: GET_PENGADAANS,
                        variables: { departemen: department },
                    }),
                ),
            )

            const newMetrics = {}
            const allData = []

            results.forEach((result, index) => {
                const departmentData = result.data?.pengadaans || []
                const departmentMetrics = calculateMetrics(departmentData)
                newMetrics[departments[index]] = departmentMetrics
                allData.push(departmentMetrics)
            })

            const allMetrics = aggregateMetrics(allData)
            setMetrics({ ...newMetrics, all: allMetrics })
        }

        fetchData()
    }, [])

    if (!metrics) return null

    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <Tabs
                    orientation="vertical"
                    defaultValue="all"
                    className="space-y-4">
                    <div className="w-full overflow-x-auto pb-2">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="bcp">BCP</TabsTrigger>
                            <TabsTrigger value="igp">IGP</TabsTrigger>
                            <TabsTrigger value="psr">PSR</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="all" className="space-y-4">
                        <DashboardMetrics metrics={metrics.all} />
                    </TabsContent>
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
    )
}

export default Dashboard
