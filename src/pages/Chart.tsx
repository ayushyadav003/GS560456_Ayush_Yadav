import { useState, useEffect } from 'react'
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
} from 'recharts'
import { chart } from '../utils/appUtils'
import '../styles/pages/chart.scss'

const ChartPage = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const processedData = chart.map((item) => ({
      week: item.Week,
      'GM Dollars': item.GM_Dollars,
      'GM %': ((item.GM_Dollars / item.Sales_Dollars) * 100).toFixed(2),
    }))
    setChartData(processedData)
  }, [])

  return (
    <div className="chart-container">
      <div className="recharts-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={chartData}>
            <XAxis dataKey="week" />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar yAxisId="left" dataKey="GM Dollars" fill="#8884d8" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="GM %"
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartPage
