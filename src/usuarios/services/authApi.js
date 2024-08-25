import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RUTA_SERVIDOR} from '../../ApiRoutes'



export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:RUTA_SERVIDOR
    }),
    endpoints:(builder) =>({
        loginUser: builder.mutation({
            query:({email,password}) =>{
                return{
                    url: '/auth/jwt/create/',
                    method: 'POST',
                    body:{email,password}
                }
            }
        }),

     

    })
})

export  const {useLoginUserMutation }=authApi