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

interface ChartItem {
  Week: string
  GM_Dollars: number
  Sales_Dollars: number
}

interface ProcessedChartItem {
  week: string
  'GM Dollars': number
  'GM %': number
}

const ChartPage = () => {
  const [chartData, setChartData] = useState<ProcessedChartItem[]>([])

  useEffect(() => {
    const processedData: ProcessedChartItem[] = chart.map(
      (item: ChartItem) => ({
        week: item.Week,
        'GM Dollars': item.GM_Dollars,
        'GM %': Number(
          ((item.GM_Dollars / item.Sales_Dollars) * 100).toFixed(2),
        ),
      }),
    )
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
              tickFormatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value: number) => `${value}%`}
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
