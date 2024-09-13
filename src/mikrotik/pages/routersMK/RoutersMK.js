import React from 'react'
import NabvarMikrotik from '../../components/NabvarMikrotik'
import {useGetRoutersMKQuery} from '../../services/mikrotikAPI'
import CreateRouterModal from './components/CreateRouterModal'
export default function RoutersMK() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataRouter, isSuccess: isSuccessRouter } = useGetRoutersMKQuery({ access: user.access })
  console.log('equipo router', dataRouter)


  return (
    <div>
      <NabvarMikrotik/>

      RoutersMK
      <CreateRouterModal/>
  

     <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Nombre</th>
              <th className="py-2 px-4 border-b text-xs text-center">Router</th>
              <th className="py-2 px-4 border-b text-xs text-center">Ip</th>

              <th></th>

            </tr>
          </thead>
          <tbody>
            {dataRouter?.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.nombre}</td>
                <td className="py-2 px-4 border-b text-xs text-center"> {item.router_instalado_nombre} - {item.router_instalado_serie}  </td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.ipv4_address}</td>
             
 

              </tr>
            ))}
          </tbody>
        </table> 

      
      </div>
  )
}

