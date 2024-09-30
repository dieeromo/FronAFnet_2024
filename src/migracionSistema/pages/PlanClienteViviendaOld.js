import React, { useEffect, useState } from 'react'


import { useGetPlanesSistemaOld_todosQuery } from '../services/migracionSistemaApi'
import { useGetClientesQuery } from '../../clientes/services/clienteClienteApi'
import PostPlanClienteVivienda from './components/PostPlanClienteVivienda'
import { usePostPlan_clienteviviendaMutation } from '../../clientes/services/clienteViviendaApi'

export default function PlanClienteViviendaOld() {


    const user = JSON.parse(localStorage.getItem('user') || "{}")

    //todos los clientes de la tabla clientes - NUEVO
    const { data: dataClientes, isSuccess: isSuccessClientes, error } = useGetClientesQuery(user.access)
    console.log('clientes', dataClientes)


       // se trae el o los planes de cada cliente del sistema viejo por cada cliente a la vez
       const { data: dataPlan, isSuccess: isSuccessPlan, error: errorPlan } = useGetPlanesSistemaOld_todosQuery()
       console.log('data planes', dataPlan, errorPlan)
       const [crearPlanClienteVivienda, { isSuccess: isSuccessVivienda, isError: isErrorVivienda }] = usePostPlan_clienteviviendaMutation()

    const [startProcess, setStartProcess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        //setStartProcess(true)


        dataClientes.forEach(async(item,index)=>{
            const planFiltrado = dataPlan.data.filter(planf=>planf.idCliente===item.id_viejo)
            console.log(item, planFiltrado)

                planFiltrado.forEach(async(itemPlan)=>{
                    try{
                        const nuevoPlanCliente = {
                            clienteVivienda: item.clienteviviendas[0].id,
                            plan:6,
                            fecha_instalacion: itemPlan.fechaContratacion,
                            fecha_upgrade: itemPlan.fechaContratacion,
                            fecha_pago: itemPlan.fechaContratacion,
                            estado:1,
                            estadoServicio:1,
                            estadoEquipos:1,
                            estadoGeneracionPagos:1,
                            digitador:1,
                        }
                        const nuevoPlanClienteVivienda = await crearPlanClienteVivienda({access:user.access, rest:nuevoPlanCliente}).unwrap()

                    }catch(error){

                    }

            

                })



        })



    };
    return (
        <div>

            <div>
                Pasar clientes vivienda plan
            </div>
            <form onSubmit={handleSubmit}>



                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                </div>

            </form>




            {startProcess && (
                <div>
                    {dataClientes.map((item, index) => (
                        <div>
                            <PostPlanClienteVivienda
                                clienteViviendaID={item.clienteviviendas[0].id}
                                clienteID_viejo={item.id_viejo}
                            />


                        </div>


                    ))

                    }
                </div>


            )}

        </div>


    )
}
