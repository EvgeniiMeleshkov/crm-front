import { NavLink } from 'react-router-dom'
import Button from '@/components/Button'
import clear from '@/lib/clear.js'

export default function Header () {
  return (
    <div className='header'>
      <div>
      {localStorage.auth &&
        <>
          <NavLink to='/profile'>Профиль</NavLink>
          <NavLink to='/customers'>Клиенты</NavLink>
        </>
      }  
      </div>
      <div className='btn-group'>
        
        {localStorage.auth && <Button onClick={clear} className='btn-header'>Выход</Button>}
      </div>
    </div>
  )
}
