import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'



export const mikrotikAPI = createApi({

    reducerPath: 'authApi',
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



    })
})

export const {
    useGetRoutersMKQuery,
    usePostRouterMKMutation,

} = mikrotikAPI