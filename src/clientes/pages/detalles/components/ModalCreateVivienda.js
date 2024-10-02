import React from 'react'
import Select from "react-select"
import { useState, } from 'react';
import { SlHome } from "react-icons/sl";

import { usePostViviendaMutation, usePostClienteViviendaMutation } from '../../../services/clienteViviendaApi'

import { useGetBarriosQuery, useGetComunidadesQuery } from '../../../services/clienteCiudadesApi'

export default function ModalCreateVivienda({ clienteID }) {



    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")



    const { data: dataBarrios, isSuccess: isSuccessBarrios } = useGetBarriosQuery(user.access)
    const [barrio, setBarrios] = useState('');

    const { data: dataComunidades, isSuccess: isSuccessComunidaes } = useGetComunidadesQuery(user.access)
    const [comunidad, setComunidad] = useState('');




    const [fecha, SetFecha] = useState('');
    const [foto, setFoto] = useState(null);
    const [foto2, setFoto2] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [crearVivienda] = usePostViviendaMutation()
    const [crearClienteVivienda] = usePostClienteViviendaMutation()

    const guardarCambios = async (e) => {
        e.preventDefault()

        const direccion = e.target.elements.direccion.value.trim()
        const coordenadas = e.target.elements.coordenadas.value.trim()
        const formData = new FormData()
        formData.append('direccion', direccion)
        formData.append('coordenadas', coordenadas)
        formData.append('barrio', barrio)
        formData.append('comunidad', comunidad)
        formData.append('digitador', userDatos.id)
        if (foto){
            formData.append('foto',foto)
        }
        if (foto2){
            formData.append('foto2',foto2)
        }
        
        


        // const rest = {
        //     direccion: direccion,
        //     coordenadas: coordenadas,
        //     barrio: barrio,
        //     comunidad: comunidad,
        //     digitador: userDatos.id,
        //     foto:foto
        // }

        try {
            //const viviendaCreada = await crearVivienda({ access: user.access, rest: rest }).unwrap()
            const viviendaCreada = await crearVivienda({ access: user.access, rest: formData}).unwrap()
            alert('Datos enviados correctamente');

            await crearClienteVivienda({
                access: user.access,
                rest: {
                    cliente: clienteID,
                    vivienda: viviendaCreada.id,
                    fecha_inicio: fecha,
                    tipo: 1,
                    digitador: userDatos.id,
                  
                }
            })
        } catch (error) {
            console.log('ERRROR', error)

        }
        closeModal()

    }

    return (
        <>
            <button className="bg-green-400 hover:bg-green-600  font-bold mt-1 py-1 px-1 rounded" onClick={openModal}>
                <SlHome />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Nueva Vivienda</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='POST' className='p-5'>


                                <div className="grid grid-cols-1  gap-2">

                                    <div className="mb-1 mr-1">
                                        <label className="block text-xs font-semibold text-gray-500  ">Dirección:</label>
                                        <input
                                            required
                                            type="text"
                                            name="direccion"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>


                                    <div className="mb-1 mr-1">
                                        <label className="block text-xs font-semibold text-gray-500  ">Coordenadas:</label>
                                        <input
                                            required
                                            type="text"
                                            name="coordenadas"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>





                                    <div className='grid grid-cols-2 gap-2'>




                                        {isSuccessBarrios && (
                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-xs font-semibold text-gray-500  " >Barrio</label>

                                                <Select
                                                    options={dataBarrios}
                                                    onChange={(selectedOption) => setBarrios(selectedOption.value)}
                                                    //defaultValue={{value:responsableID,label:responsableName}} 

                                                    className='shadow-md'
                                                />
                                            </div>


                                        )}

                                        {isSuccessComunidaes && (
                                            <div className="mb-1">
                                                <label htmlFor="nacionalidad" className="block text-xs font-semibold text-gray-500  " >Comunidad</label>

                                                <Select
                                                    options={dataComunidades}
                                                    onChange={(selectedOption) => setComunidad(selectedOption.value)}

                                                    className='shadow-md'
                                                />
                                            </div>


                                        )}

                                        <div className=" ">

                                            <div className="mb-1">
                                                <label htmlFor="fecha_limite" className="block text-xs font-semibold text-gray-500 shadow-md ">Fecha:</label>
                                                <input
                                                    type="date"
                                                    name="fecha"
                                                    onChange={(e) => SetFecha(e.target.value)}
                                                    className="w-full p-2 border rounded-md shadow-md "
                                                    required
                                                />
                                            </div>

                                        </div>

                                      

                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                    <div className='shadow-md'>
                                            <label className="block text-xs font-semibold text-gray-500  ">Foto 1</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setFoto(e.target.files[0])}
                                                className='text-xs'

                                             
                                            />
                                        </div>

                                        <div className='shadow-md'>
                                            <label className="block text-xs font-semibold text-gray-500  ">Foto 2</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setFoto2(e.target.files[0])}
                                                className='text-xs'
                                               
                                            />
                                        </div>

                                    </div>
         






                                    <button
                                        type="submit"
                                        className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Guardar
                                    </button>

                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
