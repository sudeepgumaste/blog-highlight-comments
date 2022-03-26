import React from 'react'

import HashnodeIcon from '../../../../public/assets/hashnode.svg'

const Nav = () => {
  return (
    <header className="tw-sticky tw-top-0 tw-z-50 | tw-px-4 tw-py-4 | tw-flex tw-items-center | tw-shadow-sm first-letter | tw-bg-bg-layer-2">
      <div className="tw-w-full tw-container | tw-mx-auto">
        <div>
          <HashnodeIcon className="tw-h-8" />
        </div>
      </div>
    </header>
  )
}

export default Nav
