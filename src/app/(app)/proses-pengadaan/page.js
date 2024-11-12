import ProsesPengadaanTable from '@/components/proses-pengadaan/ProsesPengadaanTable'

const ProsesPengadaan = () => {
    return (
        <div className="py-12">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <ProsesPengadaanTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProsesPengadaan
