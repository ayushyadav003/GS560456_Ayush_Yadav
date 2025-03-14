import { Route, Routes } from 'react-router-dom'
import Dashboard from '../layout/Dashboard'
import Stores from '../pages/Stores'
import SKUs from '../pages/SKUs'
import Chart from '../pages/Chart'
import Planning from '../pages/Planning'
import LoginPopup from '../pages/Login'

export default function index() {
  return (
    <Routes>
      <Route path="/" element={<LoginPopup />} />
      <Route
        path="/store"
        element={
          <Dashboard>
            <Stores />
          </Dashboard>
        }
      />
      <Route
        path="/sku"
        element={
          <Dashboard>
            <SKUs />
          </Dashboard>
        }
      />
      <Route
        path="/planning"
        element={
          <Dashboard>
            <Planning />
          </Dashboard>
        }
      />
      <Route
        path="/chart"
        element={
          <Dashboard>
            <Chart />
          </Dashboard>
        }
      />
    </Routes>
  )
}
