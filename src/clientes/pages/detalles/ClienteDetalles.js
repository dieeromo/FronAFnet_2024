import React from 'react'
import NavbarClientes from '../../components/NavbarClientes'
import { useParams } from 'react-router-dom';
import { useGetClienteIDQuery } from '../../services/clienteClienteApi'
import ClienteCard from './components/ClienteCard'
import {
  useGetClienteVivienda_clienteQuery,
} from '../../services/clienteViviendaApi'


import ViviendaCard from './components/ViviendaCard'

export default function ClienteDetalles() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataClienteID, isSuccess: isSuccessClienteID } = useGetClienteIDQuery({ access: user.access, clienteID: id });
  const { data: dataClienteViv, isSuccess: isSuccessClienteViv } = useGetClienteVivienda_clienteQuery({ access: user.access, clienteID: id });


  return (
    <div>
      <NavbarClientes />
      <div className='text-xs'>Detalles del cliente</div>
      {
        isSuccessClienteID ?
          <div>
            <ClienteCard
              client={dataClienteID}
            />
          </div>

          :
          <>cargando datos</>
      }
      {
        isSuccessClienteViv ?
          <div className='m-2'>
            {
              dataClienteViv.map((item, index) => (
                <ViviendaCard
                  key={index}
                  vivienda={item}
                />
              ))}
          </div>
          :
          <>Cargando datos Vivienda</>

      }




    </div>
  )
}
