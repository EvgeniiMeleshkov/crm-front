import Button from '@/components/Button'
import Form from '@/components/Form'
import Input from '@/components/Input'
import auth from '@/lib/auth'
import { NavLink } from 'react-router-dom'

export default
  <div className='auth-container'>
    <div className='auth-form'>
      <Form action='login' callback={auth.set(localStorage)} redirect='/'>
        <h1>
          Войти &nbsp;
          <NavLink to='/register'>Регистрация</NavLink>
        </h1>
        <Input type='text' name='email' label='Электронная почта' />

        <Button className='btn-orange'>Войти</Button>
      </Form>
    </div>
  </div>
