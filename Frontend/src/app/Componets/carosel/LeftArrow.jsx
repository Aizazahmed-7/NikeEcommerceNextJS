import React from 'react'

const LeftArrow = (props) => {
    const { className, style, onClick } = props;
  return (
    <div
    className='absolute hidden md:block bottom-full m-5 right-16 z-10 cursor-pointer rounded-full p-2 bg-gray-300 text-black'
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

  </div>
  )
}

export default LeftArrow