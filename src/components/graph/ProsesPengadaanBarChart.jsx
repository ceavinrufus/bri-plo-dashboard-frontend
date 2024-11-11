import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const ProsesPengadaanBarChart = ({ counts }) => {
    // Prepare data in a format recharts can use
    const data = Object.keys(counts).map(key => ({
        name: key,
        count: counts[key],
    }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4bc0c0" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ProsesPengadaanBarChart
