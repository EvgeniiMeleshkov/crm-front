import { useEffect, useState } from "react"
import API from '@/lib/api'
import Button from '@/components/Button'
import { NavLink } from "react-router-dom"

export default function Profile (props) {
  const { user, toChat } = props

  const [projects, setProjects] = useState([])
  const [edit, setEdit] = useState([])

  useEffect(()=>{
    if(user.customer) {
      API.getProjects()
      .then(setProjects)
      .catch(console.error)
    }
  }, [user])

  function editOn (num) {
    setEdit([...edit, num])
  }

  async function onSubmit (evt, id, idx) {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const obj = Object.fromEntries(formData.entries())
    obj.id = id
    console.log(obj)
    const res = await API.ticketCreate(JSON.stringify(obj))
    console.log(res)
    setEdit(edit.filter(x => x !== idx))
  }

  return (
    <div className='container'>
      {user.customer
      ?
      <div className='profile-style'>
        <ul>
          <li><h3>{user.firstName} &nbsp; {user.lastName}</h3></li>
          <li><h3>{user.email}</h3></li>
          <h4>Проекты</h4>
            {
              projects.map(( x, idx ) => {
                return (
                  <div key={idx}>
                    <div className='customer-list-item'>
                      <li key={idx}>{x.name}</li>
                      { !edit.includes(idx)
                        ? <Button onClick={()=>{editOn(idx)}} 
                                  className='btn-dark'>Добавить правку
                          </Button>
                        : 
                          <div className='project-create-input'>
                            <form onSubmit={(evt)=>onSubmit(evt, x._id, idx)}>
                              <input autoFocus='true' 
                                     placeholder='Название правки' 
                                     name='ticketName' 
                                     type='text'/>
                              <input placeholder='Описание' 
                                     name='description' 
                                     type='text'/>
                              <Button>💾</Button>
                            </form>
                          </div>
                      }
                    </div>
                    <div>
                      <ul>
                        {x.tickets.length && x.tickets.map((x, idx) => {
                          return (
                            <div key={idx}>
                              <NavLink to='/chat'>
                                <h5 onClick={()=>toChat(null, x)}>{x.name}</h5>
                              </NavLink>
                              <h6><li>{x.description}</li></h6>
                            </div>      
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                )
              })
            }
        </ul>
      </div>
      :  
      <div className='profile-style'>
        <ul>
          <li><h3>{user.firstName} &nbsp; {user.lastName}</h3></li>
          <li><h3>{user.email}</h3></li>
        </ul>
      </div>
      }
    </div>
  )
}
