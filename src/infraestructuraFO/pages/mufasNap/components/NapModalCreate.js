import React from 'react'

import { useState, } from 'react';
import { useGetBarriosQuery, useGetComunidadesQuery } from '../../../../clientes/services/clienteCiudadesApi'
import Select from "react-select"

import {usePostNapMutation} from '../../../services/infraestructuraFOApi'
//import { usePostBarriosMutation } from '../services/clienteCiudadesApi'


export default function NapModalCreate({ id_mufa }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    // const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataBarrio, isSuccess: isSuccessBarrio } = useGetBarriosQuery(user.access)

    const { data: dataComunidad, isSuccess: isSuccessComunidad } = useGetBarriosQuery(user.access)
    const [isBarrioSelected, setIsBarrioSelected] = useState(true); // Control para alternar entre Barrio y Comunidad
    const [barrio, setBarrio] = useState('');
    const [comunidad, setComunidad] = useState('');


    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [crearNap] = usePostNapMutation()

    const guardarCambios = async (e) => {
        e.preventDefault()

        const nombreNap = e.target.elements.nombre.value.trim()
        const splitter = e.target.elements.splitter.value.trim()
        const potencia = e.target.elements.potencia.value.trim()
        const coordenadas = e.target.elements.coordenadas.value.trim()


        const rest = {
            mufa:id_mufa,
            nombreNap: nombreNap,
            splitter: splitter,
            potencia:potencia,
            coordenadas:coordenadas,

            barrio:barrio,
            comunidad:comunidad,
            
        }
        crearNap({ access: user.access, rest: rest })
        closeModal()
    }

    const toggleSelection = () => {
        setIsBarrioSelected(!isBarrioSelected); // Cambia entre barrio y comunidad
    };


    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300  font-bold py-1 px-1 rounded" onClick={openModal}>
                + Nap
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nueva nap</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT' className='p-5'>


                                <div className="grid grid-cols-1  gap-8">


                                    <div className='grid grid-cols-3 gap-2'>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Nombre:</label>
                                            <input
                                                required
                                                type="text"
                                                name="nombre"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Splitter:</label>
                                            <input
                                                required
                                                type="number"
                                                name="splitter"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Potencia:</label>
                                            <input
                                                required
                                                type="text"
                                                name="potencia"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                    </div>


                                    {/* Botón para alternar entre Barrio y Comunidad */}
                                    <div className="flex justify-between items-center">
                                        <span className="block text-sm font-medium text-gray-500">
                                            Seleccione {isBarrioSelected ? 'el barrio' : 'la comunidad'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={toggleSelection}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        >
                                            {/* {isBarrioSelected ? 'Comunidad' : 'Barrio'} */}
                                            Cambiar
                                        </button>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        {isBarrioSelected ?
                                            <div className="mb-3">
                                                <label htmlFor="nacionalidad" className="block text-sm  text-gray-500  " >Barrio:</label>
                                                {isSuccessBarrio ?
                                                    <Select
                                                        options={dataBarrio}
                                                        onChange={(selectedOption) => setBarrio(selectedOption.value)}
                                                        className='shadow-md'
                                                    />
                                                    :
                                                    <>cargando viviendas</>
                                                }

                                            </div>

                                            :
                                            <div className="mb-3">
                                                <label htmlFor="nacionalidad" className="block text-sm  text-gray-500  " >Comunidad:</label>
                                                {isSuccessBarrio ?
                                                    <Select
                                                        options={dataComunidad}
                                                        onChange={(selectedOption) => setComunidad(selectedOption.value)}
                                                        className='shadow-md'
                                                    />
                                                    :
                                                    <>cargando viviendas</>
                                                }

                                            </div>
                                        }

                                        <div className="mb-4 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Instalacion:</label>
                                            <input
                                                required
                                                type="date"
                                                name="fecha_instalacion"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-sm font-semibold text-gray-500  ">Coordenadas:</label>
                                            <input
                                           
                                                type="text"
                                                name="coordenadas"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                    </div>




                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Splitter ad.:</label>
                                        <input
                                      
                                            type="number"
                                            name="splitter_adicional"
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

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
