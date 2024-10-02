import React from 'react'
import {
  useGetOrdenCobro_clienteVivienda_sinPagarQuery,
  useGetOrdenesPagadasAbonos_PlanclienteViviendaQuery,


} from '../services/clienteViviendaApi'
import ModalCreatepagoPlanClienteVivienda from './ModalCreatepagoPlanClienteVivienda'

import ModalDetallePagosPlanes from './ModalDetallePagosPlanes'

function Calcular_total(dataOrden) {
  let total = 0
  dataOrden.forEach(item => {
    total = total + item.valor_pendiente

  });
  return total

}

export default function OrdenesCobroSinPagar_Card({ planClienteViviendaID }) {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataOrden, isSuccess: isSuccessOrden } = useGetOrdenCobro_clienteVivienda_sinPagarQuery({ access: user.access, planClienteViviendaID: planClienteViviendaID });

  const { data: dataOrdenesPagadas, isSuccess: isSuccessOrdenespagadas } = useGetOrdenesPagadasAbonos_PlanclienteViviendaQuery({ access: user.access, planClienteViviendaID: planClienteViviendaID });

  console.log('pagadas', dataOrdenesPagadas)

  return (
    <div>
<span className='text-sm '>Valores pendientes</span>
{
        isSuccessOrdenespagadas && (
          <ModalDetallePagosPlanes
            payments={dataOrdenesPagadas}
          />
        )
      }
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-2 border-b text-xs text-center">#</th>
            <th className="py-2 px-2 border-b text-xs text-center">Mes</th>
            <th className="py-2 px-2 border-b text-xs text-center">Plan</th>
            <th className="py-2 px-2 border-b text-xs text-center">Subtotal</th>
            <th className="py-2 px-2 border-b text-xs text-center">Iva</th>
            <th className="py-2 px-2 border-b text-xs text-center">Total</th>
            <th className="py-2 px-2 border-b text-xs text-center">Abono</th>
            <th className="py-2 px-2 border-b text-xs text-center">Pendiende</th>

            <th></th>

          </tr>
        </thead>
        {isSuccessOrden && (
          <tbody>
            {dataOrden.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-2 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.anio} {item.mes}: {item.dias_consumo} dias</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.plan}</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.valor_subtotal.toFixed(2)}</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.valor_iva}</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.valor_total}</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.valor_abonado}</td>
                <td className="py-2 px-2 border-b text-xs text-center">{item.valor_pendiente}</td>
                <td>
                  <ModalCreatepagoPlanClienteVivienda
                    ordenCobroID={item.id}
                  />

                </td>

              </tr>
            ))}
          </tbody>
        )}

      </table>


      {isSuccessOrden && (
        <span className='text-xs text-red-500 ml-10'>Valor pendiente: <strong>{Calcular_total(dataOrden)}</strong></span>
      )}

    </div>
  )
}
