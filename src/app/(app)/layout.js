'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { Toaster } from '@/components/ui/toaster'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <main className="min-h-screen bg-gray-100">
            {/* <Navigation user={mockUser} /> */}
            <Navigation user={user} />

            <div>{children}</div>
            <Toaster />
        </main>
    )
}

export default AppLayout
