import { fetchProjectData } from '@/lib/actions'
import React, { createContext, useEffect, useState } from 'react'

// Create the context
export const ProjectContext = createContext()

// Create a provider component
export const ProjectProvider = ({ children }) => {
    const [projectData, setProjectData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchProjectData()
                setProjectData(response.data)
            } catch (err) {
                console.error(err)
            }
        }

        loadData()
    }, [])

    // Add a new project
    const addProject = newProject => {
        setProjectData(prevData => [...prevData, newProject])
    }

    // Remove a project
    const removeProject = id => {
        setProjectData(prevData =>
            prevData.filter(project => project.id !== id),
        )
    }

    // Update an existing project
    const updateProject = (id, updatedFields) => {
        setProjectData(prevData =>
            prevData.map(project =>
                project.id === id ? { ...project, ...updatedFields } : project,
            ),
        )
    }

    return (
        <ProjectContext.Provider
            value={{
                projectData,
                addProject,
                removeProject,
                updateProject,
                setProjectData,
            }}>
            {children}
        </ProjectContext.Provider>
    )
}
