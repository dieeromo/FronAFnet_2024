import {configureStore} from '@reduxjs/toolkit'
import {authApi} from '../usuarios/services/authApi'
import authReducer from '../usuarios/features/authSlice'

import { authDatosApi } from '../usuarios/services/authDatosApi'
import authDatosReducer from '../usuarios/features/authDatosSlice'

import {clienteCiudadesApi} from '../clientes/services/clienteCiudadesApi'
import {clienteClienteApi} from '../clientes/services/clienteClienteApi'
import {clienteViviendaApi} from '../clientes/services/clienteViviendaApi'
import {contabilidadApi} from '../contabilidad/services/contabilidadApi'
import {inventarioApi} from '../inventario/services/inventarioApi'
import {infraestructuraFOApi} from '../infraestructuraFO/services/infraestructuraFOApi'
import {infraestructuraFO_cuartoApi} from '../infraestructuraFO/services/infraestructuraFO_cuartoApi'
import {mikrotikAPI} from '../mikrotik/services/mikrotikAPI'

import {migracionSistemaApi} from '../migracionSistema/services/migracionSistemaApi'

import {setupListeners} from '@reduxjs/toolkit/query/react'


export const store = configureStore({
    reducer:{
        authDatos: authDatosReducer,
        [authApi.reducerPath]:authApi.reducer,

        auth: authReducer,
        [authDatosApi.reducerPath]:authDatosApi.reducer,

        [clienteCiudadesApi.reducerPath]:clienteCiudadesApi.reducer,
        [clienteClienteApi.reducerPath]:clienteClienteApi.reducer,
        [clienteViviendaApi.reducerPath]:clienteViviendaApi.reducer,
        [contabilidadApi.reducerPath]:contabilidadApi.reducer,
        [inventarioApi.reducerPath]:inventarioApi.reducer,
        [infraestructuraFOApi.reducerPath]:infraestructuraFOApi.reducer,
        [infraestructuraFO_cuartoApi.reducerPath]:infraestructuraFO_cuartoApi.reducer,
        [mikrotikAPI.reducerPath]:mikrotikAPI.reducer,
        [migracionSistemaApi.reducerPath]:migracionSistemaApi.reducer,

 
        
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware, 
        authDatosApi.middleware,
        clienteCiudadesApi.middleware,
        clienteClienteApi.middleware,
        clienteViviendaApi.middleware,
        contabilidadApi.middleware,
        inventarioApi.middleware,
        infraestructuraFOApi.middleware,
        infraestructuraFO_cuartoApi.middleware,
        mikrotikAPI.middleware,
        migracionSistemaApi.middleware,


        )
})


export const AppDispatch = store.dispatch;
export const RootState = store.getState();
setupListeners(store.dispatch)