import { useEffect, useState } from 'react'
import API from '@/lib/api.js'

export default function Customers () {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    API.getCustomers()
      .then(setCustomers)
      .catch(console.log)
  }, [])

  console.log(customers)
  return (
    <div className='profile-style'>
      <ul>
        {
        customers.map((x, idx) => {
          return (
            <div>
              <li><h3>{x.firstName} &nbsp; {x.lastName}</h3></li>
              <li><h3>{x.email}</h3></li>
            </div>
          )
        })
      }
      </ul>
    </div>
  )
}
