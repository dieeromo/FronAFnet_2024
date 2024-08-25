import React, { useState } from "react";

export default function ModalDetalleUpgrades({ upgrades}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="bg-gray-300 mx-3 hover:bg-green-400  py-1 px-1 rounded text-xs"
        onClick={openModal}
      >
        Ver Upgrades
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-3/4 max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                <h3 className="text-lg font-semibold">Detalles de upgrades</h3>
                <button
                  onClick={closeModal}
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-5 max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr >
                      <th className="px-3 py-1 bg-gray-50 text-center text-xs text-gray-500">
                        Plan
                      </th>
                      <th className="px-3 py-1 bg-gray-50 text-center text-xs text-gray-500">
                        Fecha
                      </th>
                  
  
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upgrades.map((upgrade, index) => (
                      <tr key={index}>
                        <td className="px-2 py-1 text-xs text-center">
                          {upgrade.planName}
                        </td>
                        <td className="px-6 py-1 text-xs text-center">
                          {upgrade.fecha}
                        </td > 
                     
              
                      </tr>
                    ))}
                  </tbody>
                </table>
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
