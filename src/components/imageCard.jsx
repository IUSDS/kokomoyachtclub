import React from 'react'

const imageCard = ({name, link}) => {
  return (
    <div className='relative '>
            <img className="w-screen h-fit object-cover" src={`${link}`} alt="" />
            <p className='absolute text-white font-bold top-[45%] text-center text-xl w-full md:text-6xl'>{name}</p>
          </div>
  )
}

export default imageCard;