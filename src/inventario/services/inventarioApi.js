import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const inventarioApi = createApi({
    reducerPath: 'inventarioApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({
        ///
        postEquipoIngreso: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/inventario/equipo/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['geFacturasCompra']
        }),
        ////////

        getBodega: builder.query({
            query: ({ access }) => {
                return {
                    url: `/inventario/bodega/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getBodega']
        }),
        ////////
        getHomologado: builder.query({
            query: ({ access }) => {
                return {
                    url: `/inventario/homologado/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['geHomologado']
        }),

        ////////
        getFacturasEquipoID: builder.query({
            query: ({ access, facturaID }) => {
                return {
                    url: `/contabilidad/factura_equipo/${facturaID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['geFacturasCompra']
        }),
        /////
        getEquipos_todos: builder.query({
            query: ({ access, homologado, estado, estado2, bodega, search, page, page_size }) => {
                let url1 = `/inventario/get_equipos_filter/?`
                if (page) url1 += `page=${page}&`;
                if (homologado) url1 += `homologado=${homologado}&`;
                if (estado) url1 += `estado=${estado}&`
                if (estado2) url1 += `estado2=${estado2}&`;
                if (bodega) url1 += `bodega=${bodega}&`;
                if (search) url1 += `search=${search}&`;
                if (page_size) url1 += `page_size=${page_size}`;

                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEquipos_todos']
        }),
        ////////
        getEquipoID: builder.query({
            query: ({ access, equipoID }) => {
                return {
                    url: `/inventario/equipo/${equipoID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEquipoID']
        }),
        /////
        ////
        putEquipoBodega: builder.mutation({
            query: ({ access, equipoID, bodega }) => {
                return {
                    url: `/inventario/equipo/${equipoID}/`,
                    method: 'PATCH',
                    headers: { Authorization: `JWT ${access}` },
                    body: { bodega },
                }
            },
            invalidatesTags: ['getEquipoID', 'getEquipos_todos']

        }),
        ///////

        getEstadisticaEquiposGeneral: builder.query({
            query: ({ access }) => {
                return {
                    url: `/inventario/estadistica-equipos/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEstadisticaEquiposGeneral']
        }),

        ////

        getEstadisticaGeneralFiltro: builder.query({
            query: ({ access, homologado }) => {
                let url1 = `/inventario/estadistica-filtro/?`

                if (homologado) url1 += `homologado=${homologado}`;
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEstadisticaGeneralFiltro']
        }),



        ////////
        ////////
        getEquipoInstalado_equipo: builder.query({
            query: ({ access, equipoID }) => {
                return {
                    url: `/inventario/equiposInstalado_equipo/${equipoID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEquipoInstalado_equipo']
        }),
        /////

        ////////
        getEquipoBodega_equipo: builder.query({
            query: ({ access, equipoID }) => {
                return {
                    url: `/inventario/equiposBodega_equipo/${equipoID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEquipoBodega_equipo']
        }),
        /////



    })

})



export const {
    usePostEquipoIngresoMutation,
    useGetBodegaQuery,
    useGetHomologadoQuery,
    useGetFacturasEquipoIDQuery,
    useGetEquipos_todosQuery,
    useGetEquipoIDQuery,
    usePutEquipoBodegaMutation,
    useGetEstadisticaEquiposGeneralQuery,
    useGetEstadisticaGeneralFiltroQuery,
    useGetEquipoInstalado_equipoQuery,
    useGetEquipoBodega_equipoQuery,

} = inventarioApi