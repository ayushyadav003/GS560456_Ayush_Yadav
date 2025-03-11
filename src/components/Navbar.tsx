import { useState } from 'react'
import { Popover } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material'
import '../styles/components/navBar.scss'

export default function TopHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="topHeader">
      <img className="logo" src="/assets/images/logo.svg" />
      <div className="topHeaderInner">
        <span id={popoverId} className="profileDp" onClick={handleOpen}>
          U
        </span>
      </div>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="popoverWrapper">
          <div className="inner">
            <span
              id={popoverId}
              className="profileDp"
              onClick={handleOpen}
              style={{ borderRadius: '5px', margin: '0' }}
            >
              U
            </span>
            <div className="info">
              <p>
                <b>User</b>
              </p>
              <p>user@gmail.com</p>
            </div>
          </div>
          <div className="inner2">
            <p onClick={() => navigate('/profile')}>My Profile</p>
            <p style={{ color: '#f89fa4' }} onClick={() => handleLogout()}>
              <Logout /> Log out
            </p>
          </div>
        </div>
      </Popover>
    </div>
  )
}
