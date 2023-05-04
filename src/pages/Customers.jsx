import { useEffect, useState } from 'react'
import API from '@/lib/api.js'
import Button from '@/components/Button'
import Input from '@/components/Input'
import parse from '@/lib/form2json'

export default function Customers () {
  const [customers, setCustomers] = useState([])
  const [edit, setEdit] = useState([])

  useEffect(() => {
    API.getCustomers()
      .then(setCustomers)
      .catch(console.log)
  }, [])

  function editOn (num) {
    setEdit([...edit, num])
  }

  async function onSubmit (evt, email, idx) {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const obj = Object.fromEntries(formData.entries())
    obj.email = email
    console.log(obj)
    const res = await API.projectCreate(JSON.stringify(obj))
    console.log(res)
    setEdit(edit.filter(x => x !== idx))
  }

  console.log(customers)
  return (
    <div className='profile-style'>
      <ul>
        {
        customers.map((x, idx) => {
          return (
            <div key={idx}>
              <div className='customer-list-item'>
                <div>
                  <li><h3>{x.firstName} &nbsp; {x.lastName}</h3></li>
                  <li><h3>{x.email}</h3></li>
                </div>
                { !edit.includes(idx)
                ? <Button onClick={()=>{editOn(idx)}} className='btn-dark'>Добавить проект</Button>
                : 
                  <div className='project-create-input'>
                    <form onSubmit={(evt)=>onSubmit(evt, x.email, idx)}>
                      <input placeholder='Название проекта' name='projectName' type='text'/>
                      <Button>💾</Button>
                    </form>
                  </div>
                }
              </div>
              
              <ul>
                  <h4>{x.projects.length ? 'Проекты' : '' }</h4>
                  {x.projects.map((x, idx) => {
                    return (
                      <li key={idx}>{x.name}</li>
                    )
                  })}
                  
              </ul>
              <hr/>
            </div>
          )
        })
      }
      </ul>
    </div>
  )
}
