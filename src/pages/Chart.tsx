import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import '../styles/global.scss'

const Chart = () => {
  const stores = useSelector((state: RootState) => state.stores.stores)
  const skus = useSelector((state: RootState) => state.skus.skus)

  const chartData = stores.map((store) => ({
    store: store.name,
    gmDollars: skus.reduce((acc, sku) => acc + sku.price * 100, 0),
    gmPercent: skus.length ? Math.random() * 100 : 0,
  }))

  return (
    <div className="main-content">
      <h2>GM Performance Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="store" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gmDollars" fill="#1976d2" />
          <Bar dataKey="gmPercent" fill="#ff9800" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
