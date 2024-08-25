import React from 'react'
import {useGetBarrios_ciudadQuery} from '../services/clienteCiudadesApi'
export default function Prueba() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const {data} = useGetBarrios_ciudadQuery({access:user.access, ciudad_id:1})
    console.log(data)
  return (
    <div>Prueba</div>
  )
}
