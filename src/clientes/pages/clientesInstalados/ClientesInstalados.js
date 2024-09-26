import React from 'react'
import MUIDataTable from "mui-datatables";
import { useState } from 'react';
import NavbarClientes from '../../components/NavbarClientes'
import {
  useGetClienteFilterPaginationQuery
} from '../../services/clienteClienteApi'
import ModalEditCliente from './components/ModalEditCliente'
import LoadingSpinner from './components/LoadingSpinner'


export default function ClientesInstalados() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(100);


  const { data, error, isSuccess, isLoading, isFetching } = useGetClienteFilterPaginationQuery({ access: user.access, page: page, search: search, page_size: pageSize })

  if (error) return <div>Error loading data</div>;



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
      <NavbarClientes />
      <div className='p-5'>

        <div className='grid grid-cols-2 mt-4 ml-4'>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por Nombre o Cedula"
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

        {isLoading || isFetching ? <LoadingSpinner /> :
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-xs text-center">#</th>
                <th className="py-2 px-4 border-b text-xs text-center">Nombres</th>
                <th className="py-2 px-4 border-b text-xs text-center">Cedula</th>
                <th className="py-2 px-4 border-b text-xs text-center">Telefono</th>
                <th className="py-2 px-4 border-b text-xs text-center">Email</th>
                <th className="py-2 px-4 border-b text-xs text-center">Nacionalidad</th>
                <th className="py-2 px-4 border-b text-xs text-center">Tipo</th>
                <th className="py-2 px-4 border-b text-xs text-center">Observación</th>
                <th className="py-2 px-4 border-b text-xs text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data?.results.map((cliente, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-sm text-center text-blue-500 font-semibold ">
                    <a href={`/detalles/${cliente.id}/`}> {cliente.nombresApellidos} *</a>

                  </td>
                  <td className="py-2 px-4 border-b text-xs text-center">{cliente.cedula}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">
                    {cliente.telefono1} - {cliente.telefono2}
                  </td>
                  <td className="py-2 px-4 border-b text-xs text-center">{cliente.email}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{cliente.nacionalidadClienteLabel}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{cliente.tipoClienteLabel}</td>
                  <td className="py-2 px-4 border-b text-xs text-center">{cliente.observacion}</td>
                  <td><ModalEditCliente
                    clienteID={cliente.id}
                  /></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!data?.previous}
            className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!data?.next}
            className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </div>


  )
}
