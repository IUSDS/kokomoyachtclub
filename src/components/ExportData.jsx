import { button, label } from 'framer-motion/client'
import React from 'react'

const ExportData = () => {
  const actions = [
    { label: 'Member Data', type: 'exportMemberData' },
    { label: 'Visitor Data', type: 'exportVisitorData' }
  ]
  return (
    <div className='flex flex-col gap-2 md:flex-row'>
      {actions.map((action) => (
        <button
          key={action.type}
          className={`py-2 px-4 border rounded-lg bg-midnightblue text-white transition-colors duration-200`}>
          {action.label}
        </button>
      ))}
    </div>
  )
}

export default ExportData