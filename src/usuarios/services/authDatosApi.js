// import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import {RUTA_SERVIDOR} from '../../ApiRoutes'

// export const authDatosApi = createApi({

//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl:RUTA_SERVIDOR
//     }),
//     endpoints:(builder) =>({
//         getUser: builder.query({
//             query : (access) =>{
//                 return{
//                     url: `/auth/users/me/`,
//                     method:'GET',
//                     headers: {Authorization : `JWT ${access}`},
//                 }
//             }
//         })
//     })
// })


// export  const {useGetUserQuery}=authDatosApi


import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RUTA_SERVIDOR} from '../../ApiRoutes'

export const authDatosApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:RUTA_SERVIDOR
    }),
    endpoints:(builder) =>({
        getUser: builder.query({
            query : (access) =>{
                return{
                    url: `/auth/users/me/`,
                    method:'GET',
                    headers: {Authorization : `JWT ${access}`},
                }
            }
        })
    })
})


export  const {useGetUserQuery}=authDatosApi