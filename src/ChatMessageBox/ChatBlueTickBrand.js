import React from 'react'

const ChatBlueTickBrand = props => {
  return (
    <svg width='15' height='15' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 7.02246C0 3.15647 3.13401 0.0224609 7 0.0224609C10.866 0.0224609 14 3.15647 14 7.02246C14 10.8884 10.866 14.0225 7 14.0225C3.13401 14.0225 0 10.8884 0 7.02246ZM6.49543 9.69971L10.95 5.24517L10.05 4.34521L6.04545 8.34979L3.94998 6.25431L3.05002 7.15425L5.59548 9.69971C5.71482 9.81902 5.87669 9.8861 6.04545 9.8861C6.21422 9.8861 6.37611 9.81902 6.49543 9.69971Z'
        fill={props?.brandColor}
      />
    </svg>
  )
}

export default ChatBlueTickBrand
