import React from 'react'
import ModalEstadoOrden from '../components/ModalEstadoOrden'


export default function OrdenesTable({ordenes, instalacionVF}) {

  return (
    <div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-1 border-b text-xs text-center">#</th>
              <th className="py-2 px-1 border-b text-xs text-center">Nombres</th>
              <th className="py-2 px-1 border-b text-xs text-center">Telefono</th>
              <th className="py-2 px-1 border-b text-xs text-center">Tipo</th>
              <th className="py-2 px-1 border-b text-xs text-center">Nacionalidad</th>
              <th className="py-2 px-1 border-b text-xs text-center">Solicitud</th>
              <th className="py-2 px-1 border-b text-xs text-center">Instalación</th>
              <th className="py-2 px-1 border-b text-xs text-center">Tipo instalación</th>
              <th className="py-2 px-1 border-b text-xs text-center">Dirección</th>
              <th className="py-2 px-1 border-b text-xs text-center"></th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((cliente, index) => (
              <tr key={index}>
                <td className="py-2 px-1 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-1 border-b text-xs text-center">{cliente.nombresApellidos}</td>
                <td className="py-2 px-1 border-b text-xs text-center">{cliente.telefono1}</td>
                <td className="py-2 px-1 border-b text-xs text-center">{cliente.tipoCliente}</td>
                <td className="py-2 px-1 border-b text-xs text-center">{cliente.nacionalidadCliente}</td>
                <td className="py-2 px-1 border-b text-xs text-center">{cliente.fecha_solicitud}</td>
                <td className="py-2 px-1 border-b text-xs text-center">{cliente.fecha_instalacion}</td>
                <td className="py-2 px-1 border-b text-xs text-center">
                {cliente.tipoInstalacion == 1 ? <>Normal</> : <>Cambio operadora</>}
                </td>
                <td className="py-2 px-4 border-b text-xs text-center">{cliente.direccion}</td>
                <td>
                {instalacionVF &&(
                                      <ModalEstadoOrden
                                      orden={cliente}
                                 
                                      />

                            )}

                </td>
           
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
