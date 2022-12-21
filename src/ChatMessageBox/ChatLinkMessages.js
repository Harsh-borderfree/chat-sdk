import React, { useState } from 'react'
import LinkIcon from '@mui/icons-material/Link'

const ChatLinkMessages = ({ metaData, openLink }) => {
  const [titleLength, setTitleLength] = useState(15)
  const [descriptionLength, setDescriptionLength] = useState(25)
  return (
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
            <span data-testid='desc' className='Description Secondary'>
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
            <>
              <span style={{ marginRight: '6px' }}>
                <LinkIcon />
              </span>
              <span className='link-preview-link'>
                <b>{metaData?.siteName}</b>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatLinkMessages
