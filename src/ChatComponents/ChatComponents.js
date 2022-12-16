import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

const ChatComponents = ({ eventID, groupID }) => {
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(5)
  }, [])

  return <Typography>ChatComponents</Typography>
}

export default ChatComponents
