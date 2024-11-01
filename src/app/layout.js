// import { Plus_Jakarta_Sans } from 'next/font/google'
import '@/app/global.css'
import { Toaster } from '@/components/ui/toaster'

// const font = Plus_Jakarta_Sans({
//     subsets: ['latin'],
//     display: 'swap',
// })

const RootLayout = ({ children }) => {
    return (
        <html
            lang="en"
            // className={font.className}
        >
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
