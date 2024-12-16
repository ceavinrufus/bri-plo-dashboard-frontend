import React, { createContext, useState } from 'react'

// Create the context
export const PembayaranContext = createContext()

// Create a provider component
export const PembayaranProvider = ({ children }) => {
    const [pembayaranData, setPembayaranData] = useState([])

    const addPembayaran = newData => {
        setPembayaranData([...pembayaranData, newData])
    }

    const removePembayaran = id => {
        setPembayaranData(pembayaranData.filter(data => data.id !== id))
    }

    const updatePembayaran = (id, updatedFields) => {
        setPembayaranData(
            pembayaranData.map(data =>
                data.id === id ? { ...data, ...updatedFields } : data,
            ),
        )
    }

    return (
        <PembayaranContext.Provider
            value={{
                pembayaranData,
                addPembayaran,
                removePembayaran,
                updatePembayaran,
                setPembayaranData,
            }}>
            {children}
        </PembayaranContext.Provider>
    )
}
