import React, { useEffect, useState } from 'react'
import { isUrl, newLineHandler } from '../ChatUtils/chatUtils'
import PinnedLinkMessage from './PinnedLinkMessage'

const PinnedTextMessage = props => {
  const message = props?.messageData
  const [metaData, setmetaData] = useState({})
  const [isLinkInMessage, setIsLinkInMessage] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState('')

  useEffect(() => {
    let passUrl = ''
    let isLinkInMessage = false
    let splitOnLineChange = newLineHandler(message?.message_text)
    for (let a = 0; a < splitOnLineChange.length; a++) {
      let arr = splitOnLineChange[a].split(' ')
      for (let x = 0; x < arr.length; x++) {
        if (isUrl(arr[x])) {
          setIsLinkInMessage(true)
          isLinkInMessage = true
          passUrl = arr[x]
          break
        }
      }
    }

    if (isLinkInMessage) {
      fetch(`https://dev-revo-consumer-api.borderfree.live/scrapeMetaTags?url=${passUrl}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'group-id': 'streamstyle',
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            let tempSiteData = res
            let siteData = {
              ...tempSiteData,
              siteName: res?.url?.replace(/.+\/\/|www.|\..+/g, ''),
            }
            setmetaData(siteData)

            if (res.url) {
              if (res.url.startsWith('http://') || res.url.startsWith('https://')) {
                setRedirectUrl(res.url)
              } else {
                let tempRedirectUrl = 'http://' + res.url
                setRedirectUrl(tempRedirectUrl)
              }
            }
          } else {
            setIsLinkInMessage(false)
          }
        })
        .catch(err => {
          setIsLinkInMessage(false)
          console.error('No metaData could be found for the given URL.', err)
          setmetaData({})
        })
    }
  }, [])

  const openLink = () => {
    window.open(redirectUrl, '_blank')
  }

  return (
    <div>
      {isLinkInMessage && metaData && <PinnedLinkMessage metaData={metaData} openLink={openLink} />}

      <div className='MuiTypography-subtitle2'>
        {newLineHandler(message?.message_text)?.map(elem => {
          return (
            <>
              {isUrl(elem) ? (
                <a onClick={openLink}>{elem}</a>
              ) : (
                <>{elem != '' && <p className='MuiTypography-subtitle2 '>{elem}</p>}</>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default PinnedTextMessage
