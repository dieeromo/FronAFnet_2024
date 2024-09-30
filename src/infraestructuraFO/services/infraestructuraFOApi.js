import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const infraestructuraFOApi = createApi({
    reducerPath: 'infraestructuraFOApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({
        ///

        /////
        getMufas_filter: builder.query({
            query: ({ access, page, numero, barrio, comunidad, ciudad }) => {
                let url1 = `/infraestructura_fo/mufa_list_filter/?`
                if (page) url1 += `page=${page}&`;
                if (numero) url1 += `numero=${numero}&`;
                if (barrio) url1 += `barrio=${barrio}&`
                if (comunidad) url1 += `comunidad=${comunidad}&`
                if (ciudad) url1 += `ciudad=${ciudad}&`


                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getMufas_filter']
        }),
        ////////

        ////////
        postMufa: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/infraestructura_fo/mufa_crud/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getMufas_filter']

        }),
        ///////
        /////
        get_crud_mufas: builder.query({
            query: ({ access, id_mufa }) => {
                let url1 = `/infraestructura_fo/mufa_crud/`
                if (id_mufa) url1 += `${id_mufa}`;
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['get_crud_mufas']
        }),

        ////////
        postNap: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/infraestructura_fo/cajanap_crud/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['get_crud_mufas']

        }),
        ///////
        /////
        get_cajaNap_crud: builder.query({
            query: ({ access, id_mufa }) => {
                let url1 = `/infraestructura_fo/cajanap_crud/`
           
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['get_cacaNap_crud']
        }),

        ////////


    })

})



export const {
    useGet_crud_mufasQuery,
    useGetMufas_filterQuery,
    usePostMufaMutation,
    usePostNapMutation,
    useGet_cajaNap_crudQuery


} = infraestructuraFOApi