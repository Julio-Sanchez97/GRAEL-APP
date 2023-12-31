import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  token: null,
  infoToken: null,
  user: null,
  err: null,
  message:"",
};

const URL_DEPLOY = "https://grael-app-dev-gnxq.1.us-1.fl0.io"
//const URL_DEPLOY = "http://localhost:3002"

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL_DEPLOY}/public/login`, userData);
    dispatch(loginSuccess(response.data)); // Despacha la acción cuando el inicio de sesión tenga éxito
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data)); // Despacha la acción en caso de error
    setTimeout(()=>{
      dispatch(resetError());
    },3000);
  }
};

export const getUserById = (id) => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const user = await axios.get(`${URL_DEPLOY}/user/${id}`,config);
    dispatch(getUserSuccess(user.data));
  } catch (error) {
    console.log(error);
    dispatch(getUserFailure(error.response.data));
  }
}

const sessionUserSlice = createSlice({
  name: 'sessionUser',
  initialState,
  reducers: {
    // Actions
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.infoToken = action.payload.infoToken;
      state.message = action.payload.message;
      state.err = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.infoToken.id);
      localStorage.setItem('userRole', action.payload.infoToken.role);
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.err = action.payload.error;
    },
    resetError: (state) => {
      state.err = null
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.infoToken = null;
      state.message = "";
      state.err = null;
      localStorage.setItem('token', null);
      localStorage.setItem('userId', null);
      localStorage.setItem('userRole', null);
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
    },
    getUserFailure: (state, action) => {
      state.user = null;
      state.err = action.payload.error;
    }
  },
});

export const { loginSuccess, loginFailure, logout, resetError, getUserSuccess, getUserFailure } = sessionUserSlice.actions;
export default sessionUserSlice.reducer;

