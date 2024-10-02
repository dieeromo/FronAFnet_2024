
import React from 'react'
import { useState, } from 'react';
import Select from 'react-select'
import {usePutPlanClienteVviendaMutation, useGetPlanClienteViviendaIDQuery} from '../services/clienteViviendaApi'

export default function ModalCambioEstadoPlan({ planID }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
   // const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
   const {data, isSuccess}= useGetPlanClienteViviendaIDQuery({access: user.access, planClienteViviendaID: planID})
   const [estadoPlan, setEstadoPlan] = useState('');
   const [cambiarEstado] = usePutPlanClienteVviendaMutation()

   const estados = [

    {
        value : 1,
        label : 'Activo'
    },
    {
        value : 2,
        label : 'Activo - Cortado: Antes de 8 días'
    },
    {
        value : 3,
        label : 'Suspendido - Cortado: Pasado de 8 días'
    },
    {
        value : 4,
        label : 'Suspendido - Activo: Suspendido por solicitud'
    },
    {
        value : 5,
        label : 'Finalizado'
    },
   ]

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

   

    const guardarCambios = async (e) => {
        e.preventDefault()
        const confirmado = window.confirm("¿Estás seguro de cambiar el estado?");
        let estado = data.estado
        let estadoServicio = data.estadoServicio
        if (estadoPlan==1){
            estado = 1
            estadoServicio = 1
        }
        else if(estadoPlan==2){
            estado = 1
            estadoServicio = 2
        }
        else if(estadoPlan==3){
            estado = 2
            estadoServicio = 2
        }
        else if(estadoPlan==4){
            estado = 2
            estadoServicio = 1
        }
        else if(estadoPlan==5){
            estado = 3
   
        }
  
        if (confirmado){

            const rest = {
                ...data,
                estado: estado,
                estadoServicio: estadoServicio,
    
            }
            cambiarEstado({access:user.access, rest: rest, ID:planID})
    
            closeModal()

        }

    }

    return (
        <>
            <button className="bg-red-500 text-xs hover:bg-red-700 text-white  font-bold py-1 px-1 rounded ml-5" onClick={openModal}>
                + Cambio estado plan
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Seleccione el nuevo estado</h3>
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
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Seleccione el estado del plan:</label>

                                            <Select
                                                options={estados}
                                                onChange={(selectedOption) => { setEstadoPlan(selectedOption.value)
                                                }}
                                                required
                                              className='text-xs'
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
