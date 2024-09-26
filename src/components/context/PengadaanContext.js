import React, { createContext, useState } from 'react'

// Create the context
export const PengadaanContext = createContext()

// Create a provider component
export const PengadaanProvider = ({ children }) => {
    const [pengadaanData, setPengadaanData] = useState([])

    const addPengadaan = newData => {
        setPengadaanData([...pengadaanData, newData])
    }

    const removePengadaan = id => {
        setPengadaanData(pengadaanData.filter(data => data.id !== id))
    }

    const updatePengadaan = (id, updatedFields) => {
        setPengadaanData(
            pengadaanData.map(data =>
                data.id === id ? { ...data, ...updatedFields } : data,
            ),
        )
    }

    return (
        <PengadaanContext.Provider
            value={{
                pengadaanData,
                addPengadaan,
                removePengadaan,
                updatePengadaan,
                setPengadaanData,
            }}>
            {children}
        </PengadaanContext.Provider>
    )
}
