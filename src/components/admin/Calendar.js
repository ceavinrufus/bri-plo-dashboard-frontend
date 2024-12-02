'use client'

import React, { useState, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { deleteHariLiburData, fetchHariLiburData } from '@/lib/actions'
import AddEventModal from './AddEventModal'
import EditEventModal from './EditEventModal'
import { toast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { formatDateWithWords, formatDateYMD } from '@/lib/utils'

const Calendar = () => {
    const currentDate = new Date()
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

    const handleAddEvent = newEvent => {
        setDatesWithEvents(prevEvents => [
            ...prevEvents,
            ...Array.from({
                length:
                    1 +
                    (new Date(newEvent.tanggal_selesai) -
                        new Date(newEvent.tanggal_mulai)) /
                        (1000 * 60 * 60 * 24),
            }).map((_, i) => ({
                ...newEvent,
                date: formatDateYMD(
                    new Date(
                        new Date(newEvent.tanggal_mulai).setDate(
                            new Date(newEvent.tanggal_mulai).getDate() + i,
                        ),
                    ),
                ),
                keterangan: newEvent.keterangan,
            })),
        ])
    }

    const handleRemoveEvent = eventId => {
        setDatesWithEvents(prevEvents =>
            prevEvents.filter(event => event.id !== eventId),
        )
    }

    const handleEditEvent = updatedEvent => {
        setDatesWithEvents(prevEvents => [
            ...prevEvents.filter(event => event.id !== updatedEvent.id),
            ...Array.from({
                length:
                    1 +
                    (new Date(updatedEvent.tanggal_selesai) -
                        new Date(updatedEvent.tanggal_mulai)) /
                        (1000 * 60 * 60 * 24),
            }).map((_, i) => ({
                ...updatedEvent,
                date: formatDateYMD(
                    new Date(
                        new Date(updatedEvent.tanggal_mulai).setDate(
                            new Date(updatedEvent.tanggal_mulai).getDate() + i,
                        ),
                    ),
                ),
                keterangan: updatedEvent.keterangan,
            })),
        ])
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
                        dates.push(formatDateYMD(d))
                    }

                    return dates.map(date => ({
                        ...event,
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

    const isEvent = day => {
        const date = `${selectedYear}-${(selectedMonth + 1)
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`

        return datesWithEvents.some(event => event.date === date)
    }

    const isWeekend = day => {
        const date = `${selectedYear}-${(selectedMonth + 1)
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`

        const dayOfWeek = new Date(date).getDay() // 0 = Sunday, 6 = Saturday
        return dayOfWeek == 0 || dayOfWeek == 6
    }
    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex space-x-4">
            {/* Kalender */}
            <div className="flex-1 flex flex-col">
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
                <div className="grid grid-cols-7 gap-2 flex-grow overflow-hidden">
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
                            className={`text-center py-2 ${
                                day ? 'cursor-pointer' : 'text-transparent'
                            }`}
                            onMouseEnter={() => day && setHoveredDate(day)}
                            onMouseLeave={() => setHoveredDate(null)}
                            onClick={() => day && handleDateClick(day)}>
                            {day && (
                                <div
                                    className={`relative rounded-full p-2 ${
                                        isEvent(day)
                                            ? 'bg-red-500 text-white'
                                            : isWeekend(day)
                                              ? 'bg-gray-200'
                                              : ''
                                    }`}>
                                    {day}
                                    {hoveredDate === day && (
                                        <div className="absolute top-0 right-0 bg-black text-white text-xs p-1 rounded-md">
                                            {datesWithEvents.includes(
                                                `${selectedYear}-${(
                                                    selectedMonth + 1
                                                )
                                                    .toString()
                                                    .padStart(
                                                        2,
                                                        '0',
                                                    )}-${day.toString().padStart(2, '0')}`,
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
            <div className="flex-1 border-l pl-4">
                {selectedDate && (
                    <>
                        <h2 className="text-lg font-semibold">
                            Event on {selectedDate}
                        </h2>
                        <div className="flex-1 h-[400px] overflow-y-auto">
                            <div>
                                <ul className="mt-2">
                                    {eventsForSelectedDate.length > 0 ? (
                                        eventsForSelectedDate.map(
                                            (event, index) => (
                                                <li
                                                    key={index}
                                                    className="bg-gray-100 p-2 my-2 rounded-md flex justify-between">
                                                    <div>
                                                        <p>
                                                            {event.keterangan}
                                                        </p>
                                                        <p className="text-gray-500 text-sm">
                                                            {event.tanggal_mulai ===
                                                            event.tanggal_selesai
                                                                ? formatDateWithWords(
                                                                      event.tanggal_mulai,
                                                                  )
                                                                : `${formatDateWithWords(
                                                                      event.tanggal_mulai,
                                                                  )} - ${formatDateWithWords(
                                                                      event.tanggal_selesai,
                                                                  )}`}
                                                        </p>
                                                    </div>
                                                    <Toolbar
                                                        data={event}
                                                        handleRemoveEvent={
                                                            handleRemoveEvent
                                                        }
                                                        handleEditEvent={
                                                            handleEditEvent
                                                        }
                                                    />
                                                </li>
                                            ),
                                        )
                                    ) : (
                                        <p>No events</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                <AddEventModal onAddEvent={handleAddEvent} />
            </div>
        </div>
    )
}

const Toolbar = ({ data, handleRemoveEvent, handleEditEvent }) => {
    const onDelete = async () => {
        try {
            await deleteHariLiburData(data.id)
            console.log(data)
            toast({
                title: 'Success',
                description: 'Data has been deleted successfully!',
                status: 'success',
            })
            handleRemoveEvent(data.id)
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while deleting data.',
                status: 'error',
            })
        }
    }

    return (
        <div className="flex items-center gap-2">
            <EditEventModal data={data} handleEditEvent={handleEditEvent} />
            <Button
                className="py-1 px-2 m-0"
                variant="ghost"
                onClick={onDelete}>
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default Calendar
