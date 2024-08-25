import React from 'react';
import { RUTA_SERVIDOR } from '../../../../ApiRoutes'
import ModalCreatePlanClienteVivienda from '../../../components/ModalCreatePlanClienteVivienda'
import { useGetPlanClienteVivienda_clienteViviendaQuery } from '../../../services/clienteViviendaApi'
import PlanClienteViviendaCard from '../../../components/PlanClienteViviendaCard'
//import ImagenCard from '../../../components/ImagenCard'
import ImageGalleryModal from './ImagenesGalleryModal'


const ViviendaCard = ({ vivienda }) => {  //ES PLAN CLIENTE VIVIENDA

  const {
    ciudadBarrio,
    vivienda_barrio,
    ciudadComunidad,
    vivienda_comunidad,
    vivienda_coordenadas,
    vivienda_direccion,
    vivienda_foto,
    vivienda_foto2,
    id
  } = vivienda;


  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataPlanCliente, isSuccess: isSuccessPlanCliente } = useGetPlanClienteVivienda_clienteViviendaQuery({ access: user.access, clienteViviendaID: id });

  return (
    <div className='mt-5 bg-cyan-50 border border-cyan-400 py-3'>
      <div className='grid grid-cols-3 mt-1 p-2'>
        <div>
        {ciudadBarrio && (<span> <strong>{ciudadBarrio} - </strong> Barrio: {vivienda_barrio}</span>)}
        {ciudadComunidad && (<span> <strong>{ciudadComunidad} -</strong>  Comunidad: {vivienda_comunidad}</span>)}

        <div>
          <span className='text-xs pr-4'>Dirección: {vivienda_direccion}</span>
          <span className='text-xs'>Coordenadas: {vivienda_coordenadas}</span>
        </div>
        <ModalCreatePlanClienteVivienda
        clienteViviendaID ={id}
        />

        </div>

        <div  >
          {vivienda_foto && (
            <ImageGalleryModal
              images={RUTA_SERVIDOR + '/media/' + vivienda_foto}
            />
          )}
           </div>
           <div>
          {vivienda_foto2 && (
            <ImageGalleryModal
              images={RUTA_SERVIDOR + '/media/' + vivienda_foto2}
            />
          )}
          </div>
       

      </div>

      <div className=" border border-blue-500 m-2 grid grid-cols-2 m-3">
        <div className='col-span-2'>
          {isSuccessPlanCliente ?
            <div>
              {
                dataPlanCliente.map((item, index) => (
                  <PlanClienteViviendaCard
                    key={index}
                    planClienteVivienda={item}
                  />
                ))
              }
            </div>

            :
            <></>
          }

        </div>

      </div>


    </div>



  );
};

export default ViviendaCard;
