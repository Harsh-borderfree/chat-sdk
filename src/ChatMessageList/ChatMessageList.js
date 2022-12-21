import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'
import { useTranslation } from 'react-i18next'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton } from '@mui/material'

const ChatMessageList = props => {
  const messagesList = props?.chatMessageList
  const { t } = useTranslation()
  const { isOverFLowingChat, eventID, event_layout } = props
  const mobilePortrait = window.innerWidth < 1025 && event_layout === 'portrait'
  const [showChat, setShowChat] = useState(true)
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  let bottomInputElement = document.getElementsByClassName('RCChat-Input-Container')
  let bottomInputHeight = 50
  if (bottomInputElement) {
    bottomInputHeight = bottomInputElement[0]?.clientHeight
  }

  const makeChatHidden = () => {
    let mbox = document.getElementsByClassName('rce-container-mbox')
    let anonMBox = document.getElementsByClassName('anon-container-mbox')

    if (mbox && mbox[0]) {
      mbox[0].style.display = 'none'
    }

    if (anonMBox && anonMBox[0]) {
      anonMBox[0].style.display = 'none'
    }
  }

  const makeChatVisible = () => {
    let mbox = document.getElementsByClassName('rce-container-mbox')
    let anonMBox = document.getElementsByClassName('anon-container-mbox')

    if (mbox && mbox[0]) {
      mbox[0].style.display = 'block'
    }

    if (anonMBox && anonMBox[0]) {
      anonMBox[0].style.display = 'block'
    }
  }

  useEffect(() => {
    if (showChat) {
      makeChatVisible()
    } else {
      makeChatHidden()
    }
  }, [showChat])

  return (
    <>
      <div className='Chat-message-list-container'>
        {messagesList?.map(message => {
          // For anon joined the chat message
          if (
            message?.sender_id?.includes('anon_') &&
            message?.message_text?.includes('joined the chat') &&
            !message?.sender_name
          ) {
            return (
              <>
                <AnonChatMessageBox messageData={message} key={message?.id} />
              </>
            )
          }
          // All Normal and replied message
          else {
            return (
              <>
                <ChatMessageBox messageData={message} {...props} key={message?.id} />
              </>
            )
          }
        })}
        {mobilePortrait && !isOverFLowingChat && allChatMessages?.length > 0 && (
          <div
            xid='97'
            onClick={e => {
              e.stopPropagation()
              setShowChat(prev => !prev)
            }}
            className='RCChat-PortraitView-Title'
          >
            <span style={{ color: '#ffffff' }}>{t('preview.chat')}</span>
            {showChat ? (
              <IconButton>
                <KeyboardArrowDownIcon className='chat-accordian-icon' />
              </IconButton>
            ) : (
              <IconButton>
                <KeyboardArrowUpIcon className='chat-accordian-icon' />
              </IconButton>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ChatMessageList
