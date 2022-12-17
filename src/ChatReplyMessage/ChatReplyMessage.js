import React from 'react'
import ChatBlueTickBrand from '../ChatMessageBox/ChatBlueTickBrand'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'
import { Typography } from '@mui/material'
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils'

const ChatReplyMessage = props => {
  const message = props?.messageData

  return (
    <div className='rce-mbox-reply-container'>
      {/* we will show it when we reply any message in input */}
      {/* {replyPopUp && (
        <div style={{ alignItems: 'center' }} className='rce-mbox-reply-owner-parent'>
          <div
            style={titleColor && { color: titleColor }}
            className='rce-mbox-title rce-mbox-title--clear MuiTypography-subtitle2'
          >
            <span className='MuiTypography-subtitle2' style={{ fontWeight: '600' }}>
              {showThreeDotsAfterNText(senderTitle) || 'Unknown'}
            </span>

            <div className='rce-mbox-reply-owner-tick'>
              {senderTitle === localStorage.getItem('ORGNAME') && (
                <svg width='15' height='15' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7ZM6.49543 9.67725L10.95 5.22271L10.05 4.32275L6.04545 8.32733L3.94998 6.23185L3.05002 7.13179L5.59548 9.67725C5.71482 9.79656 5.87669 9.86364 6.04545 9.86364C6.21422 9.86364 6.37611 9.79656 6.49543 9.67725Z'
                    fill={this.props.brandColor}
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      )} */}
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
