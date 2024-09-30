import React from 'react'
import NabvarMikrotik from '../../components/NabvarMikrotik'
import { useParams } from 'react-router-dom';
import {useGet_ClientesConectados_APQuery} from '../../services/mikrotikAPI'
export default function ClientesConectadosAP() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { id_ap } = useParams()

    const {data, isSuccess} = useGet_ClientesConectados_APQuery({access: user.access, idAP:id_ap})

    return (
    <div>
        <NabvarMikrotik/>


        <table className="min-w-full bg-white border border-gray-200">

<thead className="bg-gray-50">
    <tr>
        <th className="py-2 px-4 border-b text-xs text-center">#</th>
        <th className="py-2 px-4 border-b text-xs text-center">Cliente</th>
        <th className="py-2 px-4 border-b text-xs text-center">Plan</th>
        <th className="py-2 px-4 border-b text-xs text-center">Ip</th>
        <th className="py-2 px-4 border-b text-xs text-center">Sector</th>
        <th className="py-2 px-4 border-b text-xs text-center">Direccion</th>
    </tr>
</thead>
{data&&
    <tbody>
        {data.map((item, index) => (
            <tr key={index}>
                <td className="py-1 px-4  border-b text-xs text-center text-gray-400">{index + 1}</td>
                <td className="py-1 px-4 border-b text-base text-center"> {item.cliente}
                    {/* <a href={`/infraestruturafo/mufa_detalle_nap/${mufa.id}/`}>{mufa.numero}</a> */}
                </td>
                <td className="py-1 px-4 border-b text-xs text-center"> {item.plan} </td>
                <td className="py-1 px-4 border-b text-xs text-center">{item.ipv4}</td>
                <td className="py-1 px-4 border-b text-xs text-center">{item.barrio} </td>
                <td className="py-1 px-4 border-b text-xs text-center">{item.direccion}</td>


            </tr>
        ))}
    </tbody>

}
</table>
        
        </div>
  )
}
