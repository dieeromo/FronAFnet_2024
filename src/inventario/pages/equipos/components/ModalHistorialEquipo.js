import React, { useState } from "react";
import { useGetEquipoInstalado_equipoQuery } from '../../../services/inventarioApi'
import { SlBookOpen } from "react-icons/sl";
export default function ModalHistorialEquipo({ equipoID }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataEquipo, isSuccess: isSuccessEquipo } = useGetEquipoInstalado_equipoQuery({ access: user.access, equipoID: equipoID })
  if(isSuccessEquipo){
    console.log('data equipo',dataEquipo)
  }
  
 
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>

      
      <button
        className="bg-gray-100 hover:bg-green-300 font-bold py-1 px-1 rounded text-xs"
        onClick={openModal}
      >
        <SlBookOpen />
      </button>
  

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-3/4 max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                <h3 className="text-lg font-semibold">Detalles de instalaciones</h3>
                <button
                  onClick={closeModal}
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-5 max-h-96 overflow-y-auto">
                {isSuccessEquipo && (
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-1 px-1 border-b text-xs text-center">#</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Cliente</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Dirección</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Plan</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Instalación</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Motivo</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Condicion</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Status</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Retiro</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Dias</th>
                        
                      </tr>

                    </thead>
                    <tbody>

                      
                      {dataEquipo.map((item, index) => (
                        <tr key={index}>
                          <td className="py-1 px-1 border-b text-xs text-center">{index+1}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.clienteName}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.direccionName}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.planName}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.fecha_instalacion}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">
                            {item.motivo==1&&(<span>Instalacion</span>)}
                            {item.motivo==2&&(<span>x Equipo dañado'</span>)}
                            {item.motivo==3&&(<span>Upgrade</span>)}
                            {item.motivo==4&&(<span>Otro</span>)}
                            </td>
                            <td className="py-1 px-1 border-b text-xs text-center">
                              {item.condicion===1&&(<span className="bg-green-300 p-1">Nuevo</span>)}
                              {item.condicion===2&&(<span className='bg-yellow-300 p-1'>Usado</span>)}
                              {item.condicion===3&&(<span className='bg-red-300 p-1 '>Dañado</span>)}
                              {item.condicion===4&&(<span className='bg-orange-300 p-1'>Revisar</span>)}
                            </td>
                          <td className="py-1 px-1 border-b text-xs text-center">
                            {item.estado===1&&(<span className="bg-green-300 p-1">Activo</span>)}
                            {item.estado===2&&(<span className="bg-gray-400 p-1">Pasivo</span>)}
                            </td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.fecha_retiro}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.diasInstalado}</td>

                        </tr>
                      ))}
                      



                    </tbody>
                  </table>

                )}
              </div>

              {/* Pie del modal */}
              <div className="flex justify-end p-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
    </>
  );
}
