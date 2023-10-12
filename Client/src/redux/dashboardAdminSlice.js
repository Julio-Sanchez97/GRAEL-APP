import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  allUsers:null,
  users: null,
  admins: null,
  err: null,
  message:"",
};

export const getUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const users = await axios.get(`http://localhost:3002/admin/users`,config);
    dispatch(getUsersSuccess(users.data));
  } catch (error) {
    console.log(error);
    dispatch(getUsersFailure(error.response.data));
  }
};

export const getAdmins = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const admins = await axios.get(`http://localhost:3002/admin/admins`,config);
    dispatch(getAdminsSuccess(admins.data));
  } catch (error) {
    console.log(error);
    dispatch(getAdminsFailure(error.response.data));
  }
};

export const enabledUser = (id, enabled) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const userEnabled = await axios.put(`http://localhost:3002/admin/user/enabled`,{id,enabled},config);
    dispatch(enabledUserSuccess(userEnabled.data))
  } catch (error) {
    console.log(error);
    dispatch(enabledUserFailure(error.response.data))
  }
}


const dashboardAdminSlice = createSlice({
  name: 'dashboardAdmin',
  initialState,
  reducers: {
    // Actions
    getUsersSuccess: (state, action) => {
      state.allUsers = action.payload;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.allUsers = null;
      state.users = null;
      state.err = action.payload.error;
    },
    getAdminsSuccess: (state, action) => {
      state.admins = action.payload;
    },
    getAdminsFailure: (state, action) => {
      state.admins = null;
      state.err = action.payload.error
    },
    enabledUserSuccess: (state, action) => {
      state.message = action.payload.message;
    },
    enabledUserFailure: (state, action) => {
      state.err = action.payload.error;
    }
  },
});

export const { getUsersSuccess, getUsersFailure, getAdminsSuccess , getAdminsFailure, enabledUserSuccess, enabledUserFailure} = dashboardAdminSlice.actions;
export default dashboardAdminSlice.reducer;