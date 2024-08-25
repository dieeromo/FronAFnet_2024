import React from 'react'
import Select from "react-select"
import { useState, } from 'react';

import {

    useGetTipoClienteQuery,
    useGetNacionalidadQuery,
    useGetClienteIDQuery,
    usePutClienteInstaladoMutation

} from '../../../services/clienteClienteApi'
import { SlPencil } from "react-icons/sl"

export default function ModalEditCliente({ clienteID }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataCliente, isSuccess: isSuccessCliente } = useGetClienteIDQuery({ access: user.access, clienteID: clienteID })


    const { data: dataTipo, isSuccess: isSuccessTipo } = useGetTipoClienteQuery({ access: user.access })



    const { data: dataNacionalidad, isSuccess: isSuccessNacionalidad } = useGetNacionalidadQuery({ access: user.access })

    const [nacionalidad, SetNacionalidad] = useState('')
    const [tipoCliente, SetTipoCliente] = useState('')



    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [putCliente] = usePutClienteInstaladoMutation()



    const guardarCambios = async (e) => {
        e.preventDefault()


        const nombresApellidos = e.target.elements.nombresApellidos.value.trim()
        const cedula = e.target.elements.cedula.value.trim()
        const telefono1 = e.target.elements.telefono1.value.trim()
        const telefono2 = e.target.elements.telefono2.value.trim()
        const email = e.target.elements.email.value.trim()
        const observacion = e.target.elements.observacion.value.trim()

        let auxNacionalidad = ''
        if (nacionalidad) {
            auxNacionalidad = nacionalidad
        } else {
            auxNacionalidad = dataCliente.nacionalidadCliente
        }

        let auxTipo = ''
        if (tipoCliente) {
            auxTipo = tipoCliente
        } else {
            auxTipo = dataCliente.tipoCliente
        }


        const rest = {
            ...dataCliente,
            nombresApellidos: nombresApellidos,
            cedula: cedula,
            telefono1: telefono1,
            telefono2: telefono2,
            email:email,
            nacionalidadCliente: auxNacionalidad,
            tipoCliente: auxTipo,
            observacion:observacion,

        }
        putCliente({ access: user.access, clienteID: clienteID, rest: rest })



        closeModal()

    }

    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300 p-1 rounded" onClick={openModal}>
                <SlPencil className='w-3/4' />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Editar cliente</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>

                            {
                                isSuccessCliente ?


                                    <form onSubmit={guardarCambios} method='POST' className='p-5'>




                                        <div className="grid grid-cols-1  gap-2">


                                            <div className="mb-1 mr-1">
                                                <label className="block text-xs font-semibold text-gray-500  ">Nombres y apellidos:</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="nombresApellidos"
                                                    defaultValue={dataCliente.nombresApellidos}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-1 mr-1">
                                                <label className="block text-xs font-semibold text-gray-500  ">Cedula:</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="cedula"
                                                    defaultValue={dataCliente.cedula}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className='grid grid-cols-2'>
                                                <div className="mb-1 mr-1">
                                                    <label className="block text-xs font-semibold text-gray-500  ">Telefono1:</label>
                                                    <input

                                                        type="text"
                                                        name="telefono1"
                                                        defaultValue={dataCliente.telefono1}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </div>


                                                <div className="mb-4 mr-1">
                                                    <label className="block text-xs font-semibold text-gray-500  ">Telefono2:</label>
                                                    <input

                                                        type="text"
                                                        name="telefono2"
                                                        defaultValue={dataCliente.telefono2}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </div>
                                                <div className="mb-1 mr-1">
                                                    <label className="block text-xs font-semibold text-gray-500  ">Email:</label>
                                                    <input
                                                        required
                                                        type="email"
                                                        name="email"
                                                        defaultValue={dataCliente.email}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </div>

                                                {isSuccessNacionalidad && (
                                                    <div className="mb-1">
                                                        <label htmlFor="nacionalidad" className="block text-xs font-semibold text-gray-500  " >Nacionalidad:</label>

                                                        <Select
                                                            options={dataNacionalidad}
                                                            onChange={(selectedOption) => SetNacionalidad(selectedOption.value)}
                                                            defaultValue={{ value: dataCliente.nacionalidadCliente, label: dataCliente.nacionalidadClienteLabel }}
                                                            required
                                                            className='shadow-md'
                                                        />
                                                    </div>


                                                )}


                                                {isSuccessTipo && (
                                                    <div className="mb-1">
                                                        <label htmlFor="nacionalidad" className="block text-xs font-semibold text-gray-500  " >Tipo cliente:</label>

                                                        <Select
                                                            options={dataTipo}
                                                            onChange={(selectedOption) => SetTipoCliente(selectedOption.value)}
                                                            defaultValue={{ value: dataCliente.tipoCliente, label: dataCliente.tipoClienteLabel }}
                                                            required
                                                            className='shadow-md'
                                                        />
                                                    </div>


                                                )}







                                            </div>

                                            <div className="mb-4 mr-1">
                                                    <label className="block text-xs font-semibold text-gray-500  ">Observación:</label>
                                                    <input

                                                        type="text"
                                                        name="observacion"
                                            
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </div>






                                            <button
                                                type="submit"
                                                className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                            >
                                                Guardar
                                            </button>

                                        </div>



                                    </form>
                                    :
                                    <></>
                            }

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
