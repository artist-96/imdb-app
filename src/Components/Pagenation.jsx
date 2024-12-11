import React from 'react'

function Pagenation(props) {

    let { pageNum, onNextClick, onPrevClick} = props;

    return (
        <div className='flex justify-center my-5 space-x-1'>

            <div onClick={onPrevClick}
                className='text-3xl py-2 px-2 rounded-l-xl border-blue-500 cursor-pointer'
            >◀
            </div>

            <div className='flex'>
                <div className='text-2xl text-center m-0.5 py-2 px-2 rounded-xl border-blue-500 cursor-pointer'>
                    {pageNum}
                </div>
            </div>

            <div onClick={onNextClick}
                className='text-3xl py-2 px-2 rounded-r-xl border-blue-500 cursor-pointer'>
                ▶
            </div>

        </div>
    )
}

export default Pagenation