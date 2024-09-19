import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import './App.css';
import Dashboard from './usuarios/pages/Dashboard';
import Auth from './usuarios/pages/Auth';
import Salir from './usuarios/pages/Salir'
import Landing from './usuarios/pages/Landing'


import Clientes from './clientes/pages/clientesOrdenesInstalacion/Clientes'
import Ciudades from './clientes/pages/ciudades/Ciudades'
import Prueba from './clientes/pages/Prueba'
import ClientesInstalados from './clientes/pages/clientesInstalados/ClientesInstalados'
import ClienteDetalles from './clientes/pages/detalles/ClienteDetalles'


//CONTABILIDAD
import Contabilidad from './contabilidad/page/Contabilidad'

import FacturaEquipo from './contabilidad/page/facturaEquipos/FacturaEquipo'
import DetallesFacturaProveedores from './contabilidad/page/facturaEquipos/DetallesFacturaProveedores'

//INVENTARIO
import InventarioLanding from './inventario/pages/InventarioLanding'
import EquiposFactura from './inventario/pages/equipos/EquiposFactura'
import EquiposTodos from './inventario/pages/equipos/EquiposTodos'

//INFRAESTRUCTURA FIBRA OPTICAA
import MufasNap from './infraestructuraFO/pages/mufasNap/MufasNap'
import MufaDetalleNap from './infraestructuraFO/pages/mufasNap/MufaDetalleNap'

//MIKRITIK

import RoutersMK from './mikrotik/pages/routersMK/RoutersMK'
import ApRouter from './mikrotik/pages/aps/ApRouter'

//MIGRACION
import ClientesOld from './migracionSistema/pages/ClientesOld'
import PlanClienteViviendaOld from './migracionSistema/pages/PlanClienteViviendaOld'

import OrgChartTree from './pruebas/BinTree'


function App() {

  return (
    // className="bg-gray-900 text-gray-300 min-h-screen"
    <div >
      <BrowserRouter>
        {/* < SessionExpirationNotifier/> */}
        <Routes>
          {/* Pea */}
          <Route path='/arbol' element={<OrgChartTree />} />
    
          {/* Acreditacion */}
          <Route path='/' element={<Navigate to='/landing' replace />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/salir' element={<Salir />} />


          <Route path='/clientes' element={<Clientes />} />
          <Route path='/ciudades' element={<Ciudades />} />
          <Route path='/prueba' element={<Prueba />} />
          <Route path='/instalados' element={<ClientesInstalados />} />
          <Route path='/detalles/:id' element={<ClienteDetalles />} />

          {/* facturas proveedores */}
          <Route path='/contabilidad' element={<Contabilidad />} />
          <Route path='/contabilidad/factura_equipo' element={<FacturaEquipo />} />
          <Route path='/fp/facturasdetalles/:id' element={<DetallesFacturaProveedores />} />

          {/* FACTURAS SERVICIOS */}
          

          {/* inventario */}
          <Route path='/inventario/' element={<InventarioLanding />} />
          <Route path='/inventario/equipos_factura/:id' element={<EquiposFactura />} />
          <Route path='/inventario/equipos_todos/' element={<EquiposTodos />} />

          
          {/* infraestructura */}
          <Route path='/infraestruturafo/mufasnap/' element={<MufasNap/>} />
          <Route path='/infraestruturafo/mufa_detalle_nap/:id_mufa' element={<MufaDetalleNap/>} />

          {/* MIKRITIK */}
          <Route path='/mikrotik/routers/' element={<RoutersMK/>} />
          <Route path='/mikrotik/ap_router/:id_router' element={<ApRouter/>} />

          {/* MIGRACION */}
        
         
          <Route path='/migracion/clientes' element={<ClientesOld/>} />   {/* Migrar solo clientes */}
          <Route path='/migracion/planclientevivienda' element={<PlanClienteViviendaOld/>} /> {/* Migrar planes */}



        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
