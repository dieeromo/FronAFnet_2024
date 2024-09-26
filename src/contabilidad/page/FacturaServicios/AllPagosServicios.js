import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarContabilidad from '../components/NavbarContabilidad';
import ModalCreatefacturaEquipo from '../facturaEquipos/components/ModalCreatefacturaEquipo';
//import ModalPagoFacturaEquipo from '../facturaEquipos/components/ModalPagoFacturaEquipo';
import { useGetPagoFacturaServicio_filterQuery, useGetPagoFacturaServicioQuery } from '../../services/facturaServiciosApi';

export default function AllPagosServicios() {
  const user = JSON.parse(localStorage.getItem('user') || "{}");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(100);
  
  // Filtros
  const [facturaServicios, setFacturaServicios] = useState('');
  const handlesetFacturaServicios = (e) => setFacturaServicios(e.target.value);

  const [caja, setCaja] = useState('');
  const handleCaja = (e) => setCaja(e.target.value);

  const [fecha_pago_after, setFechaPagoAfter] = useState('');
  const handleSetFechaPagoAfter = (e) => setFechaPagoAfter(e.target.value);

  const [fecha_pago_before, setFechaPagoBefore] = useState('');
  const handleFechaPagoBefore = (e) => setFechaPagoBefore(e.target.value);

  // Lógica de búsqueda con filtros
  const { data: dataFilter, isSuccess: isSuccessFilter } = useGetPagoFacturaServicio_filterQuery({
    access: user.access,
    page: page, // Se incluye la paginación
    facturaServicios: facturaServicios,
    caja: caja,
    fecha_pago_after: fecha_pago_after,
    fecha_pago_before: fecha_pago_before
  });

  console.log('Datos filtrados:', dataFilter);

  // Lógica de búsqueda general (sin filtros)
  const { data, isSuccess, isLoading, error } = useGetPagoFacturaServicioQuery({
    access: user.access,
    page: page,
    search: search,
    page_size: pageSize
  });

  console.log('Datos generales:', data);

  // Si hay filtros aplicados, usamos la consulta filtrada
  const facturas = dataFilter?.results || data?.results || []; 

  // Manejo de cambios en el campo de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Resetear la página al buscar
  };

  // Cambiar el tamaño de la página
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1); // Resetear a la primera página cuando cambie el tamaño de la página
  };

  // Si está cargando o hay errores
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error cargando los datos</div>;

  return (
    <div>
      <NavbarContabilidad />
      <div className='grid grid-cols-4 gap-4 m-5'>
        {/* Filtros de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por servicio"
            className="px-4 py-1 border rounded w-full text-xs"
            value={facturaServicios}
            onChange={handlesetFacturaServicios}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por caja"
            className="px-4 py-1 border rounded w-full text-xs"
            value={caja}
            onChange={handleCaja}
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            placeholder="Fecha emisión después"
            className="px-4 py-1 border rounded w-full text-xs"
            value={fecha_pago_after}
            onChange={handleSetFechaPagoAfter}
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            placeholder="Fecha emisión antes"
            className="px-4 py-1 border rounded w-full text-xs"
            value={fecha_pago_before}
            onChange={handleFechaPagoBefore}
          />
        </div>
      </div>


      <div className='p-5'>
        {/* Búsqueda por número de factura */}
        <div className='grid grid-cols-2 mt-4 ml-4'>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar # factura"
              className="px-4 py-1 border rounded w-full text-xs"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="mb-4 ml-4">
            <label className="mr-2 text-xs">Tamaño hoja:</label>
            <select
              className="px-4 py-1 border rounded text-xs"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={2}>2</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
            </select>
          </div>
        </div>

        {/* Tabla de resultados */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Abono</th>
              <th className="py-2 px-4 border-b text-xs text-center">Caja</th>
              <th className="py-2 px-4 border-b text-xs text-center">Servicio</th>
              <th className="py-2 px-4 border-b text-xs text-center">Fecha Pago</th>
              <th className="py-2 px-4 border-b text-xs text-center">Modo de pago</th>
              <th className="py-2 px-4 border-b text-xs text-center">Observación</th>
            </tr>
          </thead>
          <tbody>
          {facturas && facturas.length > 0 ? (
              facturas.map((factura, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.abono}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.caja}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.facturaServicios}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.fecha_pago}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.modoPago}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.observacion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-4">No se encontraron facturas.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
