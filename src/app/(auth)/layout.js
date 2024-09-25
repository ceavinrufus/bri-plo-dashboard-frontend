import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
    title: 'Laravel',
}

const Layout = ({ children }) => {
    return (
        <main>
            <div className="text-gray-900 antialiased">
                <AuthCard
                    logo={
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </Link>
                    }>
                    {children}
                </AuthCard>
            </div>
            <Toaster />
        </main>
    )
}

export default Layout
