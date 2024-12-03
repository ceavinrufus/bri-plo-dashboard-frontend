import React, { createContext, useState, useEffect } from 'react'
import { differenceInBusinessDays, isWeekend } from 'date-fns'
import { fetchHariLiburData } from '@/lib/actions'

// Create the context
export const HariLiburContext = createContext()

// Create a provider component
export const HariLiburProvider = ({ children }) => {
    const [hariLiburData, setHariLiburData] = useState([])

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await fetchHariLiburData()
                setHariLiburData(response.data)
            } catch (error) {
                console.error('Error fetching hari libur data:', error)
            }
        }

        fetchData()
    }, [])

    const calculateWorkingDays = (startDate, endDate) => {
        const totalBusinessDays = differenceInBusinessDays(
            new Date(endDate),
            new Date(startDate),
        )

        const holidayCount = getHolidaysBetweenDates(startDate, endDate)
        // console.log('totalBusinessDays', startDate, endDate, holidayCount)
        return totalBusinessDays - holidayCount
    }

    const getHolidaysBetweenDates = (startDate, endDate) => {
        // Parse the input dates into Date objects
        const start = new Date(startDate)
        const end = new Date(endDate)

        // Initialize a counter for the total number of holidays within the date range
        let totalHolidays = 0

        // Iterate over each holiday in hariLiburData
        hariLiburData.forEach(holiday => {
            const holidayStart = new Date(holiday.tanggal_mulai)
            const holidayEnd = new Date(holiday.tanggal_selesai)

            // Adjust holidayStart and holidayEnd to be within the given range
            const validStart = holidayStart > start ? holidayStart : start
            const validEnd = holidayEnd < end ? holidayEnd : end

            // Check if the holiday period overlaps with the given date range
            if (validStart <= validEnd) {
                // Iterate through each day in the overlapping range
                for (
                    let date = new Date(validStart);
                    date <= validEnd;
                    date.setDate(date.getDate() + 1)
                ) {
                    // Check if the current date is a weekend (Saturday or Sunday)
                    if (isWeekend(date)) {
                        totalHolidays++ // Count only weekdays
                    }
                }
            }
        })

        // Return the total number of holidays within the range
        return totalHolidays
    }

    return (
        <HariLiburContext.Provider
            value={{
                hariLiburData,
                calculateWorkingDays,
                setHariLiburData,
            }}>
            {children}
        </HariLiburContext.Provider>
    )
}
