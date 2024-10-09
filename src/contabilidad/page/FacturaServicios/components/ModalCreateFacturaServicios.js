import React, { useState } from 'react';
import Select from 'react-select';
import { usePostFacturaServicioMutation, useGetProveedorEquipoQuery, useGetModoCompraQuery, useGetPresupuestoQuery, useGetServicioQuery } from '../../../services/facturaServiciosApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function ModalCreateFacturaServicios() {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}");

    const { data: dataProveedor, isSuccess: isSuccessProveedor } = useGetProveedorEquipoQuery({ access: user.access });
    const { data: dataModoC, isSuccess: isSuccessModoC } = useGetModoCompraQuery({ access: user.access });
    const { data: dataPresupuesto, isSuccess: isSuccessPresupuesto } = useGetPresupuestoQuery({ access: user.access });
    const { data: dataServicio, isSuccess: isSuccessServicio } = useGetServicioQuery({ access: user.access });

    const [mesPago, setMesPago] = useState(new Date());
    const [proveedor, setProveedor] = useState('');
    const [modoC, setModoC] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    const [servicio, setServicio] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [crearFactura] = usePostFacturaServicioMutation();

    const guardarCambios = async (e) => {
        e.preventDefault();

        const emision = e.target.elements.emision.value.trim();
        const fechaLimitePago = e.target.elements.fechaLimitePago.value.trim();
        const descripcion = e.target.elements.descripcion.value.trim();
        const valor = e.target.elements.valor.value.trim();

        const rest = {
            proveedor,
            servicio,
            mes_pago: format(mesPago, 'yyyy-MM-01'),  // format to store the first day of the selected month
            fecha_emision: emision,
            fecha_limite_pago: fechaLimitePago,
            descripcion,
            valor,
            modoCompra: modoC,
            presupuesto,
            digitador: userDatos.id,
        };

        crearFactura({ access: user.access, rest });
        closeModal();
    };

    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300 font-bold py-1 px-1 rounded" onClick={openModal}>
                + Factura Servicios
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold">Nueva factura de servicios</h3>
                                <button onClick={closeModal} className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>
                            <form onSubmit={guardarCambios} method="PUT" className="p-5">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-1">
                                        <label className="block text-lg font-semibold text-gray-500">Proveedor:</label>
                                        {isSuccessProveedor ? (
                                            <Select options={dataProveedor} onChange={(selectedOption) => setProveedor(selectedOption.value)} required className="shadow-md" />
                                        ) : (
                                            <>Cargando proveedores...</>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-lg font-semibold text-gray-500">Servicio:</label>
                                        {isSuccessServicio ? (
                                            <Select options={dataServicio} onChange={(selectedOption) => setServicio(selectedOption.value)} required className="shadow-md" />
                                        ) : (
                                            <>Cargando servicios...</>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-500">Fecha de emisión:</label>
                                        <input required type="date" name="emision" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-500">Fecha límite de pago:</label>
                                        <input type="date" name="fechaLimitePago" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-500">Valor:</label>
                                        <input required type="number" name="valor" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Mes de pago:</label>
                                    <DatePicker
                                        selected={mesPago}
                                        onChange={(date) => setMesPago(date)}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-500">Descripción:</label>
                                    <input type="text" name="descripcion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-1">
                                        <label className="block text-lg font-semibold text-gray-500">Modo de compra:</label>
                                        {isSuccessModoC ? (
                                            <Select options={dataModoC} onChange={(selectedOption) => setModoC(selectedOption.value)} required className="shadow-md" />
                                        ) : (
                                            <>Cargando modos de compra...</>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-lg font-semibold text-gray-500">Presupuesto:</label>
                                        {isSuccessPresupuesto ? (
                                            <Select options={dataPresupuesto} onChange={(selectedOption) => setPresupuesto(selectedOption.value)} required className="shadow-md" />
                                        ) : (
                                            <>Cargando presupuestos...</>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                                    Guardar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    );
}
