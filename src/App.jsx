import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import Profile from '@/pages/Profile'
import Header from '@/pages/Header'
import Notification from '@/pages/Notification'
import Customers from '@/pages/Customers'
import API from '@/lib/api.js'
import clear from '@/lib/clear.js'
import Chat from './pages/Chat'

function Protected () {
  const [user, setUser] = useState({})
  const [customer, setCustomer] = useState({})
  const [ticket, setTicket] = useState({})

  useEffect(() => {
    API.me()
      .then(setUser)
      .catch(clear)
  }, [])

  function toChat (customer, ticket) {
    setCustomer(customer)
    setTicket(ticket)
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/profile' element={<Profile toChat={toChat} user={user} />} />
        <Route path='/customers' element={<Customers toChat={toChat} />} />
        <Route
          path='/chat'
          element={
            <Chat
              customer={customer}
              ticket={ticket}
              user={user}
            />
          }
        />
      </Routes>
    </>
  )
}

function Unprotected () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/login' element={LoginPage} />
        <Route path='/register' element={RegisterPage} />
        <Route path='/notification' element={<Notification />} />
      </Routes>
    </>
  )
}

export {
  Protected,
  Unprotected
}
