import React from 'react'
import NavbarClientes from '../../components/NavbarClientes'
import {

  useGetOrdenes_estadoQuery

} from '../../services/clienteClienteApi'
import ModalCreateOrden from './components/ModalCreateOrden'
import OrdenesTable from './components/OrdenesTable'


export default function Clientes() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const estadoInstalado = 2
  const estadoNoInstalado = 1
  const { data: dataOrdedesInstaladas, isSuccess: isSuccessOrdenesInstaladas } = useGetOrdenes_estadoQuery({ access: user.access, estado_instalacion: estadoInstalado })
  const { data: dataOrdedesNoInstaladas, isSuccess: isSuccessOrdenesNoInstaladas } = useGetOrdenes_estadoQuery({ access: user.access, estado_instalacion: estadoNoInstalado })


  return (
    <div>
      <NavbarClientes />

      <div className='p-4'>

        <div className='p-4 '>
          <span className='pr-5'>Registro de órdenes de instalación</span>

          <ModalCreateOrden />
        </div>
        <div>
          <h3>Ordenes pendientes</h3>
          {
            isSuccessOrdenesNoInstaladas ?
              <OrdenesTable
                ordenes={dataOrdedesNoInstaladas}
                instalacionVF={true}
              />
              :
              <>Cargando ordenes no instaladas</>
          }
        </div>
        <div>
          <h3>Ordenes instaladas</h3>
          {
            isSuccessOrdenesInstaladas ?
              <OrdenesTable
                ordenes={dataOrdedesInstaladas}
                instalacionVF={false}
              />
              :
              <>Cargando ordenes instaladas</>

          }

        </div>

      </div>


      <div>

      </div>



    </div>
  )

}
