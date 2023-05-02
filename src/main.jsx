import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Protected, Unprotected } from '@/App'
import '@/index.css'

const root = document.querySelector('#root')
const navigate = url => history.pushState(null, null, url)
const path = location.pathname
const search = new URLSearchParams(location.search)
const token = search.get('token')
if (token) localStorage.auth = token

const render = (url, xs) => Component => {
  if (xs.includes(path)) navigate(path)
  else navigate(url)

  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  )
}

const renderLogin = render('/login', ['/login', '/register', '/notification'])
const renderProfile = render('/profile', ['/profile', '/customers'])

if (!localStorage.auth) renderLogin(Unprotected)
else renderProfile(Protected)
