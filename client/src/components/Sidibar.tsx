import React from 'react'

const Sidibar = ({setSubject, lectures}) => {

  return (
    <div className='w-full'>
        {lectures.map((lecture) => {
            return (
                <h2 key={lecture._id} onClick={() => setSubject(lecture._id)} className='text-2xl cursor-pointer'>{lecture.title}</h2>
            )
        })}
    </div>
  )
}

export default Sidibar