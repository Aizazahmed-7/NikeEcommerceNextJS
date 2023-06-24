"use client";
const Cards = ({name , description , url , price}) => {
  return (
    <div className="pr-5 h-full w-full " >
        <img className="object-cover w-full h-full" src={url}   />
        <div className='flex mt-5 flex-row justify-between items-center' >
            <div className='flex flex-col' >
                <h1 className='text-xl text-black font-bold' >{name}</h1>
                <p className='text-sm hidden md:block ' >{description}</p>
            </div>
            <div>
                <p className='text-sm' >${price}</p>
            </div>
        </div>
    </div>
  )
}

export default Cards