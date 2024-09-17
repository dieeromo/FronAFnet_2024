import React, { useState } from 'react'
import Navbar_dashboard from './components/Navbar_dashboard'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useGetUserQuery} from '../services/authDatosApi'
import { setUserDatos } from '../features/authDatosSlice'

import { useDispatch } from 'react-redux'

const Dashboard = () => {
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")


   const {data, isSuccess, isError,isLoading} = useGetUserQuery(user.access)

  
  
   const [render, setRender] = useState(false)
    useEffect(()=>{
        if(isSuccess){
            dispatch(setUserDatos({
                email:data.email, 
                first_name:data.first_name, 
                last_name:data.last_name, 
                is_rectora:data.is_rectora,
                is_investigacion: data.is_investigacion,
                is_vinculacion : data.is_vinculacion,
                is_coor_academica : data.is_coor_academica,
                is_coor_estrategico : data.is_coor_estrategico,
                is_docente : data.is_docente,
                is_estudiante: data.is_estudiante,
                is_administrativo1 : data.is_administrativo1,
                is_administrativo2: data.is_administrativo2,
                is_administrativo3 : data.is_administrativo3,
                is_adminBolsa : data.is_adminBolsa,
                is_adminBiblioteca :  data.is_adminBiblioteca,
                id : data.id,
                is_adminInventario: data.is_adminInventario,
                

            }))
            setRender(true)
        }
        if(isError){
            navigate('/auth')
        }
    })

    
    return (
        <div >
            {render ? 
            <div>
                {/* <Navbar_dashboard/> */}
                <div className='ml-20 mt-10'>
                <h1 className='text-xl '> Bienvenido {userDatos.first_name}</h1>
                <p>Este es el sistema de gestión de AFnet</p>
                
                </div>
                </div>
            
            :<>Cargando...</>
            }
            
            
            
        </div>
    )
}
export default Dashboard


// reporte 4 marzo 0,5 dias