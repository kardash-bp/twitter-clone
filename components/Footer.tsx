import { ellipsis } from '@/assets/icons'
import React from 'react'

const Footer = () => {
  return (
    <div className='pb-4 overflow-hidden '>
      <nav
        aria-label='Footer'
        role='navigation'
        className='flex flex-wrap px-4 items-stretch flex-shrink-0 gap-2 text-sm '
      >
        <a
          href='https://twitter.com/tos'
          dir='ltr'
          rel='noopener noreferrer nofollow'
          target='_blank'
          role='link'
          className=''
        >
          <span className=''>Terms of Service</span>
        </a>
        <a
          href='https://twitter.com/privacy'
          dir='ltr'
          rel='noopener noreferrer nofollow'
          target='_blank'
          role='link'
          className=''
        >
          <span className=''>Privacy Policy</span>
        </a>
        <a
          href='https://support.twitter.com/articles/20170514'
          dir='ltr'
          rel='noopener noreferrer nofollow'
          target='_blank'
          role='link'
          className=''
        >
          <span className=''>Cookie Policy</span>
        </a>
        <a
          href='https://help.twitter.com/resources/accessibility'
          dir='ltr'
          rel='noopener noreferrer nofollow'
          target='_blank'
          role='link'
          className=''
        >
          <span className=''>Accessibility</span>
        </a>
        <a
          href='https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&amp;utm_source=twc&amp;utm_medium=web&amp;utm_campaign=ao&amp;utm_content=adsinfo'
          dir='ltr'
          rel='noopener noreferrer nofollow'
          target='_blank'
          role='link'
          className=''
        >
          <span className=''>Ads info</span>
        </a>
        <div
          aria-expanded='false'
          aria-haspopup='menu'
          aria-label='More'
          role='button'
          className=''
        >
          <div>
            <span className='icon flex gap-1 items-start hover:underline'>
              More {ellipsis}
            </span>
          </div>
        </div>
      </nav>{' '}
      <div className='text-sm px-4 '>
        <span className=''>© 2023 Twitter, Inc.</span>
      </div>
    </div>
  )
}

export default Footer
