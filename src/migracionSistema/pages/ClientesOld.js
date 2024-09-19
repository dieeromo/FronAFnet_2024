import React, {useEffect} from 'react'
import { useGetClienteSistemaOldQuery } from '../services/migracionSistemaApi'
import { usePostClienteMutation } from '../../clientes/services/clienteClienteApi'
import {usePostViviendaMutation, usePostClienteViviendaMutation} from '../../clientes/services/clienteViviendaApi'

export default function ClientesOld() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data: dataClientes, isSuccess: isSuccessClientes, error } = useGetClienteSistemaOldQuery()
    const [crearCliente, {isSuccess:isSuccessCliente, isError:isErrorCliente} ]= usePostClienteMutation()
    const [crearVivienda, {isSuccess:isSuccessVivienda, isError:isErrorVivienda} ]= usePostViviendaMutation()
    const [crearClienteVivienda, {isSuccess:isSuccessClienteVivienda, isError:isErrorClienteVivienda} ]= usePostClienteViviendaMutation()

    console.log(dataClientes)
  
    const handleSubmit = async (e) => {
        e.preventDefault();


       dataClientes.data.forEach(async(item,index)=>{
        //    console.log('item',item)
            const nuevoCliente = {
                nombresApellidos: item.NombresApellidos,
                cedula: item.Cedula,
                telefono1:item.Ceuluar,
                tipoCliente:8,
                nacionalidadCliente:1,
                digitador:1,
                id_viejo: item.idCliente, 

            }

            const nuevaVivienda = {
                direccion : item.Dirección || "No direccion",
                coordenadas: item.coordenadas || "No coordenadas",
                barrio : 17,
                digitador:1,
                
            }
            try {
                const clienteResponse = await crearCliente({ access: user.access, rest: nuevoCliente}).unwrap();
                const clienteId = clienteResponse.id

                const viviendaResponse = await crearVivienda({ access: user.access, rest: nuevaVivienda}).unwrap();
                const viviendaId = viviendaResponse.id



                const clienteViviendaResponse = await crearClienteVivienda({ access: user.access, rest: {
                    cliente:clienteId,
                    vivienda: viviendaId,
                    tipo : 4,
                    digitador : 1

                    
                }}).unwrap();
                console.log('ClienteVivienda creada con éxito:', clienteViviendaResponse);
                //closeModal(); // Cerrar modal al éxito
            } catch (error) {
               // setErrorMessage('Ocurrió un error al guardar. Inténtalo nuevamente.');
                //setIsLoading(false); // Detiene la barra de carga al fallar
                console.log('error',error)
            }
            setTimeout(() => {
               
              }, 20);

        })

    // const nuevoCliente = {
    //     nombresApellidos: 'prueba paso',
    //     cedula: '0444',
    //     telefono1:'0999',
    //     tipoCliente:1,
    //     nacionalidadCliente:1,
    //     digitador:1

    // }

    

      
    };
    return (
        <div>

            <div>
                Pasar clientes
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

        </div>


    )
}
