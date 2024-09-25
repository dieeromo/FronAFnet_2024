import React from 'react'
import NabvarMikrotik from '../../components/NabvarMikrotik'
import { useParams } from 'react-router-dom';
import {useGet_AP_nodo_filterQuery} from '../../services/mikrotikAPI'
import ApCreateModal from './components/ApCreateModal'
export default function ApRouter() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { id_router } = useParams()

  const{data, isSuccess}= useGet_AP_nodo_filterQuery({access:user.access,routerId:id_router})
  console.log('ap', data)

  return (
    <div>
        <NabvarMikrotik/>
        <ApCreateModal
        id_router={id_router}
        />
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Nombre</th>
              <th className="py-2 px-4 border-b text-xs text-center">SSID</th>
              <th className="py-2 px-4 border-b text-xs text-center">Frecuencia</th>
              <th className="py-2 px-4 border-b text-xs text-center">IPv4</th>

           

            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-sm text-center font-bold text-blue-700 ">
                <a href={`/mikrotik/clientes_conectados_ap/${item.id}`}> {item.nombre} *</a>
                  </td>
                <td className="py-2 px-4 border-b text-xs text-center"> {item.ssid} </td>
                <td className="py-2 px-4 border-b text-xs text-center"> {item.frecuencia} </td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.ipv4_address}</td>
              </tr>
            ))}
          </tbody>
        </table> 

        </div>
  )
}
