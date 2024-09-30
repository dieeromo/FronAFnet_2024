import React from 'react'
import Select from "react-select"
import { useState, } from 'react';
import { IVAEcuador } from '../../ApiRoutes'


import {
    useGetPlanesQuery,
    usePutPlanClienteVviendaMutation,
    useGetPlanClienteViviendaIDQuery,
    usePostOrdenCobroPlanClienteViviendaMutation
} from '../services/clienteViviendaApi'

function obtenerDiasEnMes(mes, anio) {
    return new Date(anio, mes, 0).getDate();
}

export default function ModalGenerarOrdenIndividual({ planClienteViviendaID, planID, planName }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataPlanes, isSuccess: isSuccessPlanes } = useGetPlanesQuery({ access: user.access })

    const { data: dataPlanClienteVivienda, isSuccess: isSuccessPlanClienteVivienda } = useGetPlanClienteViviendaIDQuery({ access: user.access, planClienteViviendaID: planClienteViviendaID })
    const [fechaInicio, SetFechaInicio] = useState('');
    const [fechaFin, SetFechaFin] = useState('');



    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [cambioPlanClienteVivienda] = usePutPlanClienteVviendaMutation()
    const [crearOrdenCobro] = usePostOrdenCobroPlanClienteViviendaMutation()


    const guardarCambios = async (e) => {
        e.preventDefault()

        let plan_anterior = dataPlanClienteVivienda.plan

        const tempo = {
            ...dataPlanClienteVivienda,
            estadoGeneracionPagos: 1,

        }

        let mes_generacion = new Date(fechaInicio)

        const diasDelMes = obtenerDiasEnMes(mes_generacion.getUTCMonth() +1,mes_generacion.getFullYear());  // Enero 2024

   

        let valor_subtotal1 = dataPlanClienteVivienda.planValor / 1 
        let valor_iva1 = valor_subtotal1 * IVAEcuador
        let valor_total1 = valor_subtotal1 + valor_iva1
        const orden = {
            planClienteVivienda: dataPlanClienteVivienda.id,
            fecha_generacion: fechaInicio,
            fecha_vencimiento: dataPlanClienteVivienda.fecha_pago,
            valor_subtotal: valor_subtotal1.toFixed(2),
            valor_iva: valor_iva1.toFixed(2),
            valor_total: valor_total1.toFixed(2),
            mes_pago_servicio: fechaInicio,
            dias_consumo: diasDelMes,
            plan : dataPlanClienteVivienda.plan
        }



        try {
            const viviendaPlanCreada = await cambioPlanClienteVivienda({ access: user.access, rest: tempo, ID: planClienteViviendaID }).unwrap()
            crearOrdenCobro({ access: user.access, rest: orden, })

        } catch (error) {
            console.log('ERRROR', error)

        }
        closeModal()

    }

    return (
        <>
            <button className="bg-green-400 mx-2  hover:bg-green-600   font-bold text-xs py-1 px-1 rounded" onClick={openModal}>
                + Generar
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Generar orden cobro</h3>
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
                                            <label className="block text-lg font-semibold text-gray-500 shadow-md ">Fecha Inicio:</label>
                                            <input
                                                type="date"
                                                name="fecha_inicio"
                                                onChange={(e) => SetFechaInicio(e.target.value)}
                                                className="w-full p-2 border rounded-md shadow-md "
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-lg font-semibold text-gray-500 shadow-md ">Fecha Inicio:</label>
                                            <input
                                                type="date"
                                                name="fecha_inicio"
                                                onChange={(e) => SetFechaFin(e.target.value)}
                                                className="w-full p-2 border rounded-md shadow-md "
                                                required
                                            />
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
