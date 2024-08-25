import React from 'react'
import Select from "react-select"
import { useState, } from 'react';

import {
    usePostOrdenInstalacionMutation,
    useGetTipoClienteQuery,
    useGetNacionalidadQuery,

} from '../../../services/clienteClienteApi'

export default function ModalCreateOrden() {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataTipo, isSuccess: isSuccessTipo } = useGetTipoClienteQuery({ access: user.access })

    const { data: dataNacionalidad, isSuccess: isSuccessNacionalidad } = useGetNacionalidadQuery({ access: user.access })

    const [nacionalidad, SetNacionalidad] = useState('')
    const [tipoCliente, SetTipoCliente] = useState('')
    const [tipoInstalacion, SetTipoInstalacion] = useState('')

    const opcionesInstalacion = [
        {
            label: "Normal",
            value: 1
        },
        {
            label: "Cambio operadora",
            value: 2
        }
    ]

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [crearOrdenInstalacion] = usePostOrdenInstalacionMutation()

    const guardarCambios = async (e) => {
        e.preventDefault()

       
        const nombresApellidos = e.target.elements.nombresApellidos.value.trim()
        const cedula = e.target.elements.cedula.value.trim()
        const telefono1 = e.target.elements.telefono1.value.trim()
        const telefono2 = e.target.elements.telefono2.value.trim()
        const direccion = e.target.elements.direccion.value.trim()

        const rest = {
            nombresApellidos: nombresApellidos,
            cedula: cedula,
            telefono1: telefono1,
            telefono2: telefono2,
            tipoCliente: tipoCliente,
            tipoInstalacion: tipoInstalacion,
            nacionalidadCliente: nacionalidad,
            direccion:direccion,
            digitador: userDatos.id,


        }
        crearOrdenInstalacion({ access: user.access, rest: rest })



        closeModal()

    }

    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300  font-bold py-1 px-1 rounded" onClick={openModal}>
                + Orden
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nueva orden</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='POST' className='p-5'>


                                <div className="grid grid-cols-1  gap-2">


                                    <div className="mb-1 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Nombres y apellidos:</label>
                                        <input
                                            required
                                            type="text"
                                            name="nombresApellidos"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-1 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Cedula:</label>
                                        <input
                                            required
                                            type="text"
                                            name="cedula"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className='grid grid-cols-2'>
                                        <div className="mb-1 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Telefono1:</label>
                                            <input
                                                required
                                                type="text"
                                                name="telefono1"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>


                                        <div className="mb-4 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Telefono2:</label>
                                            <input
                                               
                                                type="text"
                                                name="telefono2"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        {isSuccessNacionalidad && (
                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Nacionalidad:</label>

                                                <Select
                                                    options={dataNacionalidad}
                                                    onChange={(selectedOption) => SetNacionalidad(selectedOption.value)}
                                                    //defaultValue={{value:responsableID,label:responsableName}} 
                                                    required
                                                    className='shadow-md'
                                                />
                                            </div>


                                        )}


                                        {isSuccessTipo && (
                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Tipo cliente:</label>

                                                <Select
                                                    options={dataTipo}
                                                    onChange={(selectedOption) => SetTipoCliente(selectedOption.value)}
                                                    //defaultValue={{value:responsableID,label:responsableName}} 
                                                    required
                                                    className='shadow-md'
                                                />
                                            </div>


                                        )}


                                        <div className="mb-1">
                                            <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Tipo instalacion:</label>

                                            <Select
                                                options={opcionesInstalacion}
                                                onChange={(selectedOption) => SetTipoInstalacion(selectedOption.value)}
                                                //defaultValue={{value:responsableID,label:responsableName}} 
                                                required
                                                className='shadow-md'
                                            />
                                        </div>
                                        <div className="mb-1 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Direccion:</label>
                                        <input
                                            required
                                            type="text"
                                            name="direccion"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>




                                    </div>






                                    <button
                                        type="submit"
                                        className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Guardar
                                    </button>

                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
