import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const facturaServiciosApi = createApi({
    reducerPath: 'facturaServiciosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getFacturaServicio: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/factura_servicio/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                };
            },
            providesTags: ['getFacturaServicio']
        }),
        ////////

        getFacturaServicio_filter: builder.query({
            query: ({ access, page, servicio, proveedor, fecha_emision_after, fecha_emision_before }) => {
                let url1 = `/contabilidad/factura_servicio_filter/?`;
                if (page) url1 += `page=${page}&`;
                if (servicio) url1 += `servicio=${servicio}&`;
                if (proveedor) url1 += `proveedor=${proveedor}&`;
                if (fecha_emision_after) url1 += `fecha_emision_after=${fecha_emision_after}&`;
                if (fecha_emision_before) url1 += `fecha_emision_before=${fecha_emision_before}&`;
        
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                };
            },
            providesTags: ['getFacturaServicio_filter']
        }),
        ////////

        getFacturasDetallesID: builder.query({
            query: ({ access, facturaID }) => {
                return {
                    url: `/contabilidad/factura_servicio/${facturaID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['geFacturasDetallesID']
        }),
        ////////

        getPagoFacturaServicio: builder.query({
            query: ({ access }) => {
                return {
                    url: `/contabilidad/pago_factura_servicio/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                };
            },
            providesTags: ['getPagoFacturaServicio']
        }),
        ////////

        getPagoFacturaServicio_filter: builder.query({
            query: ({ access, page, facturaServicios, caja, fecha_pago_after, fecha_pago_before }) => {
                let url1 = `/contabilidad/pago_factura_servicio_filter/?`;
                if (page) url1 += `page=${page}&`;
                if (facturaServicios) url1 += `facturaServicios=${facturaServicios}&`;
                if (caja) url1 += `caja=${caja}&`;
                if (fecha_pago_after) url1 += `fecha_pago_after=${fecha_pago_after}&`;
                if (fecha_pago_before) url1 += `fecha_pago_before=${fecha_pago_before}&`;
        
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                };
            },
            providesTags: ['getPagoFacturaServicio_filter']
        }),
        ////////

    })

})



export const { 
    useGetFacturaServicioQuery ,
    useGetFacturaServicio_filterQuery,
    useGetFacturasDetallesIDQuery,
    useGetPagoFacturaServicioQuery,
    useGetPagoFacturaServicio_filterQuery


} = facturaServiciosApi;
