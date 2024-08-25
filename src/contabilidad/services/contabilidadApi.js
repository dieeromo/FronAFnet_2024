import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const contabilidadApi = createApi({
    reducerPath: 'contabilidadApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getCajas: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/caja/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getCaja']
        }),
        ////////
        getProveedorEquipo: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/proveedor_equipo/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getProveedorEquipo']
        }),
        ////////
        getModoCompra: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/modo_compra/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getModoCompra']
        }),
        ////////
        getModoPago: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/modo_pago/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getModoPago']
        }),
        ////////
        getPresupuesto: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/presupuesto/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getPresupuesto']
        }),

        ////////
        postFacturaEquipo: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/contabilidad/factura_equipo/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['geFacturasEquipo', 'getFacturaEquipo_search']
        }),
        ////////
        getFacturasEquipo: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/factura_equipo/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['geFacturasEquipo']
        }),
        ///////
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
        ////////

        ////////
        postPagoFacturaEquipo: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/contabilidad/pago_factura_equipo/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['geFacturasEquipo', 'getFacturaEquipo_search']
        }),
        ////////
        getFacturaEquipo_search: builder.query({
            query: ({ access, page, search, page_size }) => {
                return {
                    url: `/contabilidad/factura_equipo_search/?page=${page}&search=${search}&page_size=${page_size}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getFacturaEquipo_search']

        }),

        ////
        putCerrarFacturaEquipo: builder.mutation({
            query: ({ access, facturaID, equiposIngresados }) => {
                return {
                    url: `/contabilidad/factura_equipo/${facturaID}/`,
                    method: 'PATCH',
                    headers: { Authorization: `JWT ${access}` },
                    body: { equiposIngresados},
                }
            },
            invalidatesTags: ['getFacturaEquipo_search']

        }),
        ///////





        ////////



    })

})



export const {
    useGetCajasQuery,
    useGetProveedorEquipoQuery,
    useGetModoCompraQuery,
    useGetModoPagoQuery,
    useGetPresupuestoQuery,
    usePostFacturaEquipoMutation,
    useGetFacturasEquipoQuery,

    usePostPagoFacturaEquipoMutation,
    useGetFacturasEquipoIDQuery,
    useGetFacturaEquipo_searchQuery,
    usePutCerrarFacturaEquipoMutation,

} = contabilidadApi