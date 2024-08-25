import React from 'react'
import Select from "react-select"
import { useState, } from 'react';

import {
    usePostFacturaEquipoMutation,
    useGetProveedorEquipoQuery,
    useGetModoCompraQuery,
    useGetPresupuestoQuery,
} from '../../../services/contabilidadApi'

export default function ModalCreatefacturaEquipo() {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataProveedor, isSuccess: isSuccessProveedor } = useGetProveedorEquipoQuery({ access: user.access })
    const { data: dataModoC, isSuccess: isSuccessModoC } = useGetModoCompraQuery({ access: user.access })
    const { data: dataPresupuesto, isSuccess: isSuccessPresupuesto } = useGetPresupuestoQuery({ access: user.access })
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [proveedor, SetProveedor] = useState('');
    const [modoC, SetModoC] = useState('');
    const [presupuesto, SetPresupuesto] = useState('');

    const [crearFactura] = usePostFacturaEquipoMutation()
    const guardarCambios = async (e) => {
        e.preventDefault()

        const nFactura = e.target.elements.nFactura.value.trim()
        const emision = e.target.elements.emision.value.trim()
        const descripcion = e.target.elements.descripcion.value.trim()
        const valor = e.target.elements.valor.value.trim()

        const rest = {
            proveedor:proveedor,
            fecha_emision:emision,
            numeroFactura:nFactura,
            descripcion:descripcion,
            valor:valor,
            modoCompra:modoC,
            inventario:isChecked,
            presupuesto:presupuesto,
            digitador:userDatos.id



        }
        crearFactura({ access: user.access, rest: rest })



        closeModal()

    }

    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300  font-bold py-1 px-1 rounded" onClick={openModal}>
                + Factura
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
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Proveedor:</label>
                                        {isSuccessProveedor ?
                                            <Select
                                                options={dataProveedor}
                                                onChange={(selectedOption) => SetProveedor(selectedOption.value)}
                                                required
                                                className='shadow-md'
                                            />
                                            :
                                            <>cargando proveedores</>
                                        }

                                    </div>


                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  "># factura:</label>
                                        <input
                                            required
                                            type="text"
                                            name="nFactura"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Valor:</label>
                                        <input
                                            required
                                            type="number"
                                            name="valor"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-semibold text-gray-500  ">Emisión:</label>
                                        <input
                                            required
                                            type="date"
                                            name="emision"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 mr-1">
                                    <label className="block text-sm font-semibold text-gray-500  ">Descripcion:</label>
                                    <input
                                        required
                                        type="text"
                                        name="descripcion"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>

                                    <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Modo compra:</label>
                                        {isSuccessModoC ?
                                            <Select
                                                options={dataModoC}
                                                onChange={(selectedOption) => SetModoC(selectedOption.value)}
                                                required
                                                className='shadow-md'
                                            />
                                            :
                                            <>cargando proveedores</>
                                        }

                                    </div>

                                    <div className="mb-1">
                                        <label htmlFor="nacionalidad" className="block text-lg font-semibold text-gray-500  " >Presupuesto:</label>
                                        {isSuccessModoC ?
                                            <Select
                                                options={dataPresupuesto}
                                                onChange={(selectedOption) => SetPresupuesto(selectedOption.value)}
                                                required
                                                className='shadow-md'
                                            />
                                            :
                                            <>cargando proveedores</>
                                        }

                                    </div>


                                </div>

                                <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activo">
            Inventario
          </label>
          <input
            type="checkbox"
            id="activo"
            name="activo"
            className="mr-2 leading-tight"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="text-gray-700">{isChecked ? 'Verdadero' : 'Falso'}</span>
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
