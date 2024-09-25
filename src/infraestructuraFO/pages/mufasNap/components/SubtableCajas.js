import React from 'react'
import { AiOutlineFundView } from "react-icons/ai"

export default function SubtableCajas({data}) {
  console.log('data cajas', data)
 
  return (
    <div>
 {data.length >0 ?
    <table className="min-w-full bg-white m-2 ">
    <thead className="bg-sky-100">
      <tr>
        <th className="py-2 px-4 border-b text-xs text-center">#</th>
        <th className="py-2 px-4 border-b text-xs text-center">Caja</th>
        <th className="py-2 px-4 border-b text-xs text-center">Splitter</th>
        <th className="py-2 px-4 border-b text-xs text-center">Potencia</th>
        <th className="py-2 px-4 border-b text-xs text-center">Puertos</th>

      </tr>
    </thead>
    <tbody>
      {data.map((caja, index) => (
        <tr key={index}>
          <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
          <td className="py-2 px-4 border-b text-sm text-center font-bold text-decoration-line: underline"> 
            
            <a href={`/mikrotik/clientes_conectados_nap/${caja.id}/` }>{caja.nombreNap}</a>
            </td>
          <td className="py-2 px-4 border-b text-xs text-center"> {caja.splitter}</td>
          <td className="py-2 px-4 border-b text-xs text-center"> {caja.potencia}</td>
          <td className="py-2 px-4 border-b text-xs text-center"> {caja.puertosDanados}</td>
         
  
        </tr>
      ))}
    </tbody>
  </table>
  :<></>
    }
    </div>
  )
}
