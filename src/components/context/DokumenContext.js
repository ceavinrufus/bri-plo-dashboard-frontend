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
    const [dokumenSPKData, setDokumenSPKData] = useState([])
    const [dokumenPerjanjianData, setDokumenPerjanjianData] = useState([])
    const [dokumenJaminanData, setDokumenJaminanData] = useState([])

    const addDokumenSPK = newData => {
        setDokumenSPKData([...dokumenSPKData, newData])
    }

    const removeDokumenSPK = id => {
        setDokumenSPKData(dokumenSPKData.filter(data => data.id !== id))
    }

    const updateDokumenSPK = (id, updatedFields) => {
        setDokumenSPKData(
            dokumenSPKData.map(data =>
                data.id === id ? { ...data, ...updatedFields } : data,
            ),
        )
    }

    const addDokumenPerjanjian = newData => {
        setDokumenPerjanjianData([...dokumenPerjanjianData, newData])
    }

    const removeDokumenPerjanjian = id => {
        setDokumenPerjanjianData(
            dokumenPerjanjianData.filter(data => data.id !== id),
        )
    }

    const updateDokumenPerjanjian = (id, updatedFields) => {
        setDokumenPerjanjianData(
            dokumenPerjanjianData.map(data =>
                data.id === id ? { ...data, ...updatedFields } : data,
            ),
        )
    }

    const addDokumenJaminan = newData => {
        setDokumenJaminanData([...dokumenJaminanData, newData])
    }

    const removeDokumenJaminan = id => {
        setDokumenJaminanData(dokumenJaminanData.filter(data => data.id !== id))
    }

    const updateDokumenJaminan = (id, updatedFields) => {
        setDokumenJaminanData(
            dokumenJaminanData.map(data =>
                data.id === id ? { ...data, ...updatedFields } : data,
            ),
        )
    }

    return (
        <DokumenContext.Provider
            value={{
                dokumenSPKData,
                dokumenPerjanjianData,
                dokumenJaminanData,
                addDokumenSPK,
                removeDokumenSPK,
                updateDokumenSPK,
                setDokumenSPKData,
                addDokumenPerjanjian,
                removeDokumenPerjanjian,
                updateDokumenPerjanjian,
                setDokumenPerjanjianData,
                addDokumenJaminan,
                removeDokumenJaminan,
                updateDokumenJaminan,
                setDokumenJaminanData,
            }}>
            {children}
        </DokumenContext.Provider>
    )
}
