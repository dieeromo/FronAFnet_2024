import React, {useEffect} from 'react'
import { useGetClienteSistemaOldQuery } from '../services/migracionSistemaApi'
import { usePostClienteMutation } from '../../clientes/services/clienteClienteApi'
export default function ClientesOld() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data: dataClientes, isSuccess: isSuccessClientes, error } = useGetClienteSistemaOldQuery()
    const [crearCliente, {isSuccess:isSuccessNuevo, isError:isErrorNuevo} ]= usePostClienteMutation()


    console.log(dataClientes)
  
    const handleSubmit = async (e) => {
        e.preventDefault();


    //    // dataClientes.data.map((item)=>{
    //     //    console.log('item',item)
    //         const nuevoCliente = {
    //             nombresApellido: item.NombresApellidos,
    //             cedula: item.Cedula,
    //             telefono1:item.Ceuluar,
    //             tipoCliente:1,
    //             nacionalidadCliente:1,
    //             digitador:1

    //         }
    //     //})

    const nuevoCliente = {
        nombresApellidos: 'prueba paso',
        cedula: '0444',
        telefono1:'0999',
        tipoCliente:1,
        nacionalidadCliente:1,
        digitador:1

    }

    crearCliente({access:user.access, rest:nuevoCliente})

      
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
