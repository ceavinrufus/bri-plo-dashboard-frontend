'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { Toaster } from '@/components/ui/toaster'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apolloClient'
import { PengadaanProvider } from '@/components/context/PengadaanContext'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    // const mockUser = {name: '', email:''};
    return (
        <main className="min-h-screen bg-gray-100">
            {/* <Navigation user={mockUser} /> */}
            <Navigation user={user} />

            <ApolloProvider client={client}>
                <PengadaanProvider>
                    <div>{children}</div>
                </PengadaanProvider>
            </ApolloProvider>
            <Toaster />
        </main>
    )
}

export default AppLayout
