import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Box, ListItem, IconButton } from '@mui/material'
import ChatInput from '../ChatInput/ChatInput'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import './ChatComponents.css'

const ChatComponents = props => {
  const { eventID, groupID } = props

  const { t } = useTranslation()

  return (
    <>
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

      {/* <ChatInput {...props} /> */}
    </>
  )
}

export default ChatComponents
