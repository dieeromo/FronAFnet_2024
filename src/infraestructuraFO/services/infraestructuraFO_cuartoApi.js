import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const infraestructuraFO_cuartoApi = createApi({
    reducerPath: 'infraestructuraFO_cuartoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({
        ///
        get_puertosTarjeta: builder.query({
            query: ({ access}) => {
                let url1 = `/infraestructura_fo/puerto_tarjeta_crud/`
               
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['get_puertosTarjeta']
        }),
        /////
     
        ////////

 
  

    })

})



export const {
useGet_puertosTarjetaQuery


} = infraestructuraFO_cuartoApi