import React from 'react'

export default function Message (props) {
  const { message, avatar } = props

  return (
    <div>
      <div className='message-instance'>
        <div style={{ alignSelf: 'end' }}>
          <img alt='' src={avatar} />
        </div>
        <div>
          <div className='message-text'>
            <div className='user-message'>
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
