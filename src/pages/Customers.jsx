import { useEffect, useState } from 'react'
import API from '@/lib/api.js'
import Button from '@/components/Button'
import { NavLink } from 'react-router-dom'

export default function Customers (props) {
  const [customers, setCustomers] = useState([])
  const [edit, setEdit] = useState([])

  useEffect(() => {
    API.getCustomers()
      .then(setCustomers)
      .catch(console.log)
  }, [edit])

  function editOn (num) {
    setEdit([...edit, num])
  }

  async function onSubmit (evt, email, idx) {
    evt.preventDefault()
    
    const formData = new FormData(evt.target)
    const obj = Object.fromEntries(formData.entries())
    obj.email = email
    
    const res = await API.projectCreate(JSON.stringify(obj))
    console.log(res)
    
    setEdit(edit.filter(x => x !== idx))
  }

  // function goToChat (customer, ticket) {
  //   props.toChat(()=>({customer, ticket}))
  // }

  return (
    <div className='profile-style'>
      <ul>
        {
        customers.map((customer, idx) => {
          return (
            <div key={idx}>
              <div className='customer-list-item'>
                <div>
                  <li><h3>{customer.firstName} &nbsp; {customer.lastName}</h3></li>
                  <li><h3>{customer.email}</h3></li>
                </div>
                {!edit.includes(idx)
                  ? <Button onClick={() => { editOn(idx) }} className='btn-dark'>Добавить проект</Button>
                  : <div className='project-create-input'>
                    <label 
                      onClick={() => setEdit(edit.filter(x => x !== idx))}
                      className='close-proj'
                      >
                        ❌
                    </label>
                    <form onSubmit={(evt) => onSubmit(evt, customer.email, idx)}
                          // onBlur={() => setEdit(edit.filter(x => x !== idx))}
                    >
                      <input
                        autoFocus={true}
                        placeholder='Название проекта'
                        name='projectName'
                        type='text'
                      />
                      <Button>💾</Button>
                    </form>
                  </div>}
              </div>

              <ul>
                <h4>{customer.projects.length ? 'Проекты' : ''}</h4>
                {customer.projects.map((x, idx) => {
                  return (
                    <li key={idx}>
                      {x.name}
                      <ul>
                        <h4>{x.tickets.length ? 'Правки' : ''}</h4>
                        {x.tickets.map((x, idx) => {
                          return (
                            <li
                              key={idx}
                              onClick={() => props.toChat(customer, x)}
                            >
                              <NavLink to='/chat'>{x.name}</NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}

              </ul>
              <hr />
            </div>
          )
        })
      }
      </ul>
    </div>
  )
}
