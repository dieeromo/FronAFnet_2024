import React from 'react'
import EquiposTable from '../components/EquiposTable'
import NavbarInventario from '../../components/NavbarInventario'
import ModalCreateEquipo from '../components/ModalCreateEquipo'
import { useParams } from 'react-router-dom';
import { useGetFacturasEquipoIDQuery } from '../../services/inventarioApi'
import ModalCerrarFactura from '../../../contabilidad/page/facturaEquipos/components/ModalCerrarFactura'

export default function EquiposFactura() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataFacturaDetalles, isSuccess: isSuccessFacturaDetalles } = useGetFacturasEquipoIDQuery({ access: user.access, facturaID: id })
  console.log(dataFacturaDetalles)
  return (
    <div>
      <NavbarInventario />
      Equipos
      {isSuccessFacturaDetalles ?
        <div className='p-4 ' >
          <div className='grid grid-cols-4 border border-gray-300'>
            <div className='text-sm pl-2 pt-1'>Proveedor: {dataFacturaDetalles.proveedorName}</div>
            <div className='text-sm pl-2 pt-1'> # factura: {dataFacturaDetalles.numeroFactura}</div>
            <div className='text-sm pl-2 pt-1'>Fecha emisión: {dataFacturaDetalles.fecha_emision}</div>
            <div className='text-xs pl-2'>{dataFacturaDetalles.descripcion}</div>
          </div>
          <div className='grid grid-cols-4 border border-gray-300'>
            <div className='text-sm py-2'>Modo compra: {dataFacturaDetalles.modoCompraName}</div>
            <div className='text-sm py-2'>Valor: {dataFacturaDetalles.valor}</div>
            <div className='text-sm py-2'>Abono: {dataFacturaDetalles.abono}</div>
            <div className='text-sm py-2'>Presupuesto: {dataFacturaDetalles.presupuestoName}</div>
          </div>

          <div className='mt-5'>
            <div className='text-green-700 text-xs font-semibold'>Abonos</div>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th >#</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Fecha</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Caja</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Abono</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Descripcion</th>
                </tr>

              </thead>
              {
                isSuccessFacturaDetalles ?
                  <tbody>
                    {
                      dataFacturaDetalles.pagosFacturaEquipos.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                          <td className="py-2 px-4 border-b text-xs text-center">{item.fecha_pago}</td>
                          <td className="py-2 px-4 border-b text-xs text-center">{item.cajaName}</td>
                          <td className="py-2 px-4 border-b text-xs text-center">{item.abono}</td>
                          <td className="py-2 px-4 border-b text-xs text-center">{item.observacion}</td>
                        </tr>
                      ))
                    }

                  </tbody>
                  :
                  <>Cargando datos</>
              }

            </table>


          </div>
          {dataFacturaDetalles.equiposIngresados == false && (
            <div className=''>
              <ModalCreateEquipo
                facturaID={id}
              />
              <ModalCerrarFactura
                facturaID={id}
              />
            </div>
          )}


        </div>
        : <></>}

      <div className='mt-5 border border-green-300'>
        {
          isSuccessFacturaDetalles ?
            <EquiposTable
              equipos={dataFacturaDetalles.equipos}
            />
            :
            <>cargando datos</>
        }

      </div>



    </div>
  )
}
