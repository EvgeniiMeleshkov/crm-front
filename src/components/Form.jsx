import api from '@/lib/api'
import parse from '@/lib/form2json'

export default
function Form (props) {
  async function onSubmit (evt) {
    evt.preventDefault()
    const payload = parse(evt.target)
    try {
      const res = await api[props.action](payload)
      if (props.action === 'recovery') {
        if (res === 'success') {
          location.replace('/notification')
          return
        }
      }
      props.callback(res)
      location.replace(props.redirect)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {props.children}
    </form>
  )
}
