import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Box, ListItem, IconButton } from '@mui/material'
import ChatInput from '../ChatInput/ChatInput'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import './ChatComponents.css'
import ChatMessageList from '../ChatMessageList/ChatMessageList'

const ChatComponents = props => {
  const { eventID, groupID } = props
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  console.log('ALL CHAT MESSAGES', allChatMessages)
  const replayMessages = useSelector(state => state?.chat?.replayMessages)
  const allReplayMessages = replayMessages ? replayMessages[eventID] : []
  const [chatMessageList, setChatMessageList] = useState([])
  const eventsState = useSelector(state => state.events)
  const { streamEvents, customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]

  //Five Types of messages
  // 1.Normal Messages
  // 2.Replied Messages
  // 3.Link Messages
  // 4.Tryon Messages
  // 5.Joined the chat messages

  const { t } = useTranslation()

  useEffect(() => {
    if (allChatMessages.length > 0 || allReplayMessages.length > 0) {
      const isRecordedVideoPlaying =
        currentEvent.status == 'streaming_done' && global.mem.current.event.isRecordedVideoPlaying == true
      let tempMessageList = []
      if (isRecordedVideoPlaying == true) {
        tempMessageList = [...allReplayMessages]
        setChatMessageList(tempMessageList)
      } else {
        tempMessageList = [...allChatMessages]
        tempMessageList = tempMessageList.reverse()
        setChatMessageList(tempMessageList)
      }
    }
  }, [allChatMessages, allReplayMessages])

  return (
    <>
      <div className='RCChat-conatainer'>
        <div className='RCChat-title-div'>
          <Typography variant='h6'>{t('preview.chat')}</Typography>
          <IconButton
            className='RCChat-title-close-iconbutton'
            xid='4M'
            onClick={() => {
              props?.setCurrentComponent('RCProductsPanel')
            }}
            size='large'
          >
            <CloseIcon className='RCChat-title-close-icon' />
          </IconButton>
        </div>

        <div className='RCChat-content-container'>
          <ChatMessageList chatMessageList={chatMessageList} {...props} />
          <ChatInput {...props} />
        </div>
      </div>
    </>
  )
}

export default ChatComponents
