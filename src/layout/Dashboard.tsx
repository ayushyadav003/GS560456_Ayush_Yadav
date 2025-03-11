import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

interface DashboardProps {
  children: ReactNode
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="dashboardLayout">
      <Navbar />
      <div className="dashboardContent">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Dashboard
