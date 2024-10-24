'use server'

// src/utils/api.ts
import axios from 'axios'

// Define the function to fetch data
export const fetchProjectData = async () => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.get(`${backendUrl}/api/project`)

        // Return the data from the response
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
        throw error
    }
}

// Define the function to fetch data
export const fetchPengadaanData = async () => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.get(`${backendUrl}/api/pengadaan/igp`)

        // Return the data from the response
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
        throw error
    }
}

// Define the function to post data
export const postPengadaanData = async data => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.post(
            `${backendUrl}/api/pengadaan/store`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error posting data:', error)
        throw error
    }
}

// Define the function to update data
export const updatePengadaanData = async (pengadaanId, data) => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.put(
            `${backendUrl}/api/pengadaan/update/${pengadaanId}`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error updating data:', error)
        throw error
    }
}

// Define the function to delete data
export const deletePengadaanData = async pengadaanId => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request to delete the Pengadaan
        const response = await axios.delete(
            `${backendUrl}/api/pengadaan/delete/${pengadaanId}`,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error deleting data:', error)
        throw error
    }
}
