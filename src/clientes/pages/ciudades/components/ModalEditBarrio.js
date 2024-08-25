import React from 'react'
import { useState, } from 'react';
import {usePutBarriosMutation, useGetBarrio_IDQuery} from '../../../services/clienteCiudadesApi'

import { SlPencil } from "react-icons/sl"

export default function ModalEditBarrio({ barrioID }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    //const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataBarrio, isSuccess: isSuccessBarrio } = useGetBarrio_IDQuery({ access: user.access, barrioID:barrioID})



    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [putBarrio] = usePutBarriosMutation()



    const guardarCambios = async (e) => {
        e.preventDefault()


        const barrio = e.target.elements.barrio.value.trim()


     

        const rest = {
            ...dataBarrio,
            nombre:barrio
        }
        putBarrio({ access: user.access, barrioID:barrioID, rest: rest })



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
                                <h3 className="text-lg font-semibold"> Editar barrio</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>

                            {
                                isSuccessBarrio ?


                                    <form onSubmit={guardarCambios} method='POST' className='p-5'>




                                        <div className="grid grid-cols-1  gap-2">


                                            <div className="mb-1 mr-1">
                                                <label className="block text-xs font-semibold text-gray-500  ">Barrio:</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="barrio"
                                                    defaultValue={dataBarrio.nombre}
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
