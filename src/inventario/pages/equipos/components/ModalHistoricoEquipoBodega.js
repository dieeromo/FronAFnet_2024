import React, { useState } from "react";
import { useGetEquipoBodega_equipoQuery} from '../../../services/inventarioApi'
import { SlHome } from "react-icons/sl";
export default function ModalHistoricoEquipoBodega({ equipoID }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data: dataEquipo, isSuccess: isSuccessEquipo } = useGetEquipoBodega_equipoQuery({ access: user.access, equipoID: equipoID })
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
       <SlHome />
      </button>
  

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-3/4 max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                <h3 className="text-lg font-semibold">Detalles de movimientos en bodegas</h3>
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
                        <th className="py-1 px-1 border-b text-xs text-center">Equipo</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Serie</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Bodega</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Ingreso</th>
                        <th className="py-1 px-1 border-b text-xs text-center">Movimiento</th>
 
                      </tr>

                    </thead>
                    <tbody>

                      
                      {dataEquipo.map((item, index) => (
                        <tr key={index}>
                          <td className="py-1 px-1 border-b text-xs text-center">{index+1}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.equipoHomologado}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.equipoSerie}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.bodegaName}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.fecha_ingreso}</td>
                          <td className="py-1 px-1 border-b text-xs text-center">{item.fecha_sistema}</td>

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
