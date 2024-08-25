import React from 'react';
import ModalCreateVivienda from './ModalCreateVivienda'
import ModalViviendasHistorico from './ModalViviendasHistorico'

const ClienteCard = ({ client }) => {
    return (
        <div className="rounded  border border-blue-400 overflow-hidden shadow-lg bg-gray-100 px-5 m-2">
            <div className="px-6 ">
                <div className=' '>
                    <span className="font-bold text-base font-bold mb-2 pr-3">{client.nombresApellidos}</span>
                    <span className="text-gray-700 text-xs pl-3 mr-10">CI:{client.cedula}</span>
                    <ModalCreateVivienda
                        clienteID={client.id}
                    />
                    <ModalViviendasHistorico
                    historicos={client.clienteviviendas}
                    />


                </div>
                <div>
                    <span className="text-gray-700 text-sm pr-2 "> Nacionalidad: {client.nacionalidadClienteLabel} </span>
                    <span className="text-gray-700 text-sm">Tipo: {client.tipoClienteLabel} </span>
                </div>

                <div>
                    <span className="text-gray-700 text-xs pr-2 "> Teléfono1: {client.telefono1} </span>
                    {
                        client.telefono2 && (<span className="text-gray-700 text-xs pr-2 "> Teléfono2: {client.telefono2} </span>)
                    }
                </div>
                <div>
                    {
                        client.email && (<span className="text-gray-700 text-xs pr-2 "> Email: {client.email} </span>)
                    }
                    {
                        client.observacion && (<span className="text-gray-700 text-xs pr-2 "> Observación:{client.observacion} </span>)
                    }
                </div>

            </div>
        </div>
    );
};

export default ClienteCard;
