import { MenuItem, Menu, SwipeableDrawer, Divider, IconButton, Typography } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { checkForBlockEmail, isUrl, uuidv4 } from '../ChatUtils/chatUtils'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import React from 'react'

const ChatOptions = props => {
  const { t } = useTranslation()
  const message = props?.messageData
  const anchorRef = useRef(null)
  const [anchorElMenu, setAnchorElMenu] = useState(null)
  const [showBlockOption, setShowBlockOption] = useState(false)
  const { isAllowed, Permissions, eventID, groupID } = props
  const [showMenuItem, setShowMenuItem] = useState(false)
  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const adminPinnedMessages = currentEvent?.chat_info?.pinned_message ? [...currentEvent?.chat_info?.pinned_message] : []
  const EventPermission = useSelector(state => state.permission)
  const permissions = EventPermission?.event_permission[eventID]?.permission
  const [selectedMessage, setSelectedMessage] = useState({})

  let alreadyBlockedEmail = currentEvent?.chat_info?.blocked_Email?.length > 0 ? [...currentEvent?.chat_info?.blocked_Email] : []

  const pinOnAdminClick = () => {
    setShowMenuItem(false)
    let pinnedMessages = currentEvent?.chat_info?.pinned_message ? [...currentEvent?.chat_info?.pinned_message] : []
    if (pinnedMessages?.length === 1) {
      global.sdk.CallSnackBar(true, 'error', 3000, t('preview.support_two_pin'), 'bottom', 'center')
      return
    }

    pinnedMessages.map(msg => {
      if (msg?.message_id === selectedMessage?.id) {
        global.sdk.CallSnackBar(true, 'error', 3000, t('preview.cant_pin_again'), 'bottom', 'center')
        return
      }
    })

    let requestBody = {
      group_id: `${groupID}_${eventID}_pinned`,
      has_preview: false,
      id: uuidv4(),
      message_id: selectedMessage?.id,
      message_text: selectedMessage?.message_text,
      message_type: 'text',
      sender_name: selectedMessage?.sender_name,
      msg_id: selectedMessage?.msg_id,
      pin_id: uuidv4(),
      push_time: new Date().getTime(),
      sender_id: selectedMessage?.sender_id,
      status: 'pinned',
    }
    pinnedMessages.push(requestBody)

    //updating event level data
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

    //upating show json
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
      () => {
        // window.innerWidth < 1025 && props?.setCurrentComponent('')
      },
      e => {
        console.log('error update', e)
        // window.innerWidth < 1025 && props?.setCurrentComponent('')
      }
    )
  }

  const unPinMessages = () => {
    setShowMenuItem(false)
    let unPinId = selectedMessage?.id

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

  const onBlockClick = () => {
    setShowMenuItem(false)
    let userMsgData = selectedMessage?.sender_id
    let alreadyBlockedEmail =
      currentEvent?.chat_info?.blocked_Email?.length > 0 ? [...currentEvent?.chat_info?.blocked_Email] : []

    //updating eventlevel data
    let newBlocked = {
      email: userMsgData,
      isBlocked: true,
    }

    alreadyBlockedEmail.push(newBlocked)

    let data = {
      event_id: eventID,
      data: {
        ...currentEvent?.chat_info,
        blocked_Email: alreadyBlockedEmail,
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

    // //updating show json
    global.sdk.UpdateShowJson(
      {
        id: eventID,
        data: {
          chat_info: {
            ...currentEvent?.chat_info,
            blocked_Email: alreadyBlockedEmail,
          },
        },
      },
      () => {},
      e => {
        console.log('error update', e)
      }
    )
  }

  const onUnblockClick = () => {
    setShowMenuItem(false)
    let userMsgData = selectedMessage?.sender_id

    let alreadyBlockedEmail =
      currentEvent?.chat_info?.blocked_Email?.length > 0 ? [...currentEvent?.chat_info?.blocked_Email] : []
    const presentIndex = checkForBlockEmail(userMsgData, currentEvent)
    let newBlockedArray = [...alreadyBlockedEmail]

    if (presentIndex >= 0) {
      newBlockedArray.splice(presentIndex, 1)
    }

    let data = {
      event_id: eventID,
      data: {
        ...currentEvent?.chat_info,
        blocked_Email: newBlockedArray,
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

    // //updating show json
    global.sdk.UpdateShowJson(
      {
        id: eventID,
        data: {
          chat_info: {
            ...currentEvent?.chat_info,
            blocked_Email: newBlockedArray,
          },
        },
      },
      () => {},
      e => {
        console.log('error update', e)
      }
    )
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        id='simple-menu'
        className='rce-mbox-title-right'
        style={{ cursor: 'pointer' }}
        onClick={e => {
          setSelectedMessage(message)
          setAnchorElMenu(e)
          setShowMenuItem(true)
          if (message?.user_type === 'admin') {
            setShowBlockOption(false)
          } else {
            setShowBlockOption(true)
          }
        }}
      >
        <MoreVertOutlinedIcon height='20px' width='20px' />
      </IconButton>

      {showMenuItem &&
        (window.innerWidth > 1024 ? (
          <Menu
            open={true}
            id='simple-menu'
            anchorEl={anchorRef.current}
            keepMounted
            onClose={() => {
              setShowMenuItem(false)
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              xid='4O'
              onClick={() => {
                setShowMenuItem(false)
                props.setShowReplyPopup(true)
                props.setRepliedMessageData(selectedMessage)
              }}
              className='RCChat-menu-pin'
            >
              {t('watch.reply')}
            </MenuItem>
            {isAllowed(permissions, Permissions.chat_admin_msg_pin.index) &&
              (adminPinnedMessages?.find(pinEl => pinEl?.message_id === selectedMessage?.id) ? (
                <MenuItem
                  xid='4P'
                  onClick={() => {
                    unPinMessages()
                  }}
                  className='RCChat-menu-pin'
                >
                  {t('watch.unpin_msg')}
                </MenuItem>
              ) : (
                <MenuItem xid='4Q' onClick={pinOnAdminClick} className='RCChat-menu-pin'>
                  {t('watch.pin_msg')}
                </MenuItem>
              ))}
            {isAllowed(permissions, Permissions.invite_to_join_live.index) &&
              checkForBlockEmail(message?.sender_id, currentEvent) < 0 &&
              showBlockOption && (
                <MenuItem
                  xid='4O'
                  // onClick={() => {
                  //   inviteViewer(props?.mesagesData?.sender_id)
                  //   handleClose()
                  // }}
                  className='RCChat-menu-pin'
                >
                  {t('Viewers_panel.invite_menuitem')}
                </MenuItem>
              )}
            {isAllowed(permissions, Permissions.chat_admin_msg_block.index) &&
              checkForBlockEmail(message?.sender_id, currentEvent) < 0 &&
              showBlockOption && (
                <MenuItem xid='4R' onClick={onBlockClick} className='RCChat-menu-pin'>
                  {t('watch.block_user')}
                </MenuItem>
              )}
            {isAllowed(permissions, Permissions.chat_admin_msg_block.index) &&
              checkForBlockEmail(message?.sender_id, currentEvent) >= 0 &&
              showBlockOption && (
                <MenuItem xid='4S' onClick={onUnblockClick} className='RCChat-menu-pin'>
                  {t('watch.unblock_user')}
                </MenuItem>
              )}
          </Menu>
        ) : (
          <SwipeableDrawer
            anchor='bottom'
            transitionDuration={400}
            open={Boolean(anchorElMenu)}
            // onClose={handleClose}
            PaperProps={{
              square: false,
              style: {
                borderRadius: '12px 12px 0px 0px',
                height: 'auto',
                overscrollBehavior: 'auto',
                overflowY: 'scroll !important',
                overflowX: 'hidden',
              },
            }}
          >
            <Divider
              style={{
                margin: 'auto',
                marginTop: '6px',
                width: '50px',
                border: '1px solid',
              }}
            />

            <div style={{ padding: '20px 16px 12px 16px' }}>
              {isAllowed(permissions, Permissions.invite_to_join_live.index) && showBlockOption && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: '15px',
                    cursor: 'pointer',
                  }}
                  xid='7y'
                >
                  <VideoCallOutlinedIcon
                    style={{
                      color: 'var(--brand-color)',
                      marginRight: '13px',
                    }}
                  />

                  <Typography
                    variant='h6'
                    style={{
                      fontSize: '16px',
                      color: 'var(--text-color)',
                      fontWeight: '400',
                    }}
                    xid='4O'
                    // onClick={() => {
                    //   inviteViewer(props?.mesagesData?.sender_id)
                    //   handleClose()
                    //   setShowMenuItem(false)
                    // }}
                  >
                    {t('Viewers_panel.invite_menuitem')}
                  </Typography>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: '15px',
                  cursor: 'pointer',
                }}
                xid='7y'
              >
                <PushPinOutlinedIcon
                  style={{
                    color: 'var(--brand-color)',
                    marginRight: '13px',
                  }}
                />
                {isAllowed(permissions, Permissions.chat_admin_msg_pin.index) &&
                  (adminPinnedMessages?.find(pinEl => pinEl?.message_id === selectedMessage?.id) ? (
                    <Typography
                      variant='h6'
                      style={{
                        fontSize: '16px',
                        color: 'var(--text-color)',
                        fontWeight: '400',
                      }}
                      xid='4P'
                      onClick={() => {
                        unPinMessages()
                      }}
                    >
                      {t('watch.unpin_msg')}
                    </Typography>
                  ) : (
                    <Typography
                      variant='h6'
                      style={{
                        fontSize: '16px',
                        color: 'var(--text-color)',
                        fontWeight: '400',
                      }}
                      xid='4Q'
                      onClick={pinOnAdminClick}
                    >
                      {t('watch.pin_msg')}
                    </Typography>
                  ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: '15px',
                  cursor: 'pointer',
                }}
                xid='7y'
                onClick={() => {
                  setShowMenuItem(false)
                  props.setShowReplyPopup(true)
                  props.setRepliedMessageData(selectedMessage)
                }}
              >
                <ReplyOutlinedIcon
                  style={{
                    color: 'var(--brand-color)',
                    marginRight: '13px',
                  }}
                />
                <Typography
                  variant='h6'
                  style={{
                    fontSize: '16px',
                    color: 'var(--text-color)',
                    fontWeight: '400',
                  }}
                >
                  {t('watch.reply')}
                </Typography>
              </div>
              {showBlockOption && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: '15px',
                    cursor: 'pointer',
                  }}
                  xid='7y'
                >
                  <BlockOutlinedIcon
                    style={{
                      color: 'var(--brand-color)',
                      marginRight: '13px',
                    }}
                  />

                  {isAllowed(permissions, Permissions.chat_admin_msg_block.index) &&
                    checkForBlockEmail(message?.sender_id, currentEvent) < 0 &&
                    showBlockOption && (
                      <Typography
                        variant='h6'
                        style={{
                          fontSize: '16px',
                          color: 'var(--text-color)',
                          fontWeight: '400',
                        }}
                        xid='4R'
                        onClick={onBlockClick}
                      >
                        {t('watch.block_user')}
                      </Typography>
                    )}
                  {isAllowed(permissions, Permissions.chat_admin_msg_block.index) &&
                    checkForBlockEmail(message?.sender_id, currentEvent) >= 0 &&
                    showBlockOption && (
                      <Typography
                        variant='h6'
                        style={{
                          fontSize: '16px',
                          color: 'var(--text-color)',
                          fontWeight: '400',
                        }}
                        xid='4S'
                        onClick={onUnblockClick}
                      >
                        {t('watch.unblock_user')}
                      </Typography>
                    )}
                </div>
              )}
            </div>
          </SwipeableDrawer>
        ))}
    </>
  )
}

export default ChatOptions
