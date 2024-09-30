import React from 'react'

import { usePostPlan_clienteviviendaMutation } from '../../../clientes/services/clienteViviendaApi'
export default function PostPlanClienteVivienda2({
    clienteVivienda,
    plan,
    fecha_instalacion,
    fecha_upgrade,
    fecha_pago,
    estado,
    estadoServicio,
    estadoEquipos,
    estadoGeneracionPagos,
    digitador,

}) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")


    const [crearPlanClienteVivienda, { isSuccess: isSuccessVivienda, isError: isErrorVivienda }] = usePostPlan_clienteviviendaMutation()

  try {
        const nuevoPlanCliente = {
            clienteVivienda: clienteVivienda,
            plan:plan,
            fecha_instalacion: fecha_instalacion,
            fecha_upgrade: fecha_upgrade,
            fecha_pago: fecha_pago,
            estado:estado,
            estadoServicio:estadoServicio,
            estadoEquipos:estadoEquipos,
            estadoGeneracionPagos:estadoGeneracionPagos,
            digitador:digitador,
        }
        console.log('nuevo plan',nuevoPlanCliente)

        crearPlanClienteVivienda({access:user.access, rest:nuevoPlanCliente})

     } catch (error) {

     }

    
  return (
    <div>Post 2</div>
  )
}
