import React from 'react'

const imageCard = ({ name, link }) => {
  return (
    <div className='relative rounded-2xl'>
      <img className={`w-[400px] h-[250px] object-cover rounded-2xl`} src={link} alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 rounded-2xl"></div>
      <p className='absolute text-white font-bold top-[80%] left-[5%] text-xl'>{name}</p>
    </div>
  )
}

export default imageCard;