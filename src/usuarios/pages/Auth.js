import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../services/authApi'

import { useDispatch } from 'react-redux'
import { setUser } from '../features/authSlice'
//import { setUserDatos } from '../usuarios/features/authDatosSlice'
import { Link } from 'react-router-dom'


// const initialState = {
//     email: "",
//     password: ""
// }

export const Auth = () => {
    const navigate = useNavigate()
    //const [formValue, setFormValue] = useState(initialState)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError }] = useLoginUserMutation()
    console.log(isLoginError)

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser({ email, password })
    };


    useEffect(() => {
        if (isLoginSuccess) {
            dispatch(setUser({ refresh: loginData.refresh, access: loginData.access, time_token: Date.now() }))
            navigate('/dashboard')
        }
    })

    return (
        <div className="">
            <div className=" flex  justify-center mt-10 mb-10">
             
                    <img src="https://institutovicentefierro.edu.ec/wp-content/uploads/2024/01/cropped-Sin-titulo-1.png"
                        alt="Logo"
                        className=" h-14 w-34 mt-30"/>
            </div>
            <div className='inset-0 flex items-center justify-center  bg-opacity-60'>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Ingresar correo"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required

                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Ingresar contraseña"
                        />
                    </div>

                    <div className="mb-4">{/* Additional options or elements here if needed */}</div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Iniciar Sesión
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                            No tienes una cuenta aún?{' '}
                            {/* <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Registrarse
                  </Link> */}

                        </p>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                           
                           <Link to="/landing" className="font-medium  hover:underline dark:text-primary-500">
                    Acceder como visitante
                  </Link> 
                  
                        </p>
                    </div>
                </form>


            </div>
            {isLoginError ? <p className='text-red-500  flex  justify-center'>Usuario o contraseña incorrectos</p>
                :
                <></>}
        </div>
    )
}



export default Auth