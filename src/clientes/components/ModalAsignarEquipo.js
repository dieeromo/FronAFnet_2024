import React from 'react'
import Select from "react-select"

import { useState, } from 'react';
import { useGetEquipo_NoInstaladoQuery,usePostEquipoInstaladoMutation } from '../services/clienteViviendaApi'


export default function ModalAsignarEquipo({ planClienteViviendaID }) {



    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataEquipoNoInstalado, isSuccess: isSuccessEquipoNoInstalado } = useGetEquipo_NoInstaladoQuery({ access: user.access })


    const motivos =[
        {
            value:'1',
            label:'Instalacion'
        },
        {
            value:'2',
            label:'x Equipo dañado'
        },
        {
            value:'3',
            label:'x upgrade'
        },
        {
            value:'4',
            label:'Otro'
        },

    ]

    const [equipo, setEquipo] = useState('');
    const [motivo, setMotivo] = useState('');
    const [condicion, setCondicion] = useState('');



    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [asignarEquipo] = usePostEquipoInstaladoMutation()

    const guardarCambios = async (e) => {
        e.preventDefault()
        const fecha_instalacion = e.target.elements.fecha_instalacion.value.trim()
        const observacion = e.target.elements.observacion.value.trim()
        const rest = {
            equipo: equipo,
            planClienteVivienda: planClienteViviendaID,
            fecha_instalacion:fecha_instalacion,
            motivo:motivo,
            condicion:condicion,
            observacion: observacion,
            digitador: userDatos.id




        }
        asignarEquipo({ access: user.access, rest: rest })



        closeModal()

    }

    return (
        <>
            <button className="bg-blue-300 mx-2 hover:bg-blue-400  font-bold py-1 px-1 rounded text-xs" onClick={openModal}>
                + Equipo
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nuevo Equipo</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT' className='p-5'>


                                <div className="grid grid-cols-1  gap-8">

                                    <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Equipo:</label>
                                        {isSuccessEquipoNoInstalado ?
                                            <Select
                                                options={dataEquipoNoInstalado}
                                                onChange={(selectedOption) => {
                                                    setEquipo(selectedOption.value)
                                                    setCondicion(selectedOption.estado)
                                                   
                                                }}
                                                required
                                                className='shadow-md'
                                            />
                                            :
                                            <>cargando equipos</>
                                        }

                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Fecha:</label>
                                        <input
                                            required
                                            type="date"
                                            name="fecha_instalacion"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>


                                    <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Motivo:</label>
                               
                                            <Select
                                                options={motivos}
                                                onChange={(selectedOption) => setMotivo(selectedOption.value)}

                                                required
                                                className='shadow-md'
                                            />
                                  

                                    </div>



                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Observacion:</label>
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

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
