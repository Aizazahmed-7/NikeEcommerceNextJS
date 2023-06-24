import React from 'react'

const RightArrow = (props) => {
    const { className, style, onClick } = props;
  return (
    <div
    className='absolute hidden md:block bottom-full mb-5 right-10 z-10 cursor-pointer rounded-full p-2 bg-gray-300 text-black'
    onClick={onClick}
  >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
</svg>

  </div>
  )
}

export default RightArrow