import React from 'react'
import Modal_EquipoInstalado_a_pasivo from './Modal_EquipoInstalado_a_pasivo'


export default function EquiposPlanClienteViviendaCard({equipos}) {



   
  return (
    <div>
        <span className='text-sm'>Equipos instalados</span>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
           
              <th className="py-2 px-4 border-b text-xs text-center">Equipo</th>
              <th className="py-2 px-4 border-b text-xs text-center">Serie</th>
              <th className="py-2 px-4 border-b text-xs text-center">Condición</th>
              <th className="py-2 px-4 border-b text-xs text-center">Fecha</th>
              <th className="py-2 px-4 border-b text-xs text-center">Dias</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {equipos.map((item, index) => (
              <tr key={index}>
               
                <td className="py-2 px-4 border-b text-xs text-center">{item.nombreName}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.nombreSerie}</td>
                <td className="py-2 px-4 border-b text-xs text-center">
                    {item.condicion_equipo==1&&(<span>Nuevo</span>)}
                    {item.condicion_equipo==2&&(<span>Usado</span>)}
                    {item.condicion_equipo==3&&(<span>Dañado</span>)}
                    </td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.fecha_instalacion}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.diasFuncionando}</td>
                <td>
                  <Modal_EquipoInstalado_a_pasivo
                  equipoInstaladoID={item.id}
                  equipoID={item.equipoID}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
