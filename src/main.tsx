import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import store from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
