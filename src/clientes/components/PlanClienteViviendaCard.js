import React from 'react';
import ModalUpgrade from './ModalUpgrade'
import ModalCambioDomicilio from './ModalCambioDomicilio'
import {
  useGetEquipoInstaladoActivo_clienteViviendaQuery
} from '../services/clienteViviendaApi'
import { useGetPlanClienteViviendaIDQuery } from '../services/clienteViviendaApi'
import ModalAsignarEquipo from './ModalAsignarEquipo'
import EquiposPlanClienteViviendaCard from '../pages/detalles/components/EquiposPlanClienteViviendaCard'
import OrdenesCobroSinPagar_Card from './OrdenesCobroSinPagar_Card'
import ModalDetallesUpgrades from '../pages/detalles/components/ModalDetallesUpgrades'
import ModalGenerarOrdenIndividual from '../components/ModalGenerarOrdenIndividual'
import AsignarConexionModal from './AsignarConexionModal'
import ConexionCard from './ConexionCard'
import ModalCambioEstadoPlan from './ModalCambioEstadoPlan'

const PlanClienteViviendaCard = ({ planClienteVivienda }) => {

  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const { data: dataPlanClienteVivienda, isSuccess: isSuccessPlanClienteVivienda } = useGetPlanClienteViviendaIDQuery({ access: user.access, planClienteViviendaID: planClienteVivienda.planClienteViviendaID })

  const { data: dataEquiposPlaneClienteVivienda, isSuccess: isSuccessEquiposPlanClienteVivienda } = useGetEquipoInstaladoActivo_clienteViviendaQuery({ access: user.access, planClienteViviendaID: planClienteVivienda.planClienteViviendaID })


  return (
    <div className="rounded  shadow-lg bg-white border border-gray-200 p-4">

      <div className=' border border-blue-200'>
        <div className="mb-4 bg-gray-100 text-center">
          <span className=" font-bold text-blue-600 pr-5 text-lg">{planClienteVivienda.plan}</span>
          <span className=''>
            {planClienteVivienda.estado == 1 && (< span className='text-green-700 text-lg font-bold'>Activo</span>)}
            {planClienteVivienda.estado == 2 && (<span className='text-orange-500 text-lg font-bold'>Suspendido</span>)}
            {planClienteVivienda.estado == 3 && (<span className='text-red-500 text-lg font-bold'>Finalizado</span>)}
            {planClienteVivienda.estado == 4 && (<span className='text-blue-500 text-lg font-bold'>Upgrade</span>)}
          </span>
          <span className='text-gray-700 text-lg'> - {planClienteVivienda.estadoServicioDescripcion}</span>
          {
            isSuccessPlanClienteVivienda&&
            <ModalCambioEstadoPlan
            planID={dataPlanClienteVivienda.id}
            />
          }
       
        </div>

        <div className="mb-2 grid grid-cols-2">
          <div className='text-center'>
            <span className=" text-lg pr-4">Instalación: {planClienteVivienda.fecha_instalacion}</span>
            <span className=" text-lg pr-4">Upgrade: {planClienteVivienda.fecha_upgrade} </span>
            <span className="text-lg">Pago: {planClienteVivienda.fecha_pago}</span>

          </div>
          <div>

            <ModalUpgrade
              planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
              planID={planClienteVivienda.planID}
              planName={planClienteVivienda.plan}
            />
            <ModalGenerarOrdenIndividual
              planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
              planID={planClienteVivienda.planID}
              planName={planClienteVivienda.plan}

            />

            <ModalCambioDomicilio
              planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
              clienteID={planClienteVivienda.clienteID}
              clienteViviendName={planClienteVivienda.clienteVivienda}
              clienteViviendaID={planClienteVivienda.clienteViviendID}
            />

            <ModalAsignarEquipo
              planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
            />


            {isSuccessPlanClienteVivienda && (
              <ModalDetallesUpgrades
                upgrades={dataPlanClienteVivienda.upgrades}

              />
            )}

            <AsignarConexionModal
              planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
            />






          </div>

        </div>




      </div>


      <div className='grid grid-cols-2 gap-2 m-2'>
        <div className=' border border-blue-300 '>
          <OrdenesCobroSinPagar_Card
            planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
          />
        </div>
        <div>
          <div className='mb-4' >
            {isSuccessEquiposPlanClienteVivienda && (
              <div className='border border-blue-300'>
                <EquiposPlanClienteViviendaCard
                  equipos={dataEquiposPlaneClienteVivienda} />

              </div>
            )}

          </div>
          <div>
            {isSuccessEquiposPlanClienteVivienda && (
              <div className='border border-blue-300'>
                <ConexionCard
                  planClienteViviendaID={planClienteVivienda.planClienteViviendaID}
                />

              </div>
            )}

          </div>


        </div>







      </div>






    </div>
  );
};

export default PlanClienteViviendaCard;
