import { useState, useRef, useEffect } from 'react'
import Message from '@/pages/Message.jsx'
import api from '../lib/api'

export default function Chat (props) {
  
  const { user, customer, ticket } = props
  const scrollToRef = useRef(null)

  const [messages, setMessages] = useState([])

  useEffect(()=> {
    api.getMessages(JSON.stringify({ticketId: ticket._id}))
    .then((res)=>{
      setMessages(JSON.parse(res))
    })
    .catch(console.log)
  }, [])

  const messagesForRender = messages.map((m, i) => {
    return (
      <Message
        avatar={'https://i.kym-cdn.com/photos/images/newsfeed/001/788/217/3b9.png'}
        key={i}
        message={m.text}
      />
    )
  })

  // -----------------------------------------------------------------

  const [value, setValue] = useState('')

  const [disable, setDisable] = useState(false)

  // -----------------------------------------------------------------

  // при отправке сообщения контент скроллится вниз
  function scrollToBottom () {
    if (!scrollToRef.current) {
      return
    }
    scrollToRef.current.scrollIntoView(false)
  }

  const onTextChange = (e) => {
    setValue(e.currentTarget.value)
  }

  const onEnterPressed = (e) => {
    if (e.key !== 'Enter') return
    onSendMessage()
  }

  const onSendMessage = async (e) => {
    e.preventDefault()

    setDisable(true)

    const formData = new FormData(e.target)
    const obj = Object.fromEntries(formData.entries())
    const {text} = obj
    const data = {
      text,
      customerId: customer._id,
      ticketId: ticket._id,
      isMy: true
    }
    
    const json = await api.messageCreate(JSON.stringify(data))
    const res = JSON.parse(json)
    console.log(res)
    setMessages([
      ...messages,
      res
    ])

    setDisable(false)
    setValue('')
    scrollToBottom()
  }

  return (
    <div className='profile-style'>
      <span>
        <h2>{customer ? customer.firstName : user.firstName}</h2>
        <h2>{customer ? customer.lastName : user.lastName}</h2>
      </span>
      
      <h3>{ticket.name}</h3>
      <hr/>
      <h3>{ticket.description}</h3>
      <div className='chat-container'>
        <div className='chat-view'>
          {messagesForRender}
          <div style={{ marginTop: '70px' }} ref={scrollToRef} />
        </div>
        <div className='chat-bottom'>

          <form onSubmit={onSendMessage}>
          <textarea value={value} onChange={onTextChange} id='text' name='text'/>
        
          <button disabled={disable} className='send-message-btn'>send</button>
           
          </form>
          
        </div>
      </div>
    </div>
  )
}
