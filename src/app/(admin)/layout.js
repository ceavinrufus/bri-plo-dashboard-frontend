'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar'
import { useAuth } from '@/hooks/auth'
import Loading from '../(app)/Loading'

export default function Layout({ children }) {
    const { user } = useAuth({ middleware: 'admin' })

    if (!user) {
        return <Loading />
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
