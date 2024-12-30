'use client'

import React, { useState, useEffect, useContext } from 'react'
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardMetrics from '@/components/graph/DashboardMetrics'
import { fetchDepartmentData } from '@/lib/actions'
import DashboardGraph from '@/components/graph/DashboardGraph'
import { calculateJatuhTempoMetrics, calculateMetrics } from '@/lib/utils'
import { PieChart, Pie, Tooltip } from 'recharts'
import { HariLiburContext } from '@/components/context/HariLiburContext'

const GET_PENGADAANS = gql`
    query GetPengadaans($departemen: String!) {
        pengadaans(departemen: $departemen) {
            id
            spk_investasi {
                rate
                amount
            }
            spk_eksploitasi {
                rate
                amount
            }
            anggaran_investasi {
                rate
                amount
            }
            anggaran_eksploitasi {
                rate
                amount
            }
            hps {
                rate
                amount
            }
            proses_pengadaan
            tkdn_percentage
        }
    }
`

const GET_PEKERJAANS = gql`
    query GetPekerjaans($department: String) {
        dokumen_spks(department: $department) {
            id
            jatuh_tempos {
                id
                keterangan
                tanggal_mulai
                tanggal_akhir
            }
            is_pekerjaan_selesai
        }
    }
`

const Dashboard = () => {
    const [metrics, setMetrics] = useState(null)
    const { calculateWorkingDays } = useContext(HariLiburContext)

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

            const pengadaansResults = await Promise.all(
                departmentCodes.map(department =>
                    client.query({
                        query: GET_PENGADAANS,
                        variables: { departemen: department },
                    }),
                ),
            )

            const pekerjaansResults = await Promise.all(
                departmentCodes.map(department =>
                    client.query({
                        query: GET_PEKERJAANS,
                        variables: { department: department },
                    }),
                ),
            )

            const newMetrics = {}
            const allPengadaanData = []
            const allPekerjaanData = []

            pengadaansResults.forEach((result, index) => {
                const departmentData = result.data?.pengadaans || []
                const departmentMetrics = calculateMetrics(departmentData)
                newMetrics[departmentCodes[index]] = {
                    pengadaan: {
                        ...departmentMetrics,
                        target: getTargetByCode(departmentCodes[index]),
                    },
                }
                allPengadaanData.push(...departmentData)
            })

            pekerjaansResults.forEach((result, index) => {
                const departmentData = result.data?.dokumen_spks || []
                const departmentMetrics = calculateJatuhTempoMetrics(
                    departmentData,
                    calculateWorkingDays,
                )
                newMetrics[departmentCodes[index]] = {
                    ...newMetrics[departmentCodes[index]],
                    pekerjaan: {
                        ...departmentMetrics,
                    },
                }
                allPekerjaanData.push(...departmentData)
            })

            const allPengadaanMetrics = calculateMetrics(allPengadaanData)
            const allPekerjaanMetrics = calculateJatuhTempoMetrics(
                allPekerjaanData,
                calculateWorkingDays,
            )

            setMetrics({
                ...newMetrics,
                all: {
                    pekerjaan: allPekerjaanMetrics,
                    pengadaan: allPengadaanMetrics,
                },
            })
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
                        <DashboardMetrics metrics={metrics.all.pengadaan} />
                        <DashboardGraph metrics={metrics.all} />
                    </TabsContent>
                    <TabsContent value="bcp" className="space-y-4">
                        <DashboardMetrics metrics={metrics.bcp.pengadaan} />
                        <DashboardGraph metrics={metrics.bcp} />
                    </TabsContent>
                    <TabsContent value="igp" className="space-y-4">
                        <DashboardMetrics metrics={metrics.igp.pengadaan} />
                        <DashboardGraph metrics={metrics.igp} />
                    </TabsContent>
                    <TabsContent value="psr" className="space-y-4">
                        <DashboardMetrics metrics={metrics.psr.pengadaan} />
                        <DashboardGraph metrics={metrics.psr} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Dashboard
