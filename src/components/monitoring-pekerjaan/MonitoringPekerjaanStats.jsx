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
import PekerjaanGraph from '../graph/PekerjaanGraph'

export function MonitoringPekerjaanStats({ metrics }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Stats</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full">
                    <DrawerHeader>
                        <DrawerTitle>Statistik pekerjaan</DrawerTitle>
                        <DrawerDescription>
                            Anda bisa mengganti filter yang ada untuk melihat
                            statistik yang berbeda
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="mx-4 gap-4">
                        <PekerjaanGraph metrics={metrics} />
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
