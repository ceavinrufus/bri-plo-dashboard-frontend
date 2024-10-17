import Header from '@/app/(app)/Header'
import ProsesPengadaanTable from '@/components/ProsesPengadaanTable'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const ProsesPengadaan = () => {
    return (
        <>
            <Header title="Proses Pengadaan" />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <ProsesPengadaanTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProsesPengadaan
