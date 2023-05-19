import { createSlice } from "@reduxjs/toolkit";

const loggedIn = localStorage.getItem('idToken')?true:false;
const initialState = {isloggedIn:loggedIn}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
      login(state) {
        state.isloggedIn = true;
      },
      logout(state) {
        state.isloggedIn = false;
      },
    },
})

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;