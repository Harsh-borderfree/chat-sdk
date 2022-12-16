import React, { useEffect, useState } from 'react'

const ChatComponents = () => {
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(5)
  }, [])

  console.log('+++STATTTA', state, allChatMessages)
  return <div>ChatComponents</div>
}

export default ChatComponents
