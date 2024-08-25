import React from 'react'

export default function CiudadButton({ciudad, onClick}) {

  return (
    <button onClick={()=>onClick(ciudad)}      className='bg-gray-200 mx-5'> 
    {ciudad.nombre}
    </button>
  )
}
