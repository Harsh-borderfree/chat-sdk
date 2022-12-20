import { Typography } from '@mui/material'
import React from 'react'
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils'

const ChatReplyPopup = props => {
  const message = props?.messageData

  return (
    <div className='rce-mbox-reply-container'>
      <div className='rce-mbox-reply'>
        <div className='rce-mbox-reply-title'>
          <div
            className='rce-mbox-reply-title-content-left'
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography className='rce-mbox-reply-title-content-left-text'>
              {showThreeDotsAfterNText(message?.sender_name, 12) || 'Unknown'}
            </Typography>

            {message?.sender_name === localStorage.getItem('ORGNAME') && <ChatBlueTickBrand />}
          </div>
        </div>
        <Typography className='rce-mbox-reply-message'>{showThreeDotsAfterNText(message?.message_text, 30) || '...'}</Typography>
      </div>
    </div>
  )
}

export default ChatReplyPopup
