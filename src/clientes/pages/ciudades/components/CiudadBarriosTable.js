import React from 'react'
import ModalEditBarrio from './ModalEditBarrio'
export default function CiudadBarriosTable({barrios}) {
  return (
    <div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Barrio</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {barrios.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.nombre}</td>
                <td> 
                  <ModalEditBarrio
                  barrioID={item}
                  /> 
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
