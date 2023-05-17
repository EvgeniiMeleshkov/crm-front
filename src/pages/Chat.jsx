import { useState, useRef } from 'react'
import Message from '@/pages/Message.jsx'

export default function Chat (props) {
  const { user, customer, ticket } = props
  const scrollToRef = useRef(null)

  const [messages, setMessages] = useState([])

  const messagesForRender = messages.map((m, i) => {
    return (
      <Message
        avatar={m.avatar}
        key={i}
        message={m.message}
      />
    )
  })

  // -----------------------------------------------------------------

  const [value, setValue] = useState('')

  // -----------------------------------------------------------------

  // при отправке сообщения контент скроллится вниз
  const scrollToBottom = () => {
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

  const onSendMessage = () => {
    setMessages([
      ...messages,
      {
        avatar: 'https://i.kym-cdn.com/photos/images/newsfeed/001/788/217/3b9.png',
        message: value
      }
    ])
    setValue('')
    scrollToBottom()
  }

  console.log(user, customer, ticket)

  return (
    <div className='profile-style'>
      <div className='chat-container'>
        <div className='chat-view'>
          {messagesForRender}
          <div style={{ marginTop: '70px' }} ref={scrollToRef} />
        </div>
        <div className='chat-bottom'>

          <textarea
            onKeyUp={value.trim() !== '' ? onEnterPressed : undefined}
            value={value} onChange={onTextChange}
          />
          {value.trim() !== ''
            ? <button className='send-message-btn' onClick={onSendMessage}>send</button>
            : <button className='send-message-btn' disabled>send</button>}
        </div>
      </div>
    </div>
  )
}
