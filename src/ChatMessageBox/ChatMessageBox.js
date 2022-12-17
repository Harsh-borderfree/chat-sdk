import React from 'react'
import { isUrl } from '../ChatUtils/chatUtils'
import { useSelector } from 'react-redux'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { Typography } from '@mui/material'
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils'
import BlueTickForBrand from './ChatBlueTickBrand'
import ChatTextMesage from './ChatTextMesage'
import ChatImageMessage from './ChatImageMessage'
import ChatReplyMessage from '../ChatReplyMessage/ChatReplyMessage'

const ChatMessageBox = props => {
  const message = props?.messageData
  const { isAllowed, Permissions, eventID } = props
  const EventPermission = useSelector(state => state.permission)
  const permissions = EventPermission?.event_permission[eventID]?.permission
  return (
    <div className='rce-container-mbox'>
      <div className='rce-mbox-title'>
        <div className='rce-mbox-title-left'>
          {message?.sender_name && (
            <Typography className='rce-mbox-title-left-content' style={{ fontWeight: '600' }}>
              {showThreeDotsAfterNText(message?.sender_name, 12)}
            </Typography>
          )}
          {/* COmmented  for invite status icon will do it later */}
          {/* {this.props.checkUserStatus(this.props.sender_id) &&
          this.props.isAllowed(this.props.permissions, this.props.PermissionsObject.chat_admin_msg_pin.index) && (
            <div>
              <span className='invite-box'>
                <svg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12.333 0.666656H1.66634C0.933008 0.666656 0.333008 1.26666 0.333008 1.99999V9.99999C0.333008 10.7333 0.933008 11.3333 1.66634 11.3333H7.66634V9.99999H1.66634V3.33332L6.99967 6.66666L12.333 3.33332V6.66666H13.6663V1.99999C13.6663 1.26666 13.0663 0.666656 12.333 0.666656ZM6.99967 5.33332L1.66634 1.99999H12.333L6.99967 5.33332ZM11.6663 7.99999L14.333 10.6667L11.6663 13.3333V11.3333H8.99967V9.99999H11.6663V7.99999Z'
                    fill={this.props.brandColor}
                  />
                </svg>
              </span>
            </div>
          )} */}

          {message?.sender_name === localStorage.getItem('ORGNAME') && <BlueTickForBrand brandColor='blue' />}
        </div>
        {isAllowed(permissions, Permissions.chat_admin_msg_pin.index) && (
          <div className='rce-mbox-title-right' style={{ cursor: 'pointer' }}>
            <MoreVertOutlinedIcon height='20px' width='20px' />
          </div>
        )}
      </div>

      {message?.reply_type && <ChatReplyMessage messageData={message} {...props} />}

      {message?.message_type === 'text' && <ChatTextMesage messageData={message} {...props} />}
      {message?.message_type === 'photo' && <ChatImageMessage messageData={message} {...props} />}
    </div>
  )
}

export default ChatMessageBox
