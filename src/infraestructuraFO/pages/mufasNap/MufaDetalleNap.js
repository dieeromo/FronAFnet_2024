import React from 'react'
import { useParams } from 'react-router-dom';
import NavbarInfraestructuraFO from '../../components/NavbarInfraestructuraFO'
import { useGet_crud_mufasQuery } from '../../services/infraestructuraFOApi'
import NapModalCreate from './components/NapModalCreate'
export default function MufaDetalleNap() {
  const { id_mufa } = useParams()
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataMufas, isSuccess: isSuccessMufas } = useGet_crud_mufasQuery({ access: user.access, id_mufa: id_mufa })

  return (
    <div>
      <NavbarInfraestructuraFO />

      {isSuccessMufas && (
        <div>
          <span className='m-1'>Número: {dataMufas.numero}</span>
          <span className='m-1'>Splitter: {dataMufas.splitter}</span>
          <span className='m-1'>Potencia: {dataMufas.potencia}</span>
          <div>
            <table className="min-w-full bg-white border border-gray-200">

              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-xs text-center">#</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Caja</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Splitter</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Potencia</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Sector</th>
                  <th className="py-2 px-4 border-b text-xs text-center">Ciudad</th>



                </tr>
              </thead>
              {dataMufas.cajasNap &&
                <tbody>
                  {dataMufas.cajasNap.map((caja, index) => (
                    <tr key={index}>
                      <td className="py-1 px-4  border-b text-xs text-center text-gray-400">{index + 1}</td>
                      <td className="py-1 px-4 border-b text-base text-center"> {caja.nombreNap}
                        {/* <a href={`/infraestruturafo/mufa_detalle_nap/${mufa.id}/`}>{mufa.numero}</a> */}
                      </td>
                      <td className="py-1 px-4 border-b text-xs text-center"> {caja.splitter} </td>
                      <td className="py-1 px-4 border-b text-xs text-center">{caja.potencia}</td>
                      <td className="py-1 px-4 border-b text-xs text-center">{caja.barrioName} {caja.comunidadName}</td>
                      <td className="py-1 px-4 border-b text-xs text-center">{caja.ciudadName}</td>


                    </tr>
                  ))}
                </tbody>

              }
            </table>

            <NapModalCreate
              id_mufa={id_mufa}
            />



          </div>
        </div>
      )}
    </div>
  )
}
