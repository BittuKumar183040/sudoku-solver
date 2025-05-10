import React from 'react'
import { ArrowLeftSquare } from 'lucide-react';

const BackBtn = ({onClick}) => {
  return (
    <div className=' w-full'>
      <button onClick={onClick} className=' active:scale-95 -translate-x-1/2 cursor-pointer flex gap-2 text-gray-600 shadow-md justify-evenly bg-gray-100 opacity-90 rounded-md text-md items-center w-fit p-1 px-2 pl-2'>
        <ArrowLeftSquare size={18}/><span>Back</span>
      </button>
    </div>
  )
}

export default BackBtn