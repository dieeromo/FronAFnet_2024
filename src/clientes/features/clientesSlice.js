import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clienteCiudades: null,
}


const clienteCiudadesSlice = createSlice({
    name: 'clienteCiudades',
    initialState,
    reducers: {

    },
})


export default clienteCiudadesSlice.reducer
