import React from 'react'
import {useGetFacturasEquipoIDQuery} from '../../services/contabilidadApi'
import { useParams } from 'react-router-dom';
import NavbarContabilidad from '../components/NavbarContabilidad'

export default function DetallesFacturaProveedores() {
  const { id } = useParams()

  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data:dataFacturaDetalles, isSuccess:isSuccessFacturaDetalles}=useGetFacturasEquipoIDQuery({access:user.access, facturaID:id})

  return (
    <div>
      <NavbarContabilidad/>
      {isSuccessFacturaDetalles ? 
      <div>
        <div className='grid grid-cols-4'>
          <div>Proveedor:{dataFacturaDetalles.proveedorName}</div>
          <div># factura:{dataFacturaDetalles.numeroFactura}</div>
          <div>Fecha:{dataFacturaDetalles.fecha_emision}</div>
          <div>Descripcion:{dataFacturaDetalles.descripcion}</div>
        </div>
        <div className='grid grid-cols-4'>
          <div>Modo compra:{dataFacturaDetalles.modoCompraName}</div>
          <div>Valor:{dataFacturaDetalles.valor}</div>
          <div>Abono:{dataFacturaDetalles.abono}</div>
          <div>Presupuesto:{dataFacturaDetalles.presupuestoName}</div>
        </div>

        <div className='grid grid-cols-2'>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Caja</th>
                <th>Abono</th>
                <th>Descripcion</th>
              </tr>

            </thead>
            {
                isSuccessFacturaDetalles ?
                <tbody>
                   {
                    dataFacturaDetalles.pagosFacturaEquipos.map((item,index)=>(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.fecha_pago}</td>
                        <td>{item.cajaName}</td>
                        <td>{item.abono}</td>
                        <td>{item.descripcion}</td>
                      </tr>
                    ))
                  }
        
                </tbody>
                :
                <>Cargando datos</>
            }

          </table>


        </div>

      </div> 
      : <></>}
    </div>
  )
}
