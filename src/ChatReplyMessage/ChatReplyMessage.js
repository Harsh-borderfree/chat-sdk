import React from 'react'
import ChatBlueTickBrand from '../ChatMessageBox/ChatBlueTickBrand'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'
import { Typography } from '@mui/material'
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils'

const ChatReplyMessage = props => {
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
              {showThreeDotsAfterNText(message?.reply_to_user, 12) || 'Unknown'}
            </Typography>

            {message?.reply_to_user === localStorage.getItem('ORGNAME') && <ChatBlueTickBrand />}
          </div>
          {/* {!replyPopUp && (
              <CloseIcon
                className='RC-close-icon'
                onClick={() => {
                  hideReplyBox()
                }}
              />
            )} */}
        </div>
        <Typography className='rce-mbox-reply-message'>
          {showThreeDotsAfterNText(message?.reply_to_message, 30) || '...'}
        </Typography>
      </div>
    </div>
  )
}

export default ChatReplyMessage
