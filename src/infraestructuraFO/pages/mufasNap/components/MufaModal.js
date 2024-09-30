import React, { useState } from 'react';
//import { useCreateMufaMutation } from './mufaApi'; // Asegúrate de tener tu API setup
import { ClipLoader } from 'react-spinners'; // Puedes instalar react-spinners con `npm install react-spinners`
import { usePostMufaMutation } from '../../../services/infraestructuraFOApi'
import { useGetBarriosQuery, useGetComunidadesQuery } from '../../../../clientes/services/clienteCiudadesApi'
import {useGet_puertosTarjetaQuery} from '../../../services/infraestructuraFO_cuartoApi'
import Select from "react-select"


const MufaModal = () => {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data: dataBarrio, isSuccess: isSuccessBarrio } = useGetBarriosQuery(user.access)
    
    const { data: dataComunidad, isSuccess: isSuccessComunidad } = useGetBarriosQuery(user.access)
    const { data: dataPuertoTarjeta, isSuccess: isSuccessPuertoTarjeta } = useGet_puertosTarjetaQuery({access:user.access})
    console.log('puertos', dataPuertoTarjeta)
   // let selector_barrio_ciudad


    const [isOpen, setIsOpen] = useState(false);
    const [numero, setNumero] = useState('');
    const [splitter, setSplitter] = useState('');
    const [potencia, setPotencia] = useState('');
    const [barrio, setBarrio] = useState('');
    const [puerto_olt, setPuerto_olt] = useState('');
    const [comunidad, setComunidad] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Estado para la barra de carga
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar errores
    const[coordenadas,setCoordenadas] = useState('')
    const [isBarrioSelected, setIsBarrioSelected] = useState(true); // Control para alternar entre Barrio y Comunidad


    const [createMufa] = usePostMufaMutation();

    const openModal = () => {
        setIsOpen(true);
        setErrorMessage(''); // Resetea el mensaje de error al abrir el modal
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsLoading(false); // Asegúrate de resetear el estado de carga al cerrar el modal
        setNumero('');
        setSplitter('');
        setPotencia('');
        setBarrio('');
        setComunidad('');
        setCoordenadas('')

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Inicia la barra de carga
        setErrorMessage(''); // Resetea el mensaje de error

        const newMufa = {
            numero,
            splitter,
            potencia,
            barrio,
            comunidad,
            coordenadas,
            puerto_olt,

        };

        try {
            await createMufa({ access: user.access, rest: newMufa }).unwrap();
            closeModal(); // Cerrar modal al éxito
        } catch (error) {
            setErrorMessage('Ocurrió un error al guardar. Inténtalo nuevamente.');
            setIsLoading(false); // Detiene la barra de carga al fallar
        }
    };

    const toggleSelection = () => {
        setIsBarrioSelected(!isBarrioSelected); // Cambia entre barrio y comunidad
    };

    return (
        <>
            {/* Botón para abrir el modal */}
            <button
                onClick={openModal}
                className="bg-green-700 text-white px-2 py-1 rounded-md hover:bg-green-800"
            >
                +Mufa
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Nueva mufa</h2>

                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}

                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                                    <label htmlFor="nacionalidad" className="block text-sm  text-gray-500  " >Puerto OLT:</label>
                                    {isSuccessPuertoTarjeta ?
                                        <Select
                                            options={dataPuertoTarjeta}
                                            onChange={(selectedOption) => setPuerto_olt(selectedOption.value)}
                                            className='shadow-md'
                                        />
                                        :
                                        <>cargando viviendas</>
                                    }

                                </div>
                            <div className="mb-4">
                                <label className="block text-sm  text-gray-500">Número</label>
                                <input
                                    type="number"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    required
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Número"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-500">Splitter</label>
                                <input
                                    type="number"
                                    value={splitter}
                                    onChange={(e) => setSplitter(e.target.value)}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Splitter"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-500">Potencia</label>
                                <input
                                    type="text"
                                    value={potencia}
                                    onChange={(e) => setPotencia(e.target.value)}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Potencia"
                                />
                            </div>

                            {/* Botón para alternar entre Barrio y Comunidad */}
                            <div className="mb-1 flex justify-between items-center">
                                <span className="block text-sm font-medium text-gray-500">
                                    Seleccione {isBarrioSelected ? 'el barrio' : 'la comunidad'}

                                </span>
                                <button
                                    type="button"
                                    onClick={toggleSelection}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                >
                                    {/* {isBarrioSelected ? 'Comunidad' : 'Barrio'} */}
                                    Cambiar
                                </button>
                            </div>

                            {isBarrioSelected ?



                                <div className="mb-3">
                                    <label htmlFor="nacionalidad" className="block text-sm  text-gray-500  " >Barrio:</label>
                                    {isSuccessBarrio ?
                                        <Select
                                            options={dataBarrio}
                                            onChange={(selectedOption) => setBarrio(selectedOption.value)}
                                            className='shadow-md'
                                        />
                                        :
                                        <>cargando viviendas</>
                                    }

                                </div>

                                :
                                <div className="mb-3">
                                    <label htmlFor="nacionalidad" className="block text-sm  text-gray-500  " >Comunidad:</label>
                                    {isSuccessBarrio ?
                                        <Select
                                            options={dataComunidad}
                                            onChange={(selectedOption) => setComunidad(selectedOption.value)}
                                            className='shadow-md'
                                        />
                                        :
                                        <>cargando viviendas</>
                                    }

                                </div>
                            }

                            <div className="mb-4">
                                <label className="block text-sm text-gray-500">Coordenadas</label>
                                <input
                                    type="text"
                                    value={coordenadas}
                                    onChange={(e) => setCoordenadas(e.target.value)}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Coordenadas"
                                />
                            </div>


                            {/* Indicador de carga */}
                            {isLoading ? (
                                <div className="flex justify-center mb-4">
                                    <ClipLoader size={30} color="#4A90E2" />
                                    <p className="ml-2 text-gray-500">Guardando...</p>
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default MufaModal;
