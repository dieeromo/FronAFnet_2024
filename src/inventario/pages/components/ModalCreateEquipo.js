import React from 'react'
import Select from "react-select"
import { useState, } from 'react';
import {useGetBodegaQuery,useGetHomologadoQuery, usePostEquipoIngresoMutation} from '../../services/inventarioApi'



export default function ModalCreateEquipo({facturaID}) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

   const { data: dataBodega, isSuccess: isSuccessBodega } = useGetBodegaQuery({ access: user.access })
   const { data: dataHomologado, isSuccess: isSuccessHomologado } = useGetHomologadoQuery({ access: user.access })

   const [bodega, SetBodega] = useState('');
   const [homologado, SetHomologado] = useState('');
   
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [proveedor, SetProveedor] = useState('');


    const [crearEquipo] = usePostEquipoIngresoMutation()
    const guardarCambios = async (e) => {
        e.preventDefault()

        const serie = e.target.elements.serie.value.trim()
        const precio_compra = e.target.elements.precio_compra.value.trim()
        const fecha_ingreso = e.target.elements.fecha_ingreso.value.trim()
        const observacion = e.target.elements.observacion.value.trim()
        const estado = 1 // 1: nuevo, 2:usado, 3:dañado
        const estado2 = 1 // 1:No instalado, 2:instalado, 3:vendido

        const rest = {
            factura: facturaID,
            homologado: homologado,
            serie:serie,
            precio_compra:precio_compra,
            bodega:bodega,
            estado:estado,
            estado2:estado2,
            fecha_ingreso:fecha_ingreso,
            observacion:observacion,
            digitador:userDatos.id
        


        }
        crearEquipo({ access: user.access, rest: rest })



        closeModal()

    }

    return (
        <>
            <button className="bg-gray-100 mr-5 hover:bg-green-400  font-bold py-1 px-1 rounded" onClick={openModal}>
                + Equipo
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nueva factura</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT' className='p-5'>


                                <div className="grid grid-cols-2  gap-8">

                                <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Bodega:</label>
                                        {isSuccessBodega?
                                            <Select
                                                options={dataBodega}
                                                onChange={(selectedOption) => SetBodega(selectedOption.value)}
                                                required
                                                className='shadow-md'
                                            />
                                            :
                                            <>cargando proveedores</>
                                        }

                                    </div>


                                    <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Equipo:</label>
                                        {isSuccessHomologado?
                                            <Select
                                                options={dataHomologado}
                                                onChange={(selectedOption) => SetHomologado(selectedOption.value)}
                                                required
                                                className='shadow-md'
                                            />
                                            :
                                            <>cargando proveedores</>
                                        }

                                    </div>



                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Serie:</label>
                                        <input
                                            required
                                            type="text"
                                            name="serie"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Precio compra:</label>
                                        <input
                                            required
                                            type="number"
                                            name="precio_compra"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Fecha ingreso:</label>
                                        <input
                                            required
                                            type="date"
                                            name="fecha_ingreso"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 mr-1">
                                    <label className="block text-sm font-semibold text-gray-500  ">Observación:</label>
                                    <input
                                     
                                        type="text"
                                        name="observacion"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>




                                </div>

                             






                                <button
                                    type="submit"
                                    className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Guardar
                                </button>





                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
