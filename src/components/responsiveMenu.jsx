import { motion,AnimatePresence } from 'framer-motion'
import React from 'react'

const ResponsiveMenu = ({open}) => {
    return (
        <AnimatePresence mode='wait'>
            {
                open && (
                    <motion.div initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -100}} className='absolute top-24 left-0 w-full h-screen bg-black/70 z-20' >
                      <div className='texl-xl uppercase font-semibold text-white bg-midnightblue py-8 m-6 rounded-3xl'>
                        <ul className='flex flex-col items-center justify-center gap-10'>
                          <li className='cursor-pointer hover:text-gray-300'>Home</li>
                          <li className='cursor-pointer hover:text-gray-300'>From the Founder</li>
                          <li className='cursor-pointer hover:text-gray-300'>Fleet</li>
                          <li className='cursor-pointer hover:text-gray-300'>Membership</li>
                          <li className='cursor-pointer hover:text-gray-300'>Contact</li>
                          <li className='cursor-pointer hover:text-gray-300'>Come Aboard</li>
                          <li className='cursor-pointer hover:text-gray-300'>Login</li>
                        </ul>
                      </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
}

export default ResponsiveMenu;