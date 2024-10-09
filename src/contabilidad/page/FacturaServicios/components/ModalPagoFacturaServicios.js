import React, { useState } from 'react';
import { usePostPagoFacturaServicioMutation } from '../../../services/facturaServiciosApi';
import { useGetCajasQuery, useGetModoPagoQuery } from '../../../services/contabilidadApi';
import Select from 'react-select';

export default function ModalPagoFacturaServicios({ facturaID, pendiente }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || '{}');

    const { data: dataCaja, isSuccess: isSuccessCaja } = useGetCajasQuery({ access: user.access });
    const { data: dataModoPago, isSuccess: isSuccessModoPago } = useGetModoPagoQuery({ access: user.access });
    const [modoPago, setModoPago] = useState('');
    const [caja, setCaja] = useState('');
    const [abono, setAbono] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [crearAbono] = usePostPagoFacturaServicioMutation();

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setModoPago('');
        setCaja('');
        setAbono('');
    };

    const guardarCambios = async (e) => {
        e.preventDefault();
        const fecha_pago = e.target.elements.fecha_pago.value.trim();
        const observacion = e.target.elements.observacion.value.trim();

        const rest = {
            facturaServicios: facturaID,
            abono,
            caja,
            fecha_pago,
            observacion,
            modoPago,
        };
        crearAbono({ access: user.access, rest: rest })
        closeModal()
    };

    return (
        <>
            <button className="bg-blue-300 text-xs hover:bg-green-300 py-1 px-1 rounded" onClick={openModal}>
                +Pago
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Pago factura</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>

                            <form onSubmit={guardarCambios} method="PUT" className="p-5">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Abono: {pendiente} USD</label>
                                    <input
                                        required
                                        value={abono}
                                        type="number"
                                        name="abono"
                                        onChange={(e) => setAbono(Number(e.target.value))}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Fecha:</label>
                                    <input
                                        required
                                        type="date"
                                        name="fecha_pago"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Observacion:</label>
                                    <input
                                        type="text"
                                        name="observacion"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Caja:</label>
                                    {isSuccessCaja ? (
                                        <Select
                                            options={dataCaja}
                                            onChange={(selectedOption) => setCaja(selectedOption.value)}
                                            required
                                            className="shadow-md"
                                        />
                                    ) : (
                                        <p>Cargando cajas...</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Modo pago:</label>
                                    {isSuccessModoPago ? (
                                        <Select
                                            options={dataModoPago}
                                            onChange={(selectedOption) => setModoPago(selectedOption.value)}
                                            required
                                            className="shadow-md"
                                        />
                                    ) : (
                                        <p>Cargando modos de pago...</p>
                                    )}
                                </div>

                                {abono && abono <= pendiente ? (
                                    <button
                                        type="submit"
                                        className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Guardar
                                    </button>
                                ) : (
                                    <span>El abono no puede ser mayor al pendiente</span>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
        </>
    );
}
