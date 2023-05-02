export default function Profile (props) {
  const { user } = props

  return (
    <div className='container'>
      <div className='profile-style'>
        <ul>
          <li><h3>{user.firstName} &nbsp; {user.lastName}</h3></li>
          <li><h3>{user.email}</h3></li>
        </ul>
      </div>
    </div>
  )
}
