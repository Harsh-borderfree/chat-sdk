import React, { useEffect, useState } from 'react'
import { isUrl, newLineHandler } from '../ChatUtils/chatUtils'
import LinkIcon from '@mui/icons-material/Link'

const ChatTextMesage = props => {
  const message = props?.messageData
  const { isAllowed, Permissions, eventID } = props
  const [metaData, setmetaData] = useState({})
  const [isLinkInMessage, setIsLinkInMessage] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState('')
  const [titleLength, setTitleLength] = useState(15)
  const [descriptionLength, setDescriptionLength] = useState(25)

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
          console.error(err)
          console.error('No metaData could be found for the given URL.', err)
          setmetaData({})
        })
    }
  })

  const openLink = () => {
    window.open(redirectUrl, '_blank')
  }

  return (
    <div className='box'>
      {isLinkInMessage && metaData && (
        <div className='upper'>
          {metaData?.image && (
            <div className='upperLeft'>
              <div data-testid='container' onClick={openLink}>
                <div
                  data-testid='image-container'
                  style={{
                    backgroundImage: `url(${metaData?.image})`,
                  }}
                  className='Image'
                ></div>
              </div>
            </div>
          )}

          <div className='upperRight'>
            <div className='titleContainer'>
              {metaData?.title && (
                <h3
                  data-testid='title'
                  className='Title'
                  style={{
                    padding: '0px',
                    margin: '0px',
                  }}
                >
                  {metaData?.image
                    ? titleLength
                      ? metaData?.title?.length > titleLength
                        ? metaData?.title?.slice(0, titleLength) + '...'
                        : metaData?.title
                      : metaData?.title
                    : titleLength
                    ? metaData?.title?.length > titleLength * 1.2
                      ? metaData?.title?.slice(0, titleLength * 1.2) + '...'
                      : metaData?.title
                    : metaData?.title}
                </h3>
              )}
            </div>
            <div className='Description'>
              {metaData?.description && (
                <span
                  data-testid='desc'
                  className='Description Secondary'
                  style={{
                    color: 'var(--text-color)',
                  }}
                >
                  {metaData?.image
                    ? descriptionLength
                      ? metaData?.description?.length > descriptionLength
                        ? metaData?.description?.slice(0, descriptionLength) + '...'
                        : metaData?.description
                      : metaData?.description
                    : descriptionLength
                    ? metaData?.description?.length > descriptionLength * 2
                      ? metaData?.description.slice(0, descriptionLength * 2) + '...'
                      : metaData?.description
                    : metaData?.description}
                </span>
              )}
            </div>

            <div className='SiteDetails'>
              {metaData?.siteName && (
                <div>
                  <span style={{ marginRight: '6px' }}>
                    <LinkIcon />
                  </span>
                  <span className='link-preview-link'>
                    <b>{metaData?.siteName}</b>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='lower MuiTypography-body2' style={isLinkInMessage == false ? { marginTop: '0px' } : {}}>
        <div className='MuiTypography-subtitle2'>
          {newLineHandler(message?.message_text)?.map(elem => {
            return (
              <div>
                {elem?.split(' ').map(s => {
                  return (
                    <>
                      {isUrl(s) ? (
                        <a
                          onClick={openLink}
                          className='MuiTypography-subtitle2'
                          style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            color: 'rgba(255, 255, 255, .7)',
                          }}
                        >
                          {s}&nbsp;
                        </a>
                      ) : (
                        <>
                          {s != '' && (
                            <p
                              className='MuiTypography-subtitle2'
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ChatTextMesage
