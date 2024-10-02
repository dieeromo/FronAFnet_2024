import React from 'react'
import { useGet_MikrotikPlanClienteFilterQuery } from '../../mikrotik/services/mikrotikAPI'

function ObtenerNombreEstado(estado) {
    if (estado == 1) {
        return 'Activos'
    }
    else if (estado == 2) {
        return 'Suspendidos'
    }
    else if (estado == 3) {
        return 'Retirados'
    }
    else {
        return 'Error'
    }

}

export default function ConexionCard({ planClienteViviendaID }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data, isSuccess } = useGet_MikrotikPlanClienteFilterQuery({ access: user.access, id_planCliente: planClienteViviendaID })
    
    return (
        <div>
            <spam className="text-sm">Conexión</spam>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-2 px-2 border-b text-xs text-center">#</th>
                        <th className="py-2 px-2 border-b text-xs text-center">AP/NAP</th>
                        <th className="py-2 px-2 border-b text-xs text-center">IP</th>
                        <th className="py-2 px-2 border-b text-xs text-center">Conectados</th>
                    </tr>
                </thead>
                {isSuccess && data.results && (
                    <tbody>
                        {data.results.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-2 border-b text-xs text-center">{index + 1}</td>
                                <td className="py-2 px-2 border-b text-xs text-center">{item.inalambrico} {item.fibraOptica}</td>
                                <td className="py-2 px-2 border-b text-xs text-center">{item.ipv4_address}</td>
                                <td className="py-2 px-2 border-b text-xs text-center">
                                    <div>
                                        {item.inalambricoCount && (
                                            <div>
                                                {item.inalambricoCount[0].map((item1, index1) => (
                                                    <div key={index1} className='grid grid-cols-2'>
                                                        <div>{ObtenerNombreEstado(item1.planCliente__estado)}</div>
                                                        <div>{item1.total}</div>
                                                    </div>
                                                ))}
                                            </div>

                                        )}
                                        {
                                            item.fibraOpticaCount &&(
                                                <div>
                                                    {item.fibraOpticaCount[0].map((item2,index2)=>(
                                                        <div key={index2} className='grid grid-cols-2'> 
                                                        <div>{ObtenerNombreEstado(item2.planCliente__estado)}</div>
                                                        <div>{item2.total}</div>
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        }


                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}

            </table>
        </div>
    )
}
