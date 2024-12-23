import { fetchUserData } from '@/lib/actions'
import React, { createContext, useEffect, useState } from 'react'

// Create the context
export const UsersContext = createContext()

// Create a provider component
export const UsersProvider = ({ children }) => {
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchUserData()
                setUsersData(response.data)
            } catch (err) {
                console.error(err)
            }
        }

        loadData()
    }, [])

    // Add a new user
    const addUser = newUser => {
        setUsersData(prevData => [...prevData, newUser])
    }

    // Remove a user
    const removeUser = id => {
        setUsersData(prevData => prevData.filter(user => user.id !== id))
    }

    // Update an existing user
    const updateUser = (id, updatedFields) => {
        setUsersData(prevData =>
            prevData.map(user =>
                user.id === id ? { ...user, ...updatedFields } : user,
            ),
        )
    }

    return (
        <UsersContext.Provider
            value={{
                usersData,
                addUser,
                removeUser,
                updateUser,
                setUsersData,
            }}>
            {children}
        </UsersContext.Provider>
    )
}
