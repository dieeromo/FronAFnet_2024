import React from 'react'
import Select from "react-select"
import { useState, } from 'react';


import {  
    useGetPlanesQuery,
    usePutPlanClienteVviendaMutation, 
    useGetPlanClienteViviendaIDQuery,
    usePutClienteViendaMutation,
    useGetClienteVivienda_clienteQuery,
    useGetClienteVivienda_IDQuery
} from '../services/clienteViviendaApi'



export default function  ModalCambioDomicilio({ planClienteViviendaID, clienteID,clienteViviendName,clienteViviendaID }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataPlanes, isSuccess: isSuccessPlanes } = useGetPlanesQuery({access:user.access})
    const { data: dataPlanClienteVivienda, isSuccess: isSuccessPlanClienteVivienda} = useGetPlanClienteViviendaIDQuery({access:user.access,planClienteViviendaID:planClienteViviendaID})
    
    const { data:dataClienteVivienda, isSuccess:isSuccessClienteVivienda}=useGetClienteVivienda_clienteQuery({access:user.access,clienteID:clienteID})
    const { data:dataClienteViviendaID, isSuccess:isSuccessClienteViviendaID}=useGetClienteVivienda_IDQuery({access:user.access, clienteViviendaID:clienteViviendaID})
    
    const [fechaCambio, SetFechaCambio] = useState('');

    const [clienteVivienda, SetClienteVivienda] = useState('')

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [cambioDomicilioClienteVivienda] = usePutPlanClienteVviendaMutation()
    const [finClienteVivienda]= usePutClienteViendaMutation()


    const guardarCambios = async (e) => {
        e.preventDefault()

        const tempo = {
            ...dataPlanClienteVivienda,
            clienteVivienda:clienteVivienda,
        }
        const tempo2 = {
            ...dataClienteViviendaID,
            fecha_fin:fechaCambio,
        }


        try {
            const viviendaPlanCreada = await cambioDomicilioClienteVivienda({ access: user.access, rest: tempo, ID:planClienteViviendaID }).unwrap()
            await finClienteVivienda({ access: user.access, rest: tempo2, ID:clienteViviendaID  })


        } catch (error) {
            console.log('ERRROR', error)

        }
        closeModal()

    }

    return (
        <>
            <button className="bg-orange-300  mx-2 hover:bg-orange-500  font-bold text-xs py-1 px-1 rounded" onClick={openModal}>
                + Cambio Domicilio
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nuevo Plan</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='POST' className='p-5'>


                                <div className="grid grid-cols-1  gap-2">


                                    <div className='grid grid-cols-2'>

                                      

                                            <div className="mb-4">
                                                <label  className="block text-lg font-semibold text-gray-500 shadow-md ">Fecha cambio:</label>
                                                <input
                                                    type="date"
                                                    name="fechaCambio"
                                                    onChange={(e) => SetFechaCambio(e.target.value)}
                                                    className="w-full p-2 border rounded-md shadow-md "
                                                    required
                                                />
                                            </div>


                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Vivienda:</label>
                                                {isSuccessClienteVivienda ? 
                                                    <Select
                                                    options={dataClienteVivienda}
                                                    onChange={(selectedOption) => SetClienteVivienda(selectedOption.value)}
                                                    defaultValue={{value:clienteViviendaID,label:clienteViviendName}} 
                                                    required
                                                    className='shadow-md'
                                                />
                                                :
                                                <>cargando viviendas</>
                                                }

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
