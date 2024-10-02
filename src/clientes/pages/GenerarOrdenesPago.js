import React, { useState } from 'react'
import NavbarClientes from '../components/NavbarClientes'
import { usePostGenerarOrdenPagoMutation } from '../services/clienteViviendaApi'
import LoadingSpinner from '../components/LoadingSpinner'

export default function GenerarOrdenesPago() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const [fecha, SetFecha] = useState('');
    const [generarOrdenes, {isLoading}] = usePostGenerarOrdenPagoMutation()

    let respuesta_back

    const guardarCambios = async (e) => {
        e.preventDefault()
        try{
            const respuesta = await generarOrdenes({ access: user.access, fecha: fecha }).unwrap()
        
            alert('Ordenes de pago generados exitosamente');


            respuesta_back = respuesta
        }catch(error){
            console.log('error', error)

        }
       
     

       

    }
    if(isLoading){
        return(
            <div>
              <LoadingSpinner/>
            </div>
        )
    }
    return (
        <div>
            <NavbarClientes />

            <h1>Generación de ordenes de pago</h1>
            <form onSubmit={guardarCambios} method='PUT' className='p-5'>
                <div className="mb-4 mr-1">
                    <label className="block text-sm font-semibold text-gray-500  ">Ingresar la fecha del ultimo dia del mes que se desea generar:</label>
                    <input
                        required
                        type="date"
                        name="barrio"
                        onChange={(e) => SetFecha(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>


                <button
                    type="submit"
                    className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Guardar
                </button>

            </form>
{respuesta_back}
        </div>
    )
}
