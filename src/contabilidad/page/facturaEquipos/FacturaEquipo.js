import React from 'react'
import NavbarContabilidad from '../components/NavbarContabilidad'
import ModalCreatefacturaEquipo from './components/ModalCreatefacturaEquipo'
//import { FilterableProductTable } from './components/TableFacturasprueba'
import { useState } from 'react';
import ModalPagoFacturaEquipo from './components/ModalPagoFacturaEquipo'

import {useGetFacturaEquipo_searchQuery} from '../../services/contabilidadApi'

export default function FacturaEquipo() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(100);

  const { data, isSuccess,isLoading,error}=useGetFacturaEquipo_searchQuery({ access: user.access, page: page, search: search, page_size: pageSize })
  console.log(data)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error cargando los datos</div>;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1); // Reset to first page when page size changes
  };

  return (
    <div>
      <NavbarContabilidad />
      <span className='pl-4 pr-4'>Facturas equipos o descripcion</span>
      
      <ModalCreatefacturaEquipo />

      <div>

      <div className='p-5'>

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


        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Emisión</th>
              <th className="py-2 px-4 border-b text-xs text-center">Proveedor</th>
              <th className="py-2 px-4 border-b text-xs text-center"># factura</th>
              <th className="py-2 px-4 border-b text-xs text-center">Descripcion</th>
              <th className="py-2 px-4 border-b text-xs text-center">Valor</th>
              <th className="py-2 px-4 border-b text-xs text-center">Abono</th>
              <th className="py-2 px-4 border-b text-xs text-center">Pagado</th>
              <th className="py-2 px-4 border-b text-xs text-center"></th>
              <th className="py-2 px-4 border-b text-xs text-center">Inventario</th>
              <th className="py-2 px-4 border-b text-xs text-center">Ingreso</th>
              <th className="py-2 px-4 border-b text-xs text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((factura_i, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{factura_i.fecha_emision}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{factura_i.proveedorName} - {factura_i.modoCompraName}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{factura_i.numeroFactura} </td>
                <td className="py-2 px-4 border-b text-xs text-center">{factura_i.descripcion}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{factura_i.valor}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{factura_i.abono}</td>
                <td className="py-2 px-4 border-b text-xs text-center">
                            {factura_i.pagado==true?<span className='bg-green-200 p-1'>Pagado</span>
                            :
                            <span className='bg-red-100 p-1'>Por pagar</span>}
                </td>
                <td className='flex justify-center'>
                  {factura_i.pagado===false&&(
                                      <ModalPagoFacturaEquipo
                                      facturaID={factura_i.id}
                                      pendiente={factura_i.valor-factura_i.abono}
                                      />

                  )}

                </td>
                <td className="py-2 px-4 border-b text-xs text-center">
                  {factura_i.inventario ==true?<span className='bg-green-200 p-1'>Invent.</span>:<span className='bg-gray-300 p-1'>No invent</span> }
                </td>
                <td className="py-2 px-4 border-b text-xs text-center">
                  {factura_i.equiposIngresados ==true?<span className='bg-green-200 p-1'>Si</span>:<span className='bg-red-200 p-1'>No</span> }
                </td>
                <td className="py-2 px-4 border-b text-xs text-center">
                  {factura_i.equiposIngresados == false && factura_i.inventario ==true &&(<a className="bg-blue-300 text-xs  hover:bg-green-300 py-1 px-1 rounded"   href={`/inventario/equipos_factura/${factura_i.id}/`}>+Ingreso</a>) }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!data.previous}
            className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!data.next}
            className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </div>



    </div>

  )
}
