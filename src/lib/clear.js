export default function clear () {
  localStorage.removeItem('auth')
  location.replace('/login')
}
