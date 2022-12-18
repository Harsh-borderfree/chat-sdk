export const showThreeDotsAfterNText = (str, N) => {
  if (str?.length >= N) {
    var prefix = str?.slice(0, N)
    return prefix + '...'
  }
  return str
}

const regex = {
  userName: /[`!@#$%^&*()+=[\]{};':"\\|,<>/?~]/,
  userEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneNumber: /^(\+\d{1,3}[- ]?)?\d{10}$/,
}

const errorHelperText = {
  userName: 'settings_panel.valid_name',
  userEmail: 'rsvp.email_error',
  phoneNumber: 'rsvp.phone_error',
  emptyField: 'rsvp.emptyfield_error',
  maxCharLimit: 'rsvp.max_char_limit',
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const handleDisplayName = (text, name, t) => {
  let showHelperText = false
  let helperText = ''
  if (text?.length > 70) {
    return {
      name,
      showHelperText: true,
      helperText: t(errorHelperText.maxCharLimit),
    }
  }
  if (text?.length === 0)
    return {
      name: text,
      showHelperText: true,
      helperText: t(errorHelperText.emptyField),
    }
  if (!name && text === ' ') {
    return { name: '', showHelperText, helperText }
  }
  if (regex['userName'].test(text)) {
    showHelperText = true
    return { name, showHelperText, helperText: t(errorHelperText.userName) }
  } else {
    showHelperText = false
  }
  let lastLetter = text[text?.length - 1]
  let secondLastLetter = text[text?.length - 2]
  if (lastLetter === ' ' && secondLastLetter === ' ') {
    return { name, showHelperText, helperText }
  }

  return { name: text, showHelperText, helperText }
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
