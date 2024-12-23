'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar'
import { useAuth } from '@/hooks/auth'
import Loading from '../(app)/Loading'
import { Toaster } from '@/components/ui/toaster'
import { UsersProvider } from '@/components/context/UsersContext'

export default function Layout({ children }) {
    const { user } = useAuth({ middleware: 'admin' })

    if (!user) {
        return <Loading />
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <UsersProvider>
                <main className="min-h-screen w-full">
                    <SidebarTrigger />
                    {children}
                </main>
            </UsersProvider>
            <Toaster />
        </SidebarProvider>
    )
}
