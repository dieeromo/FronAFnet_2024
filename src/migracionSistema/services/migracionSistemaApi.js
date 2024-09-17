import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const migracionSistemaApi = createApi({

  reducerPath: 'migracionSistemaApi',


  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.13.101/afnetnew/frontend/web/index.php?r=' }),
  endpoints: (builder) => ({
    getClienteSistemaOld: builder.query({
      query: () => 'cliente/getcliente', // Ruta relativa del endpoint
      method: 'GET',
    }),
  }),
})

export const {
  useGetClienteSistemaOldQuery
} = migracionSistemaApi