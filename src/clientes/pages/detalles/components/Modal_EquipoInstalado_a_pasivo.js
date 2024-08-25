import React from 'react'
import Select from "react-select"
import { useState, } from 'react';

import { usePutEquipoInstado_a_pasivoMutation } from '../../../services/clienteViviendaApi'
import { useGetBodegaQuery, useGetEquipoIDQuery, usePutEquipoBodegaMutation } from '../../../../inventario/services/inventarioApi'
import ErrorNotification from '../../../../inventario/components/ErrorNotification'
export default function Modal_EquipoInstalado_a_pasivo({ equipoInstaladoID, equipoID }) { // es el ID de la tabla equipo instalado

    const user = JSON.parse(localStorage.getItem('user') || "{}")


    const { data: dataBodega, isSuccess: isSuccessBodega } = useGetBodegaQuery({ access: user.access })

    const [bodega, setBodega] = useState('');


    const { data: dataEquipo, isSuccess: isSuccessEquipo } = useGetEquipoIDQuery({ access: user.access, equipoID: equipoID })
    const [fecha_retiro, SetFecha_retiro] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };
    const [showError, setShowError] = useState(false);
    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [equipo_a_pasivo] = usePutEquipoInstado_a_pasivoMutation()
    const [cambio_bodega] = usePutEquipoBodegaMutation()

    const guardarCambios = async (e) => {
        e.preventDefault()
        //estado = 2  => es pasivo
        const tempo = {
            ...dataEquipo,
            bodega: bodega,
            fecha_retiro: fecha_retiro,
        }
        try {
            const equipoBajado_aPasivo = await equipo_a_pasivo({ access: user.access, estado: 2, equipoInstaladoID: equipoInstaladoID, fecha_retiro: fecha_retiro }).unwrap()

            const cambio_bodega_ejecutado = await cambio_bodega({ access: user.access, equipoID: equipoID, bodega: bodega })



        } catch (error) {
            setShowError(true)


        }
        closeModal()

    }

    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300  font-bold py-1 px-1 rounded" onClick={openModal}>
                X
            </button>


            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">

                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Desinstalar equipo</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>




                            <form onSubmit={guardarCambios} method='PUT' className='p-5'>

                            <div className="mb-4 ml-4">
                                <label className="ml-2 text-xs">Bodega  de reingreso:</label>
                                {isSuccessBodega ?
                                    <Select
                                        options={dataBodega}
                                        onChange={(selectedOption) => setBodega(selectedOption.value)}
                                        className="px-4 py-1  text-xs"
                                    />
                                    :
                                    <>cargando bosegas</>
                                }

                            </div>

                              

                                    <div className="mb-1">
                                        <label htmlFor="fecha_limite" className="block text-xs font-semibold text-gray-500 shadow-md ">Fecha:</label>
                                        <input
                                            type="date"
                                            name="fecha_retiro"
                                            onChange={(e) => SetFecha_retiro(e.target.value)}
                                            className="w-full p-2 border rounded-md shadow-md "
                                            required
                                        />
                                    </div>

                           


                                <div className="grid grid-cols-1  gap-8">


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
                    {showError && (<ErrorNotification message={'algo salio mal mmaaaaal'} />)}
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
