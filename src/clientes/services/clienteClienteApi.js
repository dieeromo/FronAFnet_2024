import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const clienteClienteApi = createApi({
    reducerPath: 'clienteClienteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({
        ////////
        getTipoCliente: builder.query({
            query: ({ access }) => {
                return {
                    url: `/cliente/tipo/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),

        ////////

        ////////
        getNacionalidad: builder.query({
            query: ({ access }) => {
                return {
                    url: `/cliente/nacionalidad/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////////
        ////////
        getClientes: builder.query({
            query: (access) => {
                return {
                    url: `/cliente/cliente/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////////
        getClienteID: builder.query({
            query: ({ access, clienteID }) => {
                return {
                    url: `/cliente/cliente/${clienteID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getClienteID']

        }),
        ////////
        getClientes: builder.query({
            query: (access) => {
                return {
                    url: `/cliente/cliente/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////////
        ////////
        postOrdenInstalacion: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/ordeninstalacion/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getOrdenes_estado']

        }),
        ///////
        ////
        putOrdenInstalacion: builder.mutation({
            query: ({ access, ordenID, rest }) => {
                return {
                    url: `/cliente/ordeninstalacion/${ordenID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getOrdenes_estado']

        }),
        ///////Í

        ////////
        getOrdenes_estado: builder.query({
            query: ({ access, estado_instalacion }) => {
                return {
                    url: `/cliente/ordenes_estado/?estado_instalacion=${estado_instalacion}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getOrdenes_estado']

        }),
        ////////

        ////////
        getOrdenes_id: builder.query({
            query: ({ access, id }) => {
                return {
                    url: `/cliente/ordeninstalacion/${id}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getOrdenes_estado']

        }),
        ////////

        ////////
        getClienteFilterPagination: builder.query({
            query: ({ access, page, search, page_size }) => {
                return {
                    url: `/cliente/cliente_filter/?page=${page}&search=${search}&page_size=${page_size}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getClienteFilterPagination']

        }),
        ////////
          ////
          putClienteInstalado: builder.mutation({
            query: ({ access, clienteID, rest }) => {
                return {
                    url: `/cliente/cliente/${clienteID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getClienteFilterPagination','getClienteID']

        }),
        ///////
        /////




    })

})



export const {
    useGetTipoClienteQuery,
    useGetNacionalidadQuery,
    useGetClientesQuery,
    useGetClienteIDQuery,
    usePostOrdenInstalacionMutation,
    useGetOrdenes_estadoQuery,
    useGetOrdenes_idQuery,
    usePutOrdenInstalacionMutation,

    useGetClienteFilterPaginationQuery,
    usePutClienteInstaladoMutation,


} = clienteClienteApi