import React from 'react'
import Select from "react-select"
import {useGet_cajaNap_crudQuery} from '../../infraestructuraFO/services/infraestructuraFOApi'
import { useGetAP_nodos_crudQuery} from '../../mikrotik/services/mikrotikAPI'
import {usePostMikrotik_Plan_ClienteMutation} from '../../mikrotik/services/mikrotikAPI'

import { useState, } from 'react';



export default function AsignarConexionModal({ planClienteViviendaID }) {



    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const {data:dataNap, isSuccess:isSuccessNap} = useGet_cajaNap_crudQuery({access:user.access})
    const {data:dataAP, isSuccess:isSuccessAP}=  useGetAP_nodos_crudQuery({access:user.access})

    const [crearConexion]= usePostMikrotik_Plan_ClienteMutation()
    

    const [nap, setNap] = useState('');
    const [AP, setAP] = useState('');



    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };



    const guardarCambios = async (e) => {
        e.preventDefault()
        const ipv4 = e.target.elements.ipv4.value.trim()
        const observacion = e.target.elements.observacion.value.trim()
        const nuevaConexion ={
            planCliente :planClienteViviendaID,
            ap : AP,
            caja: nap,
            ipv4_address: ipv4,
            observacion: observacion
        }
        try{
            crearConexion({access:user.access, rest:nuevaConexion})

        }catch(error){

        }
        closeModal()

    }

    return (
        <>
            <button className="bg-blue-300 mx-2 hover:bg-blue-400  font-bold py-1 px-1 rounded text-xs" onClick={openModal}>
                + Conexion
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Conexion</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT' className='p-5'>


                            <div className="mb-4 ml-4">
                                <label className="ml-2 text-xs">Nap:</label>
                                {isSuccessNap ?
                                    <Select
                                        options={dataNap}
                                        onChange={(selectedOption) => setNap(selectedOption.value)}
                                        className="px-4 py-1  text-xs"
                                    />
                                    :
                                    <>Cargando Nap...</>
                                }

                            </div>


                            <div className="mb-4 ml-4">
                                <label className="ml-2 text-xs">AP:</label>
                                {isSuccessAP ?
                                    <Select
                                        options={dataAP}
                                        onChange={(selectedOption) => setAP(selectedOption.value)}
                                        className="px-4 py-1  text-xs"
                                    />
                                    :
                                    <>Cargando AP...</>
                                }

                            </div>


                            <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">IP v4:</label>
                                        <input
                                 
                                            type="text"
                                            name="ipv4"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                <div className="grid grid-cols-1  gap-8">




                            



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
