import React from 'react'
import { useGetFacturasDetallesIDQuery } from '../../services/facturaServiciosApi'
import { useParams } from 'react-router-dom'
import NavbarContabilidad from '../components/NavbarContabilidad'

export default function DetallesFacturaProveedores() {
  const { id } = useParams()

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { data: dataFacturaDetalles, isSuccess: isSuccessFacturaDetalles } = useGetFacturasDetallesIDQuery({ access: user.access, facturaID: id })

  console.log('Datos de la factura:', dataFacturaDetalles?.pagosServicios)

  return (
    <div>
      <NavbarContabilidad />
      {isSuccessFacturaDetalles ? (
        <div className="p-6 bg-white shadow-md rounded-md">
          {/* Información general de la factura */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <span className="font-semibold">Proveedor:</span> {dataFacturaDetalles.proveedorName}
            </div>
            <div>
              <span className="font-semibold"># Factura:</span> {dataFacturaDetalles.numeroFactura}
            </div>
            <div>
              <span className="font-semibold">Fecha emisión:</span> {dataFacturaDetalles.fecha_emision}
            </div>
            <div>
              <span className="font-semibold">Descripción:</span> {dataFacturaDetalles.descripcion}
            </div>
          </div>
  
          {/* Información adicional */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <span className="font-semibold">Modo de compra:</span> {dataFacturaDetalles.modoCompraName}
            </div>
            <div>
              <span className="font-semibold">Valor:</span> ${dataFacturaDetalles.valor}
            </div>
            <div>
              <span className="font-semibold">Abono:</span> ${dataFacturaDetalles.abono}
            </div>
            <div>
              <span className="font-semibold">Presupuesto:</span> ${dataFacturaDetalles.presupuestoName}
            </div>
          </div>
  
          {/* Tabla de pagos */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 shadow-md rounded-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Fecha</th>
                  <th className="py-2 px-4 text-left">Caja</th>
                  <th className="py-2 px-4 text-left">Abono</th>
                  <th className="py-2 px-4 text-left">Observación</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {dataFacturaDetalles.pagosServicios.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item.fecha_pago}</td>
                    <td className="py-2 px-4">{item.cajaName}</td>
                    <td className="py-2 px-4">${item.abono}</td>
                    <td className="py-2 px-4">{item.observacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center p-6">Cargando datos...</div>
      )}
    </div>
  );
  
}
