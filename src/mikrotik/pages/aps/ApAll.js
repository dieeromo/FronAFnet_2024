import React, {useState} from 'react'
import {useGet_AP_nodo_filterQuery} from '../../services/mikrotikAPI'
import NabvarMikrotik from '../../components/NabvarMikrotik'
export default function ApAll() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  
  const [search, setSearch] = useState('')
  const [routerNombre, setRouterNombre] = useState('')
  const [ordenar, setOrdenar] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value);
 
  };
  const handleRouter = (e) => {
    setRouterNombre(e.target.value);
  }

  const handleOrdenar = (e) => {
   
    if (ordenar==''){
      setOrdenar('frecuencia')
    } 
    else if (ordenar=='frecuencia'){
      setOrdenar('-frecuencia')
    }
    else{
      setOrdenar('frecuencia')
    }
  }

  const{data, isSuccess}= useGet_AP_nodo_filterQuery({access:user.access, search:search, routerName:routerNombre, ordering:ordenar})
console.log(data)
 
  return (
    <div>
      <NabvarMikrotik/>
      <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre o ssid"
              className="px-4 py-1 border rounded w-full text-xs"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nodo"
              className="px-4 py-1 border rounded w-full text-xs"
              value={routerNombre}
              onChange={handleRouter}
            />
          </div>
      <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Nodo</th>
              <th className="py-2 px-4 border-b text-xs text-center">Nombre</th>
              <th className="py-2 px-4 border-b text-xs text-center">SSID</th>
              <th className="py-2 px-4 border-b text-xs text-center">
                
                <button onClick={handleOrdenar} className={`${ordenar=='frecuencia'?'text-decoration-line: overline':'text-decoration-line: underline'}`}> Frecuencia *</button>
                </th>
              <th className="py-2 px-4 border-b text-xs text-center">IPv4</th>

           

            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.routerNombre}</td>
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
