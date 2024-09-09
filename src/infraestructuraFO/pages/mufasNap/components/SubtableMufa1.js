import React from 'react'

export default function SubtableMufa1({splitter,potencia,splitter_ad}) {
  return (
    <div className='flex grid grid-cols-2'>
    
        <div>Splitter: </div><div>{splitter}</div>
        <div>Potencia: </div><div>{potencia}</div>
        <div>Splitt.Ad: </div><div>{splitter_ad}</div>

    </div>
  )
}
