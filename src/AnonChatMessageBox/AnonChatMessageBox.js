import React from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const AnonChatMessageBox = ({ message }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className='anon-container-mbox'>
        <Typography>
          <span>{message?.message_text?.split('joined the chat')[0]}</span>
          <span>{t('preview.joined_chat')}</span>
        </Typography>
      </div>
    </>
  )
}

export default AnonChatMessageBox
