import React, { useState } from "react";

export default function ModalDetallePagosPlanes({ payments }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="bg-gray-300 mx-3 hover:bg-green-400  py-1 px-1 rounded text-xs"
        onClick={openModal}
      >
        Ver Pagos
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-3/4 max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                <h3 className="text-lg font-semibold">Detalles de Pagos</h3>
                <button
                  onClick={closeModal}
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-5 max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr >
                      <th className="px-3 py-2 bg-gray-50 text-center text-xs text-gray-500">
                        Mes pago
                      </th>
                      <th className="px-3 py-2 bg-gray-50 text-center text-xs text-gray-500">
                        Abono
                      </th>
                      <th className="px-3 py-2 bg-gray-50 text-center text-xs text-gray-500">
                        Detalle
                      </th>
  
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment, index) => (
                      <tr key={index}>
                        <td className="px-2 py-2 whitespace-nowrap text-center">
                          {payment.mes_pago}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {payment.valor_abonado}
                        </td > 
                        <td  className="">
                          <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                              <tr className="border border-gray-300">
                                <th className="py-1 px-1 border-b text-xs text-center">Fecha</th>
                                <th className="py-1 px-1 border-b text-xs text-center">Caja</th>
                                <th className="py-1 px-1 border-b text-xs text-center">Valor</th>
                                <th className="py-1 px-1 border-b text-xs text-center">Tipo</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                            payment.pagosPlanClienteVivienda.map((pago, indexPago)=>(
                              <tr key={indexPago}>
                                <td className="py-1 px-1 border-b text-xs text-center">{pago.fecha_pago_corta}</td>
                                <td className="py-1 px-1 border-b text-xs text-center">{pago.cajaName}</td>
                                <td className="py-1 px-1 border-b text-xs text-center">{pago.total_abono}</td>
                                <td className="py-1 px-1 border-b text-xs text-center">{pago.tipo_pago_descripcion}</td>
                              </tr>
                              
                            ))
                          }

                            </tbody>
                          </table>

                        </td>
              
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pie del modal */}
              <div className="flex justify-end p-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
    </>
  );
}
