import React from 'react'

export default function Message (props) {
  const { message, avatar } = props

  return (
    <div>
      <div className='user-message-instance'>
        <div style={{ alignSelf: 'end' }}>
          <img alt='' src={avatar} />
        </div>
        <div>
          <div className='user-message-text'>
            <div className='message'>
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
