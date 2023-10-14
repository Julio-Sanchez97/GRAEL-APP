import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  sedes: null,
  clients: null,
  allProducts: null,
  allMeasurementUnits: null,
  allPaymentTypes: null,
  err: null,
  message:"",
  document: null,
  succesForm: false,
  pdfGlobal: null,
};

const URL_DEPLOY = "https://grael-app-production.up.railway.app"

export const getSedes = () => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const sedes = await axios.get(`${URL_DEPLOY}/user/sedes`,config);
    dispatch(getSedesSuccess(sedes.data));
  } catch (error) {
    console.log(error);
    dispatch(getSedesFailure(error.response.data));
  }
}

export const getClients = () => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const clients = await axios.get(`${URL_DEPLOY}/user/clients`,config);
    dispatch(getClientsSuccess(clients.data));
  } catch (error) {
    console.log(error);
    dispatch(getClientsFailure(error.response.data));
  }
}

export const getProducts = () => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const products= await axios.get(`${URL_DEPLOY}/user/products`,config);
    dispatch(getProductsSuccess(products.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductsFailure(error.response.data));
  }
}

export const getMeasurementUnits = () => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const measurementUnits = await axios.get(`${URL_DEPLOY}/user/measurementUnits`,config);
    dispatch(getMeasurementUnitsSuccess(measurementUnits.data));
  } catch (error) {
    console.log(error);
    dispatch(getMeasurementUnitsFailure(error.response.data));
  }
}

export const getPaymentTypes = () => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const paymentTypes= await axios.get(`${URL_DEPLOY}/user/paymentTypes`,config);
    dispatch(getPaymentTypesSuccess(paymentTypes.data));
  } catch (error) {
    console.log(error);
    dispatch(getPaymentTypesFailure(error.response.data));
  }
}

export const createDocument = (values) => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const document = await axios.post(`${URL_DEPLOY}/user/form`,values,config);
    dispatch(createDocumentSuccess(document.data));
  } catch (error) {
    console.log(error);
    dispatch(createDocumentFailure(error.response.data));
  }
}

export const createPdf = (DocumentId, pdfBase64) => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };
    const pdf = await axios.post(`${URL_DEPLOY}/user/pdf`,{DocumentId:DocumentId, pdfBase64:pdfBase64},config);
    dispatch(createPdfSuccess(pdf.data));
  } catch (error) {
    console.log(error);
    dispatch(createPdfFailure(error.response.data));
  }
}

const documentFormSlice = createSlice({
  name: 'documentForm',
  initialState,
  reducers: {
    // Actions
    getSedesSuccess: (state, action) => {
      state.sedes = action.payload;
    },
    getSedesFailure: (state, action) => {
      state.sedes = null;
      state.err = action.payload.error;
    },
    getClientsSuccess: (state, action) => {
      state.clients = action.payload;
    },
    getClientsFailure: (state, action) => {
      state.clients = null;
      state.err = action.payload.error;
    },
    getProductsSuccess: (state, action) => {
      state.allProducts = action.payload;
    },
    getProductsFailure: (state, action) => {
      state.allProducts = null;
      state.err = action.payload.error;
    },
    getMeasurementUnitsSuccess: (state, action) => {
      state.allMeasurementUnits = action.payload;
    },
    getMeasurementUnitsFailure: (state, action) => {
      state.allMeasurementUnits = null;
      state.err = action.payload.error;
    },
    getPaymentTypesSuccess: (state, action) => {
      state.allPaymentTypes = action.payload;
    },
    getPaymentTypesFailure: (state, action) => {
      state.allPaymentTypes = null;
      state.err = action.payload.error;
    },
    createDocumentSuccess: (state, action) => {
      state.document = action.payload;
      localStorage.setItem("document",JSON.stringify(action.payload));
      state.succesForm = true;
      localStorage.setItem("succesForm",true);
    },
    createDocumentFailure: (state, action) => {
      state.document = null;
      state.err = action.payload.error;
    },
    createPdfSuccess: (state, action) => {
      state.pdfGlobal = action.payload;
      localStorage.setItem("pdf",JSON.stringify(action.payload));
      state.document = {
        ...state.document,
        pdf: action.payload
      };
      localStorage.setItem("document",JSON.stringify(state.document));
    },
    createPdfFailure: (state, action) => {
      state.pdfGlobal = null;
      state.err = action.payload.error;
    },
    clearDocument: (state) => {
      state.document = null;
      state.pdfGlobal = null;
      state.succesForm = false;
      localStorage.setItem("document","");
      localStorage.setItem("pdf","");
      localStorage.setItem("succesForm",false);
    }
  },
});

export const { 
  getSedesSuccess, 
  getSedesFailure, 
  getClientsSuccess, 
  getClientsFailure, 
  getProductsSuccess, 
  getProductsFailure, 
  getMeasurementUnitsSuccess, 
  getMeasurementUnitsFailure, 
  getPaymentTypesSuccess, 
  getPaymentTypesFailure, 
  createDocumentSuccess, 
  createDocumentFailure, 
  createPdfSuccess,
  createPdfFailure,
  clearDocument 
} = documentFormSlice.actions;
export default documentFormSlice.reducer;