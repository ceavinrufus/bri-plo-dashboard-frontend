import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import TotalWorksPieChart from './graph/TotalWorksPieChart'
import ProsesPengadaanBarChart from './graph/ProsesPengadaanBarChart'
import DashboardGraph from './DashboardGraph'

export function ProsesPengadaanStats({ metrics }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Stats</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full">
                    <DrawerHeader>
                        <DrawerTitle>Statistik pengadaan</DrawerTitle>
                        <DrawerDescription>
                            Statistik pengadaan
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="mx-4 gap-4">
                        <DashboardGraph metrics={metrics} />
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
