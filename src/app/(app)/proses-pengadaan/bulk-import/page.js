'use client'

import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const ImportExcelPage = () => {
    const [excelData, setExcelData] = useState([])
    const [columns, setColumns] = useState([])
    const [fileName, setFileName] = useState(null)
    const [importing, setImporting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileUpload = event => {
        const file = event.target.files[0]
        if (!file) return

        setFileName(file.name)
        setSelectedFile(file)
        const reader = new FileReader()

        reader.onload = e => {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })

            // Assuming the first sheet is the one we want
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            // Extract headers and rows
            const [headers, ...rows] = jsonData

            setColumns(headers || [])
            setExcelData(rows || [])
        }

        reader.readAsArrayBuffer(file)
    }

    const handleImport = async () => {
        if (!selectedFile) {
            setError('Please select a file first')
            return
        }

        setImporting(true)
        setError(null)
        setSuccess(false)

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
            const formData = new FormData()
            formData.append('excel_file', selectedFile)

            const response = await axios.post(
                `${backendUrl}/api/pengadaan/import`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true, // Important if using sanctum authentication
                },
            )

            if (response.data.status === 'success') {
                setSuccess(true)
                // Optionally show number of imported records
                const successMessage = `Successfully imported ${response.data.message}`
                setSuccess(successMessage)

                // Clear the form
                setExcelData([])
                setColumns([])
                setFileName(null)
                setSelectedFile(null)
                // Reset file input
                const fileInput = document.querySelector('input[type="file"]')
                if (fileInput) fileInput.value = ''
            } else {
                setError('Import failed: ' + response.data.message)
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                'An error occurred while importing the file.'
            setError(errorMessage)
            console.error(err)
        } finally {
            setImporting(false)
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Import Excel Data</h1>
            <div className="flex flex-col gap-4 mb-4">
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700">
                        Select Excel File
                    </span>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        className="mt-1 block w-full"
                        onChange={handleFileUpload}
                    />
                </label>
            </div>

            {/* Preview section */}
            {columns.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Preview</h2>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((col, index) => (
                                        <th
                                            key={index}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {excelData.slice(0, 5).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((_, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {row[colIndex] || ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {excelData.length > 5 && (
                            <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
                                Showing 5 of {excelData.length} rows
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Import Button */}
            <div className="mt-4">
                <Button
                    onClick={handleImport}
                    disabled={importing || !selectedFile}
                    className="w-full sm:w-auto">
                    {importing ? 'Importing...' : 'Import Excel Data'}
                </Button>
            </div>

            {/* Status Messages */}
            {success && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
        </div>
    )
}

export default ImportExcelPage
