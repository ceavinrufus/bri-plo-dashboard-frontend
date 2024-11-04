'use client'

import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardMetrics from '@/components/DashboardMetrics'
import { fetchDepartmentData } from '@/lib/actions'
import DashboardGraph from '@/components/DashboardGraph'

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

    useEffect(() => {
        const fetchData = async () => {
            const departmentsData = await fetchDepartmentData()
            const departmentCodes = departmentsData.flatMap(
                department => department.code,
            )

            const getTargetByCode = code => {
                const targetObj = departmentsData.find(
                    target => target.code === code,
                )
                return targetObj ? targetObj.target : null
            }

            const results = await Promise.all(
                departmentCodes.map(department =>
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
                newMetrics[departmentCodes[index]] = {
                    ...departmentMetrics,
                    target: getTargetByCode(departmentCodes[index]),
                }
                allData.push(...departmentData)
            })
            const allMetrics = calculateMetrics(allData)
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
                        <DashboardGraph metrics={metrics.all} />
                    </TabsContent>
                    <TabsContent value="bcp" className="space-y-4">
                        <DashboardMetrics metrics={metrics.bcp} />
                        <DashboardGraph metrics={metrics.bcp} />
                    </TabsContent>
                    <TabsContent value="igp" className="space-y-4">
                        <DashboardMetrics metrics={metrics.igp} />
                        <DashboardGraph metrics={metrics.igp} />
                    </TabsContent>
                    <TabsContent value="psr" className="space-y-4">
                        <DashboardMetrics metrics={metrics.psr} />
                        <DashboardGraph metrics={metrics.psr} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Dashboard
