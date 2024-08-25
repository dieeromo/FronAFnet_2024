import React, { useState } from 'react'
import NavbarClientes from '../../components/NavbarClientes'
import {
  useGetCiudadesQuery,
  useGetBarrios_ciudadQuery,
  useGetComundad_ciudadQuery,

} from '../../services/clienteCiudadesApi'
import CiudadButton from './components/CiudadButton'
import CiudadBarriosTable from './components/CiudadBarriosTable'
import CiudadComunidadesTable from './components/CiudadComunidadesTable'
import ModalCreateBarrio from '../../components/ModalCreatebarrio'
import ModalCreateComunidad from '../../components/ModalCreateComunidad'
export default function Ciudades() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const [selectedCiudadId, setSelectedCiudadId] = useState(null);


  const { data: dataCiudades, isSuccess: isSuccessCiudades } = useGetCiudadesQuery(user.access)

  const { data: dataBarrios, isSuccess: isSuccessBarrios } = useGetBarrios_ciudadQuery({ access: user.access, ciudad_id: selectedCiudadId, }, {
    skip: selectedCiudadId === null,
  });

  const { data: dataComunidad, isSuccess: isSuccessComunidad } = useGetComundad_ciudadQuery({ access: user.access, ciudad_id: selectedCiudadId, }, {
    skip: selectedCiudadId === null,
  });




  const handleCiudadClick = (ciudadBC) => {
    setSelectedCiudadId(ciudadBC.id);
  };

  return (
    <div>
      <NavbarClientes />
      <div>
        {isSuccessCiudades ?
          <div>
            {

              dataCiudades.map((item) => (
                <CiudadButton
                  key={item.id}
                  ciudad={item}
                  onClick={handleCiudadClick}
                />
              ))


            }
          </div>

          :
          <div>Cargando</div>
        }
      </div>
      {
        selectedCiudadId && (
          <div className='p-5'>
            <div>
              <ModalCreateBarrio
                ciudadID={selectedCiudadId}
              />

              <ModalCreateComunidad
              ciudadID={selectedCiudadId}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              {isSuccessBarrios ?
                <CiudadBarriosTable
                  barrios={dataBarrios}
                />
                :
                <>Cargando datos barrios</>
              }

              {
                isSuccessComunidad ? 
                <CiudadComunidadesTable
                comunidades={dataComunidad}
              />
              :
              <>Cargando datos comunidad</>
              }

  

          
            </div >

          </div>
        )
      }



    </div>
  )
}
