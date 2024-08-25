// src/features/equipos/EquiposList.js
import React, { useState } from 'react';
import NavbarInventario from '../../components/NavbarInventario'
import { useGetEquipos_todosQuery, useGetBodegaQuery, useGetHomologadoQuery } from '../../services/inventarioApi'
import Select from "react-select"
import ModalHistorialEquipo from './components/ModalHistorialEquipo'
import ModalHistoricoEquipoBodega from './components/ModalHistoricoEquipoBodega'

const EquiposTodos = () => {
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const [search, setSearch] = useState('');
  const [homologado, setHomologado] = useState('');
  const [estado2, setEstado2] = useState('');
  const [estado, setEstado] = useState('');
  const [bodega, setBodega] = useState('');
  const [page, setPage] = useState(1);
  let page_size = 100

  // Realizamos la consulta con los filtros
  const { data, error, isLoading } = useGetEquipos_todosQuery({ access: user.access, homologado, estado, estado2, bodega, search, page, page_size });
console.log('TODOS', data)
  const { data: dataBodega, isSuccess: isSuccessBodega } = useGetBodegaQuery({ access: user.access })
  const { data: dataHomologado, isSuccess: isSuccessHomologado } = useGetHomologadoQuery({ access: user.access })

  const handleSearchChange = (e) => setSearch(e.target.value);
  //const handleEstadoChange = (e) => setEstado(e.target.value);
  const handleEstado2Change = (e) => setEstado2(e.target.value);
  const handlePageChange = (newPage) => setPage(newPage);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  const listaEstado =[
    {
      value:'1',
      label:'No instalado'
    },
    {
      value:'2',
      label:'Instalado'
    },
    {
      value:'3',
      label:'Vendido'
    },
  ]

  const listaCondicion=[
    {
      value:'1',
      label:'Nuevo'
    },
    {
      value:'2',
      label:'Usado'
    },
    {
      value:'3',
      label:'Dañado'
    },
    {
      value:'4',
      label:'Revisar'
    },
  ]

  return (
    <div>
      <NavbarInventario />
      <div className='grid grid-cols-5'>
        
        <div className="mb-4 ml-4">
        <label className="mr-2 text-xs">Serie:</label>
          <input
            type="text"
            className="px-1 w-full py-2 mt-1 border rounded  text-xs"
            placeholder="Buscar por serie"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mb-4 ml-4">
          <label className="mr-2 text-xs">Estado:</label>
          <Select
          options={listaEstado}
          onChange={(selectedOption) =>setEstado2(selectedOption.value)}
          className="px-4 py-1  text-xs"
          />



        </div>

        <div className="mb-4 ml-4">
          <label className="ml-2 text-xs">Condición:</label>
          <Select
          options={listaCondicion}
          onChange={(selectedOption) =>setEstado(selectedOption.value)}
          className="px-4 py-1  text-xs"
          />

        </div>



        <div className="mb-4 ml-4">
          <label className="ml-2 text-xs">Bodega:</label>
          {isSuccessBodega ?
            <Select
              options={dataBodega}
              onChange={(selectedOption) => setBodega(selectedOption.value)}
              className="px-4 py-1  text-xs"
            />
            :
            <>cargando proveedores</>
          }

        </div>


        <div className="mb-4 ml-4">
          <label className="ml-2 text-xs">Homologado:</label>
          {isSuccessHomologado ?
            <Select
              options={dataHomologado}
              onChange={(selectedOption) => setHomologado(selectedOption.value)}
              required
              className="px-4 py-1  text-xs"
            />
            :
            <>cargando proveedores</>
          }

        </div>


      </div>

      <ul>

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Homologado</th>
              <th className="py-2 px-4 border-b text-xs text-center">Serie</th>
              <th className="py-2 px-4 border-b text-xs text-center">Condicion</th>
              <th className="py-2 px-4 border-b text-xs text-center">Estado</th>
              <th className="py-2 px-4 border-b text-xs text-center">Bodega</th>
              <th className="py-2 px-4 border-b text-xs text-center">Ingreso</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {data?.results.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.homologadoName}</td>
                <td className="py-2 px-4 border-b text-xs text-center">
                  {item.serie} 
              
                  </td>
                <td className="py-2 px-4 border-b text-xs text-center">
                  {item.estado==1&&(<span className='bg-green-300 p-1 rounded'>Nuevo</span>)}
                  {item.estado==2&&(<span className='bg-yellow-300 p-1 rounded'>Usado</span>)}
                  {item.estado==3&&(<span className='bg-red-300 p-1 rounded'>Dañado</span>)}
                  {item.estado==4&&(<span className='bg-orange-300 p-1 rounded'>Revisar</span>)}
                  </td>
                <td className="py-2 px-4 border-b text-xs text-center">
                  {item.estado2==1&&(<span className='bg-green-300 p-1 rounded'>No instalado</span>)}
                  {item.estado2==2&&(<span className='bg-orange-300 p-1 rounded'>Instalado</span>)}
                  {item.estado2==3&&(<span className='bg-blue-300 p-1 rounded'>Vendido</span>)}
                  </td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.bodegaName}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.fecha_ingreso}</td>
                <td>

                <ModalHistorialEquipo
                  equipoID={item.id}
                  />

                  <ModalHistoricoEquipoBodega
                  equipoID={item.id}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </ul>

      <div>
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          Previous
        </button>
        <button onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EquiposTodos;
