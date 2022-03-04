import React from 'react'

export default function Button(props) {
  return (
    <div className='flex justify-center items-center'>
        <button onClick={ props.onClick ? props.onClick : () => void 0 } className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
            {props.text}
        </button>
    </div>
  )
}
