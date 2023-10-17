import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Rating } from '@mui/material';

function Review() {
  return (
    <div className=' m-24 sm:m-4 '>
        <h2 className='pb-4 pl-16 text-neutral-500 ' >Top Reviews In Bangladesh</h2>
        <div className='flex pl-20 items-center '>
            <AccountCircleIcon />
            <p className=' pl-2 font-medium text-yellow-700 ' >nasmus shahadat</p>
        </div>
        <div className='pl-20 pt-2' >
            <Rating />
        </div>
        <div className=' w-2/3 pl-20 mb-8 '>
            <p>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>
        

        <div className='flex pl-20 items-center '>
            <AccountCircleIcon />
            <p className=' pl-4 ' >nasmus shahadat</p>
        </div>
        <div className='pl-20 pt-2' >
            <Rating />
        </div>
        <div className=' w-2/3 pl-20 mb-8 '>
            <p>
            is simply dummy text of the n book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>
    </div>
  )
}

export default Review