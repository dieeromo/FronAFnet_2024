import React, { useState } from 'react'
import NavbarInfraestructuraFO from '../../components/NavbarInfraestructuraFO'
import { useGetMufas_filterQuery } from '../../services/infraestructuraFOApi'
import SubtableMufa1 from './components/SubtableMufa1'
import SubtableCajas from './components/SubtableCajas'
import MufaModal from './components/MufaModal'
export default function MufasNap() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const [numero, setNumero] = useState('')
  const handleNumero = (e) => {
    setNumero(e.target.value);

  };

  const [comunidad, setComunidad] = useState('')
  const handleComunidad = (e) => {
    setComunidad(e.target.value);

  };

  const [barrio, setBarrio] = useState('')
  const handleBarrio = (e) => {
    setBarrio(e.target.value);

  };

  const [ciudad, setCiudad] = useState('')
  const handleCiudad = (e) => {
    setCiudad(e.target.value);

  };


  const { data: dataMufas, isSuccess: isSuccessMufas } = useGetMufas_filterQuery({
    access: user.access,
    numero: numero,
    barrio: barrio,
    comunidad: comunidad,
    ciudad:ciudad
  })
  console.log(dataMufas)
  return (
    <div>

      <NavbarInfraestructuraFO />
      <div className='grid grid-cols-4 gap-4 m-5'>



        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por numero"
            className="px-4 py-1 border rounded w-full text-xs"
            value={numero}
            onChange={handleNumero}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por comunidad"
            className="px-4 py-1 border rounded w-full text-xs"
            value={comunidad}
            onChange={handleComunidad}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por barrio"
            className="px-4 py-1 border rounded w-full text-xs"
            value={barrio}
            onChange={handleBarrio}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por ciudad"
            className="px-4 py-1 border rounded w-full text-xs"
            value={ciudad}
            onChange={handleCiudad}
          />
        </div>
      </div>
      <MufaModal/>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b text-xs text-center">#</th>
            <th className="py-2 px-4 border-b text-xs text-center">Mufa</th>
            <th className="py-2 px-4 border-b text-xs text-center">Splitter</th>
            <th className="py-2 px-4 border-b text-xs text-center">Sector</th>
            <th className="py-2 px-4 border-b text-xs text-center">Ciudad</th>
            <th className="py-2 px-4 border-b text-xs text-center">Cajas</th>


          </tr>
        </thead>
        {isSuccessMufas &&
          <tbody>
            {dataMufas.results.map((mufa, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-green-600 text-xs text-center text-gray-400">{index + 1}</td>
                <td className="py-2 px-4 border-b border-green-600 text-base text-center">
                  
                  <a href={`/infraestruturafo/mufa_detalle_nap/${mufa.id}/`}>{mufa.numero}</a>
                  </td>
                <td className="py-2 px-4 border-b border-green-600 text-xs text-center">

                  <SubtableMufa1
             
                    splitter={mufa.splitter}
                    potencia={mufa.potencia}
                    splitter_ad={mufa.splitter_ad}
                  />



                </td>
                <td className="py-2 px-4 border-b border-green-600 text-xs text-center">
                  <div>{mufa.barrioName} {mufa.comunidad}</div>
                  <div className='text-blue-500'>{mufa.coordenadas}</div>
                  
                  </td>
                <td className="py-2 px-4 border-b border-green-600 text-xs text-center">{mufa.ciudadName}</td>
                <td className="py-2 px-4 border-b border-green-600 text-xs text-center">
                  {mufa.cajasNap &&
                    <SubtableCajas
                      data={mufa.cajasNap}
                    />
                 
                  }

                </td>

              </tr>
            ))}
          </tbody>
          
        }
      </table>

    </div>
  )
}
