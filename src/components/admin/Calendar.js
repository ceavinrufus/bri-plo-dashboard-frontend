'use client'

import React, { useState, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { fetchHariLiburData } from '@/lib/actions'

const Calendar = () => {
    const currentDate = new Date()
    const [holidays, setHolidays] = useState([])
    const [datesWithEvents, setDatesWithEvents] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
    const [selectedDate, setSelectedDate] = useState(
        `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate
            .getDate()
            .toString()
            .padStart(2, '0')}`,
    )
    const [hoveredDate, setHoveredDate] = useState(null)

    // Fungsi untuk mengubah format tanggal menjadi hanya hari dan bulan/tahun
    const formatDate = dateString => {
        return new Date(dateString).toISOString().split('T')[0] // Format YYYY-MM-DD
    }

    // Fungsi untuk menghasilkan kalender
    const generateCalendar = () => {
        const startOfMonth = new Date(selectedYear, selectedMonth, 1)
        const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0)

        const calendarDays = []
        const firstDayOfMonth = startOfMonth.getDay()
        const lastDateOfMonth = endOfMonth.getDate()

        // Menambahkan blank space untuk hari pertama bulan (misalnya jika bulan dimulai dari hari Rabu)
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(null)
        }

        // Menambahkan semua tanggal bulan yang aktif
        for (let date = 1; date <= lastDateOfMonth; date++) {
            calendarDays.push(date)
        }

        return calendarDays
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchHariLiburData()
                const holidays = response.data

                // Menyaring dan mempersiapkan tanggal dengan event (cuti bersama)
                const eventDates = holidays.flatMap(event => {
                    const start = new Date(event.tanggal_mulai)
                    const end = new Date(event.tanggal_selesai)
                    const dates = []

                    // Menambahkan semua tanggal antara tanggal mulai dan selesai
                    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                        dates.push(formatDate(d))
                    }

                    return dates.map(date => ({
                        date,
                        keterangan: event.keterangan,
                    }))
                })

                setDatesWithEvents(eventDates)
                console.log('Hari libur data:', holidays)
            } catch (error) {
                console.error('Error fetching hari libur data:', error)
                throw error
            }
        }
        fetchData()
    }, [])

    // Mendapatkan semua tanggal yang ada di bulan yang aktif
    const calendarDays = generateCalendar()

    // Menangani perubahan bulan dan tahun dengan dropdown
    const handleMonthChange = value => {
        setSelectedMonth(value)
    }

    const handleYearChange = value => {
        setSelectedYear(value)
    }

    // Menangani navigasi prev/next
    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11)
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedMonth(selectedMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0)
            setSelectedYear(selectedYear + 1)
        } else {
            setSelectedMonth(selectedMonth + 1)
        }
    }

    // Menangani pemilihan tanggal dan menampilkan event
    const handleDateClick = day => {
        const selected = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`

        setSelectedDate(selected)
    }

    // Menyaring event yang sesuai dengan tanggal yang dipilih
    const eventsForSelectedDate = datesWithEvents.filter(
        event => event.date === selectedDate,
    )

    // Calculate the current year
    const currentYear = new Date().getFullYear()

    // Generate the year array from 2 years ago to 2 years in the future
    const yearArray = Array.from(
        { length: 5 },
        (_, index) => currentYear - 2 + index,
    )

    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex space-x-4">
            {/* Kalender */}
            <div className="w-2/3">
                {/* Dropdown untuk memilih bulan dan tahun */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handlePrevMonth}
                        className="text-lg font-semibold text-gray-700">
                        &lt; Prev
                    </button>
                    <div className="flex space-x-4">
                        {/* Month Select */}
                        <Select
                            onValueChange={handleMonthChange}
                            value={selectedMonth}>
                            <SelectTrigger className="p-2 border border-gray-300 rounded-md">
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                ].map((month, index) => (
                                    <SelectItem key={index} value={index}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Year Select */}
                        <Select
                            onValueChange={handleYearChange}
                            value={selectedYear}>
                            <SelectTrigger className="p-2 border border-gray-300 rounded-md">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {yearArray.map(year => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <button
                        onClick={handleNextMonth}
                        className="text-lg font-semibold text-gray-700">
                        Next &gt;
                    </button>
                </div>

                {/* Kalender */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Header nama hari */}
                    <div className="text-center font-bold">Sun</div>
                    <div className="text-center font-bold">Mon</div>
                    <div className="text-center font-bold">Tue</div>
                    <div className="text-center font-bold">Wed</div>
                    <div className="text-center font-bold">Thu</div>
                    <div className="text-center font-bold">Fri</div>
                    <div className="text-center font-bold">Sat</div>

                    {/* Tanggal Kalender */}
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`text-center py-2 ${day ? 'cursor-pointer' : 'text-transparent'}`}
                            onMouseEnter={() => day && setHoveredDate(day)}
                            onMouseLeave={() => setHoveredDate(null)}
                            onClick={() => day && handleDateClick(day)}>
                            {day && (
                                <div
                                    className={`relative rounded-full p-2 ${
                                        datesWithEvents.some(
                                            event =>
                                                event.date ===
                                                `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day
                                                    .toString()
                                                    .padStart(2, '0')}`,
                                        )
                                            ? 'bg-red-500 text-white'
                                            : ''
                                    }`}>
                                    {day}
                                    {hoveredDate === day && (
                                        <div className="absolute top-0 right-0 bg-black text-white text-xs p-1 rounded-md">
                                            {datesWithEvents.includes(
                                                `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
                                            ) && 'Event: Cuti bersama'}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar untuk menampilkan event */}
            <div className="w-1/3 border-l pl-4">
                {selectedDate && (
                    <div>
                        <h2 className="text-lg font-semibold">
                            Event on {selectedDate}
                        </h2>
                        <ul className="mt-2">
                            {eventsForSelectedDate.length > 0 ? (
                                eventsForSelectedDate.map((event, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-100 p-2 my-2 rounded-md">
                                        <p>{event.keterangan}</p>
                                    </li>
                                ))
                            ) : (
                                <p>No events</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Calendar
