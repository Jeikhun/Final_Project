import React from 'react';


export const CommentItem = ({ cmt }) => {


    return (
        <div className='gap-3 flex'>
            <div className=''>
                <p className='font-bold text-gray-200'>{cmt.username}:</p>
            </div>
            <div className='flex text-gray-300 text-[15px]'>{cmt.comment}</div>
        </div>
    )
}
