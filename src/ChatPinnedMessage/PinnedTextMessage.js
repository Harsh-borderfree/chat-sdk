import React, { useEffect, useState } from 'react'
import { isUrl, newLineHandler } from '../ChatUtils/chatUtils'
import PinnedLinkMessage from './PinnedLinkMessage'

const PinnedTextMessage = props => {
  const message = props?.messageData
  const { metaData, setmetaData, isLinkInMessage, setIsLinkInMessage } = props

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
    <>
      {isLinkInMessage && metaData && <PinnedLinkMessage metaData={metaData} openLink={openLink} />}

      <div
        className={`MuiTypography-subtitle2 pinned-message-text ${
          props?.accordianActive ? `pinned-message-text-collapsed` : `pinned-message-text-expand`
        }`}
      >
        {newLineHandler(message?.message_text)?.map(elem => {
          return (
            <>
              {isUrl(elem) ? (
                <>
                  {elem.split(' ').map(s => {
                    return (
                      <>
                        {isUrl(s) ? (
                          <a onClick={openLink} className='pinned-message-text-link'>
                            {s}&nbsp;
                          </a>
                        ) : (
                          <>
                            {s != '' && (
                              <p
                                className='MuiTypography-subtitle2 pinned-message-text-normal'
                                style={{
                                  display: 'inline-block',
                                  margin: '0px 0px',
                                }}
                              >
                                {s}&nbsp;
                              </p>
                            )}
                          </>
                        )}
                      </>
                    )
                  })}
                </>
              ) : (
                <>
                  {elem != '' && (
                    <p
                      id='pinned-message-text'
                      className={`MuiTypography-subtitle2 pinned-message-text-normal ${
                        props?.accordianActive ? `pinned-message-text-normal-collapsed` : `pinned-message-text-normal-expand`
                      }`}
                    >
                      {elem}
                    </p>
                  )}
                </>
              )}
            </>
          )
        })}
      </div>
    </>
  )
}

export default PinnedTextMessage
