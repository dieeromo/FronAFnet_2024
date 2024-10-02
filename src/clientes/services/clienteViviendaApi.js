import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const clienteViviendaApi = createApi({
    reducerPath: 'clienteViviendaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        postVivienda: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/vivienda/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['']

        }),
        ///////
        postClienteVivienda: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/clientevivienda/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getClienteVivienda_cliente'],
        }),
        ////
        putClienteVienda: builder.mutation({
            query: ({ access, rest, ID }) => {
                return {
                    url: `/cliente/clientevivienda/${ID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getClienteVivienda_cliente']
        }),
        ////////



        ////////
        getClienteVivienda_cliente: builder.query({
            query: ({ access, clienteID }) => {
                return {
                    url: `/cliente/cliente_vivienda_cliente/?cliente_id=${clienteID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getClienteVivienda_cliente']

        }),
        ///////

        ////////
        getClienteVivienda_ID: builder.query({
            query: ({ access, clienteViviendaID }) => {
                return {
                    url: `/cliente/clientevivienda/${clienteViviendaID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: []

        }),
        ///////
        postPlan_clientevivienda: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/plan_clientevivienda/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: [''],
        }),


        ////////
        ////////
        getPlanes: builder.query({
            query: ({ access }) => {
                return {
                    url: `/cliente/plan_internet`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ///////
        getPlanClienteVivienda_clienteVivienda: builder.query({
            query: ({ access, clienteViviendaID }) => {
                return {
                    url: `/cliente/plan_clientevivienda_clientevivienda/?clientevivienda_id=${clienteViviendaID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////
        getPlanClienteViviendaID: builder.query({
            query: ({ access, planClienteViviendaID }) => {
                return {
                    url: `/cliente/plan_clientevivienda/${planClienteViviendaID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////
        putPlanClienteVvienda: builder.mutation({
            query: ({ access, rest, ID }) => {
                return {
                    url: `/cliente/plan_clientevivienda/${ID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['']
        }),
        ////////
        ////
        getEquipoInstaladoActivo_clienteVivienda: builder.query({
            query: ({ access, planClienteViviendaID }) => {
                return {
                    url: `/inventario/equipo_instalado_activo_plan/?plan_cliente_vivienda_id=${planClienteViviendaID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEquipoInstaladoActivo_clienteVivienda']

        }),
        ////
        ///////
        postEquipoInstalado: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/inventario/equipo_instalado/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getEquipoInstaladoActivo_clienteVivienda'],
        }),


        ////////
        ////
        getEquipo_NoInstalado: builder.query({
            query: ({ access }) => {
                return {
                    url: `/inventario/lista_equipo_noinstalado/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEquipo_NoInstalado']

        }),
        ////

        ////
        getOrdenCobro_clienteVivienda_sinPagar: builder.query({
            query: ({ access, planClienteViviendaID }) => {
                return {
                    url: `/cliente/orden_cobro_cliente_sin_pagar/?planclientevivienda_id=${planClienteViviendaID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////
        ///////
        postPagoPlanClienteVivienda: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/pagosplan_clientevivienda/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: [''],
        }),


        ////////
        ///////
        postOrdenCobroPlanClienteVivienda: builder.mutation({
            query: ({ access, rest }) => {
                return {
                    url: '/cliente/orden_cobro/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: [''],
        }),

        ////useGetOrdenesPagadasAbonos_PlanclienteViviendaQuery,
        getOrdenesPagadasAbonos_PlanclienteVivienda: builder.query({
            query: ({ access, planClienteViviendaID }) => {
                return {
                    url: `/cliente/get_ordenes_pagadas_plancliente/${planClienteViviendaID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////
        ///////
        putEquipoInstado_a_pasivo: builder.mutation({
            query: ({ access, equipoInstaladoID, estado, fecha_retiro }) => ({
                url: `/inventario/equipo_instalado/${equipoInstaladoID}/`,
                method: 'PATCH',
                body: { estado, fecha_retiro },
                headers: { Authorization: `JWT ${access}` },
            }),
            invalidatesTags: ['getEquipoInstaladoActivo_clienteVivienda', '']
        }),
        /////

        postGenerarOrdenPago: builder.mutation({
            query: ({ access, fecha }) => {

                return {
                    url: `/cliente/generar-ordenes-cobro/${fecha}/`,
                    method: 'POST',
                    body: fecha,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: [''],
        }),
        //

    })

})



export const {
    usePostViviendaMutation,
    usePostClienteViviendaMutation,
    useGetClienteVivienda_clienteQuery,
    usePutClienteViendaMutation,
    useGetClienteVivienda_IDQuery,

    useGetPlanesQuery,
    usePostPlan_clienteviviendaMutation,

    useGetPlanClienteVivienda_clienteViviendaQuery,
    usePutPlanClienteVviendaMutation,
    useGetPlanClienteViviendaIDQuery,


    //estos son para los equipos
    useGetEquipoInstaladoActivo_clienteViviendaQuery,
    useGetEquipo_NoInstaladoQuery,
    usePostEquipoInstaladoMutation,

    // para cobros
    useGetOrdenCobro_clienteVivienda_sinPagarQuery,
    usePostPagoPlanClienteViviendaMutation,
    useGetOrdenesPagadasAbonos_PlanclienteViviendaQuery,
    usePostOrdenCobroPlanClienteViviendaMutation,

    //actualiza la tabla equipi instalado
    usePutEquipoInstado_a_pasivoMutation,

    //generar ordenes de pago
    usePostGenerarOrdenPagoMutation




} = clienteViviendaApi