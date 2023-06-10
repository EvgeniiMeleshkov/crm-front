import React from 'react'

export default function Message (props) {
  const { message, avatar, className } = props

  return (
    <div>
      <div className={className + 'message-instance'}>
        <div style={{ alignSelf: 'end' }}>
          <img alt='' src={avatar} />
        </div>
        <div>
          <div className={className + 'message-text'}>
            <div className='message'>
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
