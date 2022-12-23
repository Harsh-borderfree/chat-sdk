import React, { useEffect, useState } from 'react'
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils'
import { useSelector } from 'react-redux'
import PinnedIcon from './PinnedIcon'
import BlueTickForBrand from '../ChatMessageBox/ChatBlueTickBrand'
import { Button, useForkRef } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PinnedTextMessage from './PinnedTextMessage'
import { FormControlUnstyled } from '@mui/base'

const ChatPinnedMessage = props => {
  const { t } = useTranslation()
  const message = props?.messageData
  const { isAllowed, Permissions, eventID, event_layout, setCurrentComponent } = props
  const [accordianActive, setAccordianActive] = useState(true)
  const EventPermission = useSelector(state => state.permission)
  const permissions = EventPermission?.event_permission[eventID]?.permission
  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const userRole = EventPermission?.event_permission[eventID]?.event_role

  const [isOverflowingText, setIsOverflowingText] = useState(false)
  const [metaData, setmetaData] = useState({})
  const [isLinkInMessage, setIsLinkInMessage] = useState(false)
  const adminPinnedMessages = currentEvent?.chat_info?.pinned_message ? [...currentEvent?.chat_info?.pinned_message] : []

  const countLines = () => {
    let elements = document.getElementById('pinned-message-text')

    let isOverflowing = false
    if (elements) {
      isOverflowing = elements?.clientWidth < elements?.scrollWidth || elements?.clientHeight < elements?.scrollHeight
    }

    setIsOverflowingText(isOverflowing)
  }

  const unPinMessages = () => {
    let unPinId = message?.message_id

    let pinnedMessages = adminPinnedMessages?.filter(msg => {
      return msg?.message_id !== unPinId
    })

    // updating the redux state
    let data = {
      event_id: eventID,
      data: {
        ...currentEvent?.chat_info,
        pinned_message: pinnedMessages,
      },
      event_type: 'chat_info',
    }
    global.sdk.SetEventLevelData(
      data,
      () => {},
      res => {
        console.log('failed to update destinations', res)
      }
    )

    //updating show json
    global.sdk.UpdateShowJson(
      {
        id: eventID,
        data: {
          chat_info: {
            ...currentEvent?.chat_info,
            pinned_message: pinnedMessages,
          },
        },
      },
      () => {},
      e => {
        console.log('error update', e)
      }
    )
  }

  useEffect(() => {
    if (accordianActive) countLines()
  }, [adminPinnedMessages])

  return (
    <>
      <div id='pinned-message' className='rce-container-citem chat-pinned-message-container'>
        <div className='chat-pinned-message-body'>
          <div className='chat-pinned-message-body--top'>
            <div className='chat-pinned-message-body--top-left'>
              <PinnedIcon brandColor='#ffffff' />

              <span
                style={{
                  color: 'var(--text-color-from-brand-color)',
                  fontWeight: '600',
                }}
                className='sender-title MuiTypography-subtitle2'
              >
                {showThreeDotsAfterNText(message?.sender_name)}
              </span>

              {message?.sender_name === localStorage.getItem('ORGNAME') && <BlueTickForBrand brandColor='#ffffff' />}
            </div>

            <div className='chat-pinned-message-body--top-right'>
              {isAllowed(permissions, Permissions.chat_admin_msg_unpin.index) && (
                <Button
                  className='chat-pinned-message-unpin-btn'
                  xid='7r'
                  onClick={() => {
                    unPinMessages()
                  }}
                >
                  {t('preview.unpin')}
                </Button>
              )}
              {isOverflowingText && !isLinkInMessage && (
                <div
                  className='chat-pinned-message-body-accordion-icon'
                  onClick={() => {
                    if (event_layout === 'portrait' && userRole === 'consumer' && window.innerWidth < 1025) {
                      setCurrentComponent('RCPinnedMessageDrawer')
                    } else {
                      setAccordianActive(prev => !prev)
                    }
                  }}
                >
                  {!accordianActive ? (
                    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M10.59 7.70508L6 3.12508L1.41 7.70508L0 6.29508L6 0.295078L12 6.29508L10.59 7.70508Z'
                        fill='var(--text-color-from-brand-color)'
                      />
                    </svg>
                  ) : (
                    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M10.59 0.294922L6 4.87492L1.41 0.294922L0 1.70492L6 7.70492L12 1.70492L10.59 0.294922Z'
                        fill='var(--text-color-from-brand-color)'
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
          {message?.message_type === 'text' && (
            <PinnedTextMessage
              messageData={message}
              {...props}
              accordianActive={accordianActive}
              isLinkInMessage={isLinkInMessage}
              setIsLinkInMessage={setIsLinkInMessage}
              metaData={metaData}
              setmetaData={setmetaData}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ChatPinnedMessage
