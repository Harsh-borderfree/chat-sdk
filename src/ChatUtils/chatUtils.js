export const showThreeDotsInDisplayName = str => {
  if (str?.length >= 12) {
    var prefix = str?.slice(0, 12)
    return prefix + '...'
  }
  return str
}

export const checkForBlockEmail = (userEmail, currentEvent) => {
  let alreadyBlockedEmail = currentEvent?.chat_info?.blocked_Email?.length > 0 ? [...currentEvent?.chat_info?.blocked_Email] : []

  if (alreadyBlockedEmail?.length === 0) {
    return -1
  }

  const found = alreadyBlockedEmail?.findIndex(({ email, isBlocked }) => email === userEmail && isBlocked)
  if (found >= 0) return found
  return -1
}

export const GetRole = (eventPermissions, userid, event_type = 'live_stream') => {
  for (let i = 0; i < eventPermissions?.length; i++) {
    if (eventPermissions[i].userid == userid) {
      return eventPermissions[i].user_role
    }
  }
  if (event_type == 'call_1to1') return 'v2_1to1_customer'
  return 'v2_default'
}

export const isUrl = s => {
  var res = s.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  return res !== null
}

export const newLineHandler = string => {
  if (string.includes('\n')) {
    return string.split('\n')
  } else {
    return [string]
  }
}
