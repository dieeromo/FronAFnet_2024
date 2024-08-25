import {createSlice,PayloadAction} from '@reduxjs/toolkit'

//import {RootState} from '../app/store'

const initialState = {
    refresh: null,
    access: null,
    time_token : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    refresh: action.payload.refresh,
                    access: action.payload.access,
                    time_token: Date.now()
                })
            );
            state.refresh = action.payload.refresh;
            state.access = action.payload.access;
            state.time_token = Date.now()

        },
        logout : (state) => { 
            localStorage.clear();
            state.access=null; 
            state.refresh=null;
            state.time_token = null;
        },

    }
});


const selectAuth = (state) => state.auth;
const { setUser, logout } = authSlice.actions;

export { selectAuth, setUser, logout};
export default authSlice.reducer



