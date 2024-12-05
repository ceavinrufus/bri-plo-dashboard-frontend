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
export const fetchPengadaanData = async department => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.get(
            `${backendUrl}/api/pengadaan/${department}`,
        )

        // Return the data from the response
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
        throw error
    }
}

// Define the function to fetch data
export const getDataByNomorSPK = async nomor_spk => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.get(
            `${backendUrl}/api/pengadaan/nomor_spk/${nomor_spk}`,
        )

        // Return the data from the response
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
        throw error
    }
}

// Define the function to post project data
export const postProjectData = async data => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.post(
            `${backendUrl}/api/project/store`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error posting project data:', error)
        throw error
    }
}

// Define the function to update project data
export const updateProjectData = async (projectId, data) => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.put(
            `${backendUrl}/api/project/update/${projectId}`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error updating project data:', error)
        throw error
    }
}

// Define the function to delete project data
export const deleteProjectData = async projectId => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request to delete the project
        const response = await axios.delete(
            `${backendUrl}/api/project/delete/${projectId}`,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error deleting project data:', error)
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

// Define the function to fetch department data
export const fetchDepartmentData = async () => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.get(`${backendUrl}/api/department`)

        // Return the data from the response
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error fetching department data:', error)
        throw error
    }
}

// Define the function to post department data
export const postDepartmentData = async data => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.post(
            `${backendUrl}/api/department/store`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error posting department data:', error)
        throw error
    }
}

// Define the function to update department data
export const updateDepartmentData = async (departmentCode, data) => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.put(
            `${backendUrl}/api/department/update/${departmentCode}`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error updating department data:', error)
        throw error
    }
}

// Define the function to delete department data
export const deleteDepartmentData = async departmentCode => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request to delete the department
        const response = await axios.delete(
            `${backendUrl}/api/department/delete/${departmentCode}`,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error deleting department data:', error)
        throw error
    }
}

// Define the function to fetch hari libur data
export const fetchHariLiburData = async () => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.get(`${backendUrl}/api/hari-libur`)

        // Return the data from the response
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error fetching hari libur data:', error)
        throw error
    }
}

// Define the function to post hari libur data
export const postHariLiburData = async data => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.post(
            `${backendUrl}/api/hari-libur/store`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error posting hari libur data:', error)
        throw error
    }
}

// Define the function to update hari libur data
export const updateHariLiburData = async (hariLiburId, data) => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request
        const response = await axios.put(
            `${backendUrl}/api/hari-libur/update/${hariLiburId}`,
            data,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error updating hari libur data:', error)
        throw error
    }
}

// Define the function to delete hari libur data
export const deleteHariLiburData = async hariLiburId => {
    try {
        // Get the backend URL from environment variables
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        // Make the API request to delete the hari libur
        const response = await axios.delete(
            `${backendUrl}/api/hari-libur/delete/${hariLiburId}`,
        )

        // Return the response data
        return response.data
    } catch (error) {
        // Handle errors
        console.error('Error deleting hari libur data:', error)
        throw error
    }
}
