import React from 'react'

const Footer = () => {
  return (
    <div className='text-center text-gray-200 bottom-0 h-[10em] flex flex-col gap-3 items-center justify-center'>
        <h1 className='text-3xl font-semibold'>Ready to join conversation</h1>
        <p className='text-[15px] text-gray-200/90 font-semibold'>Have your voice heard and connect with our spokesperson</p>
        <button className='bg-gray-200/18 px-4 py-3 rounded-full'>Ask Your Question</button>
    </div>
  )
}

export default Footer