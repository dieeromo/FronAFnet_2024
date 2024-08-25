import React, { useState } from 'react'
import NavbarInventario from '../components/NavbarInventario'
import { useGetEstadisticaGeneralFiltroQuery } from '../services/inventarioApi'

export default function InventarioLanding() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  
 
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading, isSuccess } = useGetEstadisticaGeneralFiltroQuery ({ access:user.access, homologado:searchTerm });
  console.log(data)
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div >
      <NavbarInventario />
      <div className="bg-neutral-900 text-gray-300 min-h-screen" >
        <div className="p-4">
          <h2 className="text-xl font-bold">Equipo Counts</h2>

          <div className="mb-4">
            <label htmlFor="homologadoFilter" className="mr-2 text-sm">Buscar por equipo:</label>
            <input
              type="text"
              id="homologadoFilter"
              value={searchTerm}
              onChange={handleInputChange}
              className="border border-neutral-700 rounded p-2 bg-neutral-800 text-sm"
              placeholder="Ingrese el nombre"
            />
          </div>

          {isSuccess ? <div className='grid grid-cols-6'> 
          
            {

            data.map((homologado,index) => (
              <div key={index} className='border border-gray-600 mx-3 mt-3'>
                <h3 className='bg-green-900 text-center'>{homologado.homologado}</h3>
                <ul className='ml-4'>
                  <li className='text-sm'>Nuevo: {homologado.estados.Nuevo}</li>
                  <li className='text-sm'>Usado: {homologado.estados.Usado}</li>
                  <li className='text-sm'>Dañado: {homologado.estados.Dañado}</li>
                  <li className='text-sm'>Revisar: {homologado.estados.Revisar}</li>
                </ul>



              </div>
            ))
          }

            </div>
            :
            <div>Hola</div>

          }



        </div>


      </div>
    </div>
  )
}
