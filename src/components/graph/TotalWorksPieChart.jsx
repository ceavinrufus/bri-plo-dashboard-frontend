import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts'

const TotalWorksPieChart = ({ metrics }) => {
    // Data for the pie chart
    const pieData = [
        { name: 'Completed', value: metrics.totalCompletedWorks },
        {
            name: 'Not Completed',
            value: metrics.totalWorks - metrics.totalCompletedWorks,
        },
    ]

    // Colors for the pie chart slices
    const COLORS = ['#00C49F', '#FF8042']

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50} // Adjust for donut
                    outerRadius={80}
                    fill="#8884d8"
                    label>
                    {pieData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry, index) => (
                        <span>{`${value}: ${((pieData[index].value * 100) / metrics.totalWorks).toFixed(2)}%`}</span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default TotalWorksPieChart
