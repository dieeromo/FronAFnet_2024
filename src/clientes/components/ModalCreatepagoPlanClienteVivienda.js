import React from 'react'

import { useState, } from 'react';

import {useGetCajasQuery} from '../../contabilidad/services/contabilidadApi'

import {usePostPagoPlanClienteViviendaMutation} from '../services/clienteViviendaApi'
import Select from "react-select"
import { SlCalculator } from "react-icons/sl";

export default function ModalCreatepagoPlanClienteVivienda({ ordenCobroID }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataCaja, isSuccess: isSuccessCaja } = useGetCajasQuery({ access: user.access })

    const tipo_pago =[
        {
            value:'1',
            label:'Efectivo'
        },
        {
            value:'2',
            label:'Transferencia'
        },
        {
            value:'3',
            label:'deposito'
        },
    ]
    const [tipoPago, setTipoPago] = useState('');




    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };
    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [crearPago] = usePostPagoPlanClienteViviendaMutation()
   

    const guardarCambios = async (e) => {
        e.preventDefault()

        const total = e.target.elements.total.value.trim()

        const rest = {
            orden_cobro: ordenCobroID,
            caja: dataCaja.filter((dato) => dato.usuario === userDatos.id)[0].id,
            subtotal_abono: total,
            iva_abono : total,
            total_abono : total,
            tipo_pago : tipoPago,
        }

        try {
            const viviendaCreada = await crearPago({ access: user.access, rest: rest }).unwrap()

        } catch (error) {
            console.log('ERRROR', error)

        } 
        closeModal()

    }

    return (
        <>
            <button className="bg-gray-100 text-xs hover:bg-green-300 py-1 px-1 rounded" onClick={openModal}>
            <SlCalculator />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nuevo Pago</h3>
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
                                        <label className="block text-sm font-semibold text-gray-500  ">Total:</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            name="total"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Equipo:</label>

                                            <Select
                                                options={tipo_pago}
                                                onChange={(selectedOption) => { setTipoPago(selectedOption.value)
                                                }}
                                                required
                                                className='shadow-md'
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
