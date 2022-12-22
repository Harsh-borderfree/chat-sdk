import React from 'react'
import { useTranslation } from 'react-i18next'

const ChatImageMessage = props => {
  const { t } = useTranslation()
  const { messageData } = props
  return (
    <>
      <img className='message-box-photo' src={messageData?.message_text}></img>
      <p className='MuiTypography-subtitle2 text-message-content'>{`${t('admintab.tryon_text')}`}</p>
    </>
  )
}

export default ChatImageMessage
