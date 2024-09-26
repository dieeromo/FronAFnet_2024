import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarContabilidad from '../components/NavbarContabilidad';
import ModalCreatefacturaEquipo from '../facturaEquipos/components/ModalCreatefacturaEquipo';
import ModalPagoFacturaEquipo from '../facturaEquipos/components/ModalPagoFacturaEquipo';
import { useGetFacturaServicio_filterQuery, useGetFacturaServicioQuery } from '../../services/facturaServiciosApi';

export default function FacturaServicios() {
  const user = JSON.parse(localStorage.getItem('user') || "{}");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(100);
  
  // Filtros
  const [servicio, setServicio] = useState('');
  const handleServicio = (e) => setServicio(e.target.value);

  const [proveedor, setProveedor] = useState('');
  const handleProveedor = (e) => setProveedor(e.target.value);

  const [fecha_emision_after, setFechaEmisionAfter] = useState('');
  const handleFechaEmisionAfter = (e) => setFechaEmisionAfter(e.target.value);

  const [fecha_emision_before, setFechaEmisionBefore] = useState('');
  const handleFechaEmisionBefore = (e) => setFechaEmisionBefore(e.target.value);

  // Lógica de búsqueda con filtros
  const { data: dataFilter, isSuccess: isSuccessFilter } = useGetFacturaServicio_filterQuery({
    access: user.access,
    page: page, // Se incluye la paginación
    servicio: servicio,
    proveedor: proveedor,
    fecha_emision_after: fecha_emision_after,
    fecha_emision_before: fecha_emision_before
  });

  console.log('Datos filtrados:', dataFilter);

  // Lógica de búsqueda general (sin filtros)
  const { data, isSuccess, isLoading, error } = useGetFacturaServicioQuery({
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
            value={servicio}
            onChange={handleServicio}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por proveedor"
            className="px-4 py-1 border rounded w-full text-xs"
            value={proveedor}
            onChange={handleProveedor}
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            placeholder="Fecha emisión después"
            className="px-4 py-1 border rounded w-full text-xs"
            value={fecha_emision_after}
            onChange={handleFechaEmisionAfter}
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            placeholder="Fecha emisión antes"
            className="px-4 py-1 border rounded w-full text-xs"
            value={fecha_emision_before}
            onChange={handleFechaEmisionBefore}
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-5  rounded-md mt-5">

          {/* Modal para crear nueva factura */}
  <ModalCreatefacturaEquipo />
  {/* Enlace a Ver Pago Facturas */}
  <Link
    to={`/contabilidad/pago_factura_servicio/`}
    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
  >
    Ver pago facturas
  </Link>


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
              <th className="py-2 px-4 border-b text-xs text-center">Emisión</th>
              <th className="py-2 px-4 border-b text-xs text-center">Proveedor</th>
              <th className="py-2 px-4 border-b text-xs text-center">Servicio</th>
              <th className="py-2 px-4 border-b text-xs text-center">Mes pago</th>
              <th className="py-2 px-4 border-b text-xs text-center">Valor</th>
              <th className="py-2 px-4 border-b text-xs text-center">Abono</th>
              <th className="py-2 px-4 border-b text-xs text-center">Pagado</th>
              <th className="py-2 px-4 border-b text-xs text-center"></th>
              <th className="py-2 px-4 border-b text-xs text-center">Modo compra</th>
              <th className="py-2 px-4 border-b text-xs text-center">Presupuesto</th>
              <th className="py-2 px-4 border-b text-xs text-center"></th>
            </tr>
          </thead>
          <tbody>
            {facturas && facturas.length > 0 ? (
              facturas.map((factura, index) => (
                <tr key={index}>
                                    <td className="py-2 px-4 border-b text-xs text-center">
                    <Link to={`/contabilidad/factura_servicio/${factura.id}/`} className="text-blue-500 hover:underline">
                      {index + 1}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.fecha_emision}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.proveedor}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.servicio}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.mes_pago}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.valor}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.abono}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">
                    {factura.pagado ? (
                      <span className='bg-green-200 p-1'>Pagado</span>
                    ) : (
                      <span className='bg-red-100 p-1'>Por pagar</span>
                    )}
                  </td>
                  <td className='flex justify-center'>
                    {!factura.pagado && (
                      <ModalPagoFacturaEquipo
                        facturaID={factura.id}
                        pendiente={factura.valor - factura.abono}
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.modoCompra}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{factura.presupuesto}</td>
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
