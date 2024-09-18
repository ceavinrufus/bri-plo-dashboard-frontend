'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'

const AppLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' })

    // if (!user) {
    //     return <Loading />
    // }

    const mockUser = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={mockUser} />
            {/* <Navigation user={user} /> */}

            <main>{children}</main>
        </div>
    )
}

export default AppLayout
