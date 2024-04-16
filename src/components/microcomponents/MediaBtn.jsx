import React from 'react'

function MediaBtn({ urlMedia, svgIcon, altText }) {
    return (
        <a href={urlMedia} target='_blank' className='avatar w-10 lg:w-14 lg:hover:scale-110 transition-all duration-500'>
            <img src={svgIcon} alt={altText} />
        </a>
    )
}

export default MediaBtn