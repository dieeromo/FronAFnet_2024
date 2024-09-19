import React from 'react'

import { useGetPlanesSistemaOldQuery } from '../../services/migracionSistemaApi'
import { useGetClienteVivienda_clienteQuery } from '../../../clientes/services/clienteViviendaApi'
import { usePostPlan_clienteviviendaMutation } from '../../../clientes/services/clienteViviendaApi'
import PostPlanClienteVivienda2 from './PostPlanClienteVivienda2'
export default function PostPlanClienteVivienda({ clienteViviendaID, clienteID_viejo }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    // se trae el o los planes de cada cliente del sistema viejo por cada cliente a la vez
    const { data: dataPlan, isSuccess: isSuccessPlan, error: errorPlan } = useGetPlanesSistemaOldQuery(clienteID_viejo)
    console.log('data planes', dataPlan)

    // se trae el id de la tabla ClienteVivienda por cada cliente de la tabla Cliente del sistema nuevo
    //const { data: dataClienteVivienda, isSuccess: isSuccessClienteVivienda } = useGetClienteVivienda_clienteQuery({ access: user.access, clienteID: clienteID })
    //console.log('data id Cliente vivien', dataClienteVivienda)
    // Para hacer la insercion en la tabla PlanClienteVivienda del sistema nuevo
    const [crearPlanClienteVivienda, { isSuccess: isSuccessVivienda, isError: isErrorVivienda }] = usePostPlan_clienteviviendaMutation()



    return (
        <div>
            {/* id cliente vivienda: {clienteViviendaID} */}
            {isSuccessPlan && (
                <div>
                    
                    
                 
                    {
                        dataPlan.data.map((item) => (
                            <div>
                                 

                                <PostPlanClienteVivienda2
                                    clienteVivienda={clienteViviendaID}
                                    plan={5}
                                    fecha_instalacion={item.fechaContratacion}
                                    fecha_upgrade={item.fechaContratacion}
                                    fecha_pago={item.fechaContratacion}
                                    estado={1}
                                    estadoServicio={1}
                                    estadoEquipos={1}
                                    estadoGeneracionPagos={1}
                                    digitador={1}
                                />



                            </div>


                        ))
                    }
                </div>
            )}
        </div>
    )
}
