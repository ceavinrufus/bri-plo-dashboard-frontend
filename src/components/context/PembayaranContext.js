import { fetchUserDataByTim } from '@/lib/actions'
import React, { createContext, useEffect, useState } from 'react'

// Create the context
export const PembayaranContext = createContext()

// Create a provider component
export const PembayaranProvider = ({ children }) => {
    const [pembayaranData, setPembayaranData] = useState([])
    const [userOptions, setUserOptions] = useState([])

    useEffect(() => {
        const getUserOptions = async () => {
            try {
                const response = await fetchUserDataByTim({ tim: 'psg' })

                const userOptionsMap = response.data
                    ? response.data.map(user => ({
                          value: user.id.toString(),
                          label: user.name,
                      }))
                    : []

                setUserOptions(userOptionsMap)
            } catch (error) {
                console.error('Error fetching user options:', error)
            }
        }

        getUserOptions()
    }, [])

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
                userOptions,
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
