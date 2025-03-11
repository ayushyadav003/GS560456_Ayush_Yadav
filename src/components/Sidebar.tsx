import { Link, useLocation } from 'react-router-dom'
import { sidebar } from '../utils/appUtils'
import '../styles/components/sidebar.scss'

const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="sidebar">
      {sidebar.map((listItem, i) => (
        <Link to={listItem.route} key={i}>
          <div
            className={listItem.route === location.pathname ? 'selected' : ''}
          >
            {listItem.icon}
            <p>{listItem.title}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
