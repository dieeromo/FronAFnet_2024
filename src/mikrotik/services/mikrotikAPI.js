import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'



export const mikrotikAPI = createApi({

    reducerPath: 'mikrotikAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////

        getRoutersMK: builder.query({
            query: ({ access }) => {
                return {
                    url: `/mikrotik/RouterMK_Crud_View/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getRoutersMK']
        }),
        ////
        postRouterMK: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/mikrotik/RouterMK_Crud_View/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getRoutersMK']
        }),
        ////
        postAP: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/mikrotik/AP_nodos_Crud_View/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['get_AP_nodo_filter','getAP_nodos_crud']
        }),
        ////

        getAP_nodos_crud: builder.query({
            query: ({ access }) => {
                return {
                    url: `/mikrotik/AP_nodos_Crud_View/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getAP_nodos_crud']
        }),
        ////
        get_MikrotikPlanClienteFilter: builder.query({
            query: ({ access, id_planCliente }) => {
                let url1 = `/mikrotik/mikrotikPlanCliente/?`
                if (id_planCliente) url1 += `planCliente=${id_planCliente}`;
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['get_MikrotikPlanClienteFilter']
        }),

        ////
        postMikrotik_Plan_Cliente: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/mikrotik/Mikrotik_PlanClienteVivienda_Crud_View/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['get_MikrotikPlanClienteFilter']
        }),
        ////
        get_ClientesConectados_Nap: builder.query({
            query: ({ access, idNap }) => {
                let url1 = `/mikrotik/cajanap/clientes/`
                if (idNap) url1 += `${idNap}/`;
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['get_ClientesConectados_Nap']
        }),

    //
    get_ClientesConectados_AP: builder.query({
        query: ({ access, idAP }) => {
            let url1 = `/mikrotik/ap/clientes/`
            if (idAP) url1 += `${idAP}/`;
            return {
                url: url1,
                method: 'GET',
                headers: { Authorization: `JWT ${access}` },
            }
        },
        providesTags: ['get_ClientesConectados_AP']
    }),

          /////
          get_AP_nodo_filter: builder.query({
            query: ({ access, routerId, routerName, search, ordering }) => {
                let url1 = `/mikrotik/ap_nodos_filter/?`
                if (routerId) url1 += `router__id=${routerId}&`;
                if (routerName) url1 += `router__nombre=${routerName}&`;
                if (search) url1 += `search=${search}&`;
                if (ordering) url1 += `ordering=${ordering}&`;
       
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['get_AP_nodo_filter']
        }),


        ////////




    })
})

export const {
    useGetRoutersMKQuery,
    usePostRouterMKMutation,
    usePostAPMutation,

    useGetAP_nodos_crudQuery,
    usePostMikrotik_Plan_ClienteMutation,
    useGet_MikrotikPlanClienteFilterQuery,

    useGet_ClientesConectados_NapQuery,
    useGet_ClientesConectados_APQuery,
    useGet_AP_nodo_filterQuery,  // Obtener los ap por diferentes filtros

} = mikrotikAPI