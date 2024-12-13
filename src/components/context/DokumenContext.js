import React, { createContext, useState } from 'react'

// Create the context
export const DokumenContext = createContext()

export const DocumentType = {
    SPK: 'spk',
    JAMINAN: 'jaminan',
    PERJANJIAN: 'perjanjian',
}

// Create a provider component
export const DokumenProvider = ({ children }) => {
    const [dokumenData, setDokumenData] = useState([])

    const addDokumen = newData => {
        setDokumenData([...dokumenData, newData])
    }

    const removeDokumen = id => {
        setDokumenData(dokumenData.filter(data => data.id !== id))
    }

    const updateDokumen = (id, updatedFields) => {
        setDokumenData(
            dokumenData.map(data =>
                data.id === id ? { ...data, ...updatedFields } : data,
            ),
        )
    }

    return (
        <DokumenContext.Provider
            value={{
                dokumenData,
                addDokumen,
                removeDokumen,
                updateDokumen,
                setDokumenData,
            }}>
            {children}
        </DokumenContext.Provider>
    )
}
