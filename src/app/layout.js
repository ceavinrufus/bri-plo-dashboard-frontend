import { Nunito } from 'next/font/google'
import '@/app/global.css'
import { Toaster } from '@/components/ui/toaster'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
                {children}
                <Toaster />
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default RootLayout
