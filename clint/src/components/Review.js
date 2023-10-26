import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Rating } from '@mui/material';
import RatingSubmit from './RatingSubmit';

function Review() {
  return (
    <div className=' mt-5 sm:m-4 '>
        <div>
            <RatingSubmit />
        </div>
        <h2 className='pb-4 pl-4 md:pl-4 font-sans text-neutral-500 ' >Top Reviews In Bangladesh</h2>
        <div className='flex pl-6 md:pl-10 items-center '>
            <AccountCircleIcon />
            <p className=' pl-2 font-medium text-yellow-700 ' >nasmus shahadat</p>
        </div>
        <div className='pl-6 pt-2 md:pl-14' >
            <Rating />
        </div>
        <div className='pl-6 mb-8 md:pl-12 '>
            <p className='lg:w-2/3'>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>
    </div>
  )
}

export default Review