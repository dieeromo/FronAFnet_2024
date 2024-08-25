import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const clienteCiudadesApi = createApi({
    reducerPath: 'clienteCiudadesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getCiudades: builder.query({
            query: (access) => {

                return {
                    url: `/cliente/ciudad/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getCiudades']

        }),
        ////////
        ////////
        getBarrios: builder.query({
            query: (access) => {

                return {
                    url: `/cliente/barrio/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////////
        ////////
        getComunidades: builder.query({
            query: (access) => {

                return {
                    url: `/cliente/comunidad/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['']

        }),
        ////////
        ////////
        getBarrio_ID: builder.query({
            query: ({ access, barrioID }) => {

                return {
                    url: `/cliente/barrio/${barrioID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getBarrio_ID']

        }),
        ////////

        postBarrios: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/barrio/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getBarrios_ciudad']
        }),
        ////////


        getBarrios_ciudad: builder.query({
            query: ({ access, ciudad_id }) => {
                return {
                    url: `/cliente/barrio_ciudad/?ciudad_id=${ciudad_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

            providesTags: ['getBarrios_ciudad']
        }),

        ////////
        getComundad_ciudad: builder.query({
            query: ({ access, ciudad_id }) => {
                return {
                    url: `/cliente/comunidad_ciudad/?ciudad_id=${ciudad_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

            providesTags: ['getComunidad_ciudad']
        }),

        ////////
        postComunidades: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/cliente/comunidad/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getComunidad_ciudad']
        }),

        ////////
        getComundad_ID: builder.query({
            query: ({ access, comunidadID }) => {
                return {
                    url: `/cliente/comunidad/${comunidadID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

            providesTags: ['getComunidad_ID']
        }),

        ////////

        ////////

        ////
        putBarrios: builder.mutation({
            query: ({ access, rest, barrioID }) => {
                return {
                    url: `/cliente/barrio/${barrioID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getBarrios_ciudad', 'getBarrio_ID']
        }),
        ////////

        ////
        putComunidades: builder.mutation({
            query: ({ access, rest, comunidadID }) => {
                return {
                    url: `/cliente/comunidad/${comunidadID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getComunidad_ID', 'getComunidad_ciudad']
        }),
        ////////



    })

})



export const {
    useGetCiudadesQuery,

    usePostBarriosMutation,
    useGetBarrios_ciudadQuery,
    useGetBarriosQuery,
    useGetComunidadesQuery,
    useGetBarrio_IDQuery,
    usePostComunidadesMutation,
    useGetComundad_ciudadQuery,
    useGetComundad_IDQuery,
    usePutBarriosMutation,
    usePutComunidadesMutation,
} = clienteCiudadesApi