import React from 'react'
import Select from "react-select"
import { useState} from 'react';
import {
  
    useGetTipoClienteQuery,
    useGetNacionalidadQuery,

} from '../../../services/clienteClienteApi'
import { useGetOrdenes_idQuery, usePutOrdenInstalacionMutation } from '../../../services/clienteClienteApi'
import { SlArrowUpCircle } from "react-icons/sl";

export default function ModalEstadoOrden({ orden}) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data: dataOrden, isSuccess: isSuccessOrden } = useGetOrdenes_idQuery({ access: user.access, id: orden.id })
    const { data: dataTipo, isSuccess: isSuccessTipo } = useGetTipoClienteQuery({ access: user.access })
    const { data: dataNacionalidad, isSuccess: isSuccessNacionalidad } = useGetNacionalidadQuery({ access: user.access })

  
    const [nacionalidad, SetNacionalidad] = useState(orden.nacionalidadCliente_id)
    const [tipoCliente, SetTipoCliente] = useState(orden.tipoCliente_id)
    const [tipoInstalacion, SetTipoInstalacion] = useState('')
    const [estadoInstalacion, SetEstadoInstalacion] = useState('')
    const [fecha, SetFecha] = useState('');

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

    const opcionesEstado = [
        {
            label: "Instalado",
            value: 2
        },
        {
            label: "No posible",
            value: 3
        }
    ]
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };


    const [cambioEstado] = usePutOrdenInstalacionMutation()
    const guardarCambios = async (e) => {
        e.preventDefault()

        const tempo = {
            ...dataOrden,
            tipoCliente: tipoCliente,
            tipoInstalacion: tipoInstalacion,
            nacionalidadCliente: nacionalidad,
            estado: estadoInstalacion,
            fecha_instalacion: fecha,



        }
        try {
            await cambioEstado({ access:user.access, ordenID:orden.id, rest:tempo }).unwrap()

        } catch (error) {
            console.log('error subida', error)
        }
        closeModal()

    }
    return (
        <>
            <button className=" bg-gray-100 hover:bg-green-300 p-1 rounded" onClick={openModal}>
            <SlArrowUpCircle />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Cambio estado</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT'>

                            <div className="mb-4">
                                            <label className="block text-lg font-semibold text-gray-500 shadow-md ">Fecha Inicio:</label>
                                            <input
                                                type="date"
                                        
                                                onChange={(e) => SetFecha(e.target.value)}
                                                className="w-full p-2 border rounded-md shadow-md "
                                                required
                                            />
                                        </div>

                                    {isSuccessNacionalidad && isSuccessOrden&&(
                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Nacionalidad*:</label>
                                                <Select
                                                    options={dataNacionalidad}
                                                    onChange={(selectedOption) => SetNacionalidad(selectedOption.value)}
                                                    defaultValue={{value:dataOrden.nacionalidadCliente, label:dataOrden.nacionalidadClienteLabel}} 
                                                    required
                                                    className='shadow-md'
                                                />
                                            </div>
                                        )}


                                        {isSuccessTipo && isSuccessOrden &&(
                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Tipo cliente*:</label>

                                                <Select
                                                    options={dataTipo}
                                                    onChange={(selectedOption) => SetTipoCliente(selectedOption.value)}
                                                    defaultValue={{value:dataOrden.tipoCliente,label:dataOrden.tipoClienteLabel}} 
                                                    required
                                                    className='shadow-md'
                                                />
                                            </div>


                                        )}
                                        <div className="mb-1">
                                            <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Tipo instalacion*:</label>

                                            <Select
                                                options={opcionesInstalacion}
                                                onChange={(selectedOption) => SetTipoInstalacion(selectedOption.value)}
                                                //defaultValue={{value:responsableID,label:responsableName}} 
                                                required
                                                className='shadow-md'
                                            />
                                        </div>

                                        <div className="mb-1">
                                            <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Estado instalacion*:</label>

                                            <Select
                                                options={opcionesEstado}
                                                onChange={(selectedOption) => SetEstadoInstalacion(selectedOption.value)}
                                                //defaultValue={{value:responsableID,label:responsableName}} 
                                                required
                                                className='shadow-md'
                                            />
                                        </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
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
