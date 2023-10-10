import styles from "./Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/sessionUserSlice";
import { getSedes, getClients, getProducts, getMeasurementUnits, getPaymentTypes, createDocument, clearDocument } from "../../redux/documentFormSlice";
import ModalProducts from "../ModalProducts/ModalProducts";
import MyModalDocument from "../MyModalDocument/MyModalDocument";
import DownloadButton from "../DownloadButton/DownloadButton";

const FormComponent = () => {

  const dispatch = useDispatch();
  //Estados globales
  const { sedes, clients, allProducts, allMeasurementUnits, allPaymentTypes, pdfGlobal } = useSelector((state) => state.documentForm);
  //Estados locales
  const [fechaActual, setFechaActual] = useState('');
  const [horaActual, setHoraActual] = useState('');
  const [enviadoForm, setEnviadoForm] = useState();
  const [buttonNuevoDisabled, setButtonNuevoDisabled] = useState(true);
  //variable local
  const pdf = localStorage.getItem("pdf")?JSON.parse(localStorage.getItem("pdf")):null;

  //Cuando se monte el componente me traera la informacion necesario de las opciones del formulario que hay y la fecha actual
  useEffect(()=>{
    try {
      dispatch(getUserById(localStorage.getItem('userId')));
      dispatch(getSedes());
      dispatch(getClients());
      dispatch(getProducts());
      dispatch(getMeasurementUnits());
      dispatch(getPaymentTypes());

      const obtenerFechaHoraActual = () => {
        const fechaActual = new Date();
        
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Lima' // Zona horaria de Perú
        };
        
        const fecha = fechaActual.toLocaleDateString('es-PE', options).split(", ")[0].split("/").reverse().join("-");
        const hora = fechaActual.toLocaleTimeString('es-PE', options).split(", ")[1];
  
        setFechaActual(fecha);
        setHoraActual(hora);
      };
  
      obtenerFechaHoraActual();
    } catch (error) {
      console.log(error);
    }
  },[]);
  //Verificara si hay un pdf para habilitar o deshanilitar el boton
  useEffect(()=>{
    pdf !== null && typeof pdf === "object"?setButtonNuevoDisabled(false):setButtonNuevoDisabled(true)
  },[pdfGlobal])

  return (
    <div className={styles.componentContainer}>
      <Formik
        initialValues={{
          precio:0,
          cantidadMedida:0,
          retornoCargo:false, 
          products:[],
          productName:"",
          productAmount:"",      
          sedeCode:"",
          ClientId:"",
          TipoPagoId:"",
          UnidadMedidaId:""
        }}
        /* Validaciones */
        validate={(values)=>{
          let errores = {};
          //Codigo de sede
          if (values.sedeCode === "") {
            errores.sedeCode = "Seleccione una sede"
          }
          //Cliente
          if (values.ClientId === "") {
            errores.ClientId = "Seleccione un cliente"
          }
          //Productos
          if (values.products.length===0) {
            errores.products = "No hay productos"
          }
          //Precio total
          if (Number(values.precio) < 0) {
            errores.precio = "Número no válido"
          }
          //Tipo de Pago
          if (values.TipoPagoId === "") {
            errores.TipoPagoId = "Seleccione un tipo de pago"
          }
          //Unidad de medida de la carga
          if (values.UnidadMedidaId === "") {
            errores.UnidadMedidaId = "Seleccione una unidad de medida"
          }
          //Cantidad total de la carga 
          if (Number(values.cantidadMedida) < 0) {
            errores.cantidadMedida = "Número no válido"
          }
          //Tipo de pago
          if (values.TipoPagoId==="") {
            errores.tipoPago = "Seleccione un tipo de pago"
          }

          return errores;
        }}
        onSubmit={(values, {resetForm})=>{
          dispatch(createDocument({...values, UserId: localStorage.getItem('userId')}));
          resetForm();
          console.log("formulario enviado");
          setEnviadoForm(true);
          //tiempo para que el mensaje de enviadoForm de forma correcta desaparezca
          setTimeout(()=>{
            setEnviadoForm(false);
          },5000);
        }}
      >
        {({values, errors, setFieldValue, handleSubmit}) => (
          <Form className={`container ${styles.formContainer}`} onSubmit={handleSubmit} >
            {/* Sede */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
                <div className="col">
                  <label htmlFor="sedeCode" className={`form-label ${styles.label}`}>
                    SEDE
                  </label>
                </div>
                <div className="col">
                  <Field
                    name="sedeCode"
                    id="sedeCode"
                    as="select"  
                    className={`form-select ${styles.formControl}`}
                  >
                    <option value="">Seleccionar...</option>
                    {sedes?.map((sede)=>{
                      return(
                        <option value={sede.code} key={sede.id}>{sede.name}</option>
                      )
                    })}
                  </Field>
                  <ErrorMessage name="sedeCode" component={() => (<div className={styles.error}>{errors.sedeCode}</div>)} />
                </div>
            </div>

            {/* Fecha y Hora */}
            <div className={`row mb-4 ${styles.row}`}>
              <div className={`col`}>
                {/* Fecha */}
                <div className="col">
                  <label htmlFor="fecha" className={`form-label ${styles.label}`}>
                    FECHA
                  </label>
                </div>
                <div className="col">
                  <Field 
                    type="date" 
                    name="fecha" 
                    className={`form-control ${styles.formControl}`} 
                    value={fechaActual}
                    disabled 
                  />
                </div>
              </div>
              <div className={`col`}>
                {/* Hora */}
                <div className="col">
                  <label htmlFor="hora" className={`form-label ${styles.label}`}>
                    HORA
                  </label>
                </div>
                <div className="col">
                  <Field 
                    type="time" 
                    name="hora" 
                    className={`form-control ${styles.formControl}`} 
                    value={horaActual}
                    disabled 
                  />
                </div>
              </div>
            </div>

            {/* Cliente */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
              <div className="col">
                <label htmlFor="ClientId" className={`form-label ${styles.label}`}>
                  CLIENTE
                </label>
              </div>
              <div className="col">
                <Field
                  name="ClientId" 
                  id="ClientId" 
                  as="select"
                  className={`form-select ${styles.formControl}`} 
                >
                  <option value="">Seleccionar...</option>
                  {clients?.map((client)=>{
                    return(
                      <option value={client.id} key={client.id}>{client.name}</option>
                    )
                  })}
                </Field>
                <ErrorMessage name="ClientId" component={() => (<div className={styles.error}>{errors.ClientId}</div>)} />
              </div>
            </div>

            {/* Productos */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
              <div className="col">
                <label htmlFor="allProducts" className={`form-label ${styles.label}`}>
                  PRODUCTOS
                </label>
              </div>
              <div className={`col ${styles.grupoH}`}>
                {/* Input select del producto */}
                <div className="col">
                  <Field
                    name="productName"
                    as="select" 
                    className={`form-select ${styles.formControl}`} 
                  >
                    <option value="">Seleccionar...</option>
                    {allProducts?.map((product)=>{
                      return(
                        <option value={product.name} key={product.id}>{product.name}</option>
                      )
                    })}
                  </Field>
                </div>
                {/* Input cantidad producto */}
                <div className="col">
                  <Field 
                    type="number" 
                    name="productAmount"
                    className={`form-control ${styles.formControl}`} 
                    placeholder="Ingrese cantidad..."
                  />
                </div>
                {/* Boton agregar producto */}
                <div className="col-2">
                  <button 
                    className={`btn btn-primary btn-lg`} 
                    type="button" 
                    onClick={()=>{
                      setFieldValue('products', [...values.products, {name:values.productName, amount: values.productAmount}]);
                      setFieldValue('precio',values.precio + ((allProducts.find(producto=>producto.name===values.productName)).price * values.productAmount));
                      setFieldValue('cantidadMedida',values.cantidadMedida + ((allProducts.find(producto=>producto.name===values.productName)).weight * values.productAmount));
                      setFieldValue('productName', "");
                      setFieldValue('productAmount', "");
                    }}
                    disabled={values.productName==="" || (values.productAmount===""||values.productAmount<=0)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
              <div className="col">
                {values.products
                  ?<ModalProducts
                    products={values.products}
                  />
                  :errors.products?<ErrorMessage name="products" component={() => (<div className={styles.error}>{errors.products}</div>)} />:null
                }
              </div>
            </div>

            {/* Precio */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
              <div className="col">
                <label htmlFor="precio" className={`form-label ${styles.label}`}>
                  PRECIO TOTAL
                </label>
              </div>
              <div className="col">
                <Field
                  type="number" 
                  name="precio"  
                  className={`form-control ${styles.formControl}`} 
                  placeholder="Ingresa cantidad..."
                  disabled
                  />
                  <ErrorMessage name="precio" component={() => (<div className={styles.error}>{errors.precio}</div>)} />
              </div>
            </div>
            
            {/* Medida */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
              <div className="col">
                <label className={`form-label ${styles.label}`}>
                  MEDIDA
                </label>
              </div>
              {/* Inputs de la medida */}
              <div className={`col ${styles.grupoH}`}>
                {/* Input con la cantidad de la medida total de la carga */} 
                <div className="col">
                  <Field
                    type="number" 
                    name="cantidadMedida"
                    value= {
                      ((allMeasurementUnits?.find(unit => unit.id === Number(values.UnidadMedidaId)))?.simbolo === "kg")
                      ?values.cantidadMedida
                      :0
                    }  
                    className={`form-control ${styles.formControl}`} 
                    placeholder="Ingresa cantidad..."
                    disabled
                    />
                    <ErrorMessage name="cantidadMedida" component={() => (<div className={styles.error}>{errors.cantidadMedida}</div>)} />
                </div>
                {/* Input select con la unidad de medida de la carga */}
                <div className="col">
                  <Field
                    name="UnidadMedidaId"
                    as="select" 
                    className={`form-select ${styles.formControl}`} 
                  >
                    <option value="">Seleccionar unidad...</option>
                    {allMeasurementUnits?.map((unit)=>{
                      return(
                        <option value={unit.id} key={unit.id}>{unit.simbolo}</option>
                      )
                    })}
                  </Field>
                  <ErrorMessage name="UnidadMedidaId" component={() => (<div className={styles.error}>{errors.UnidadMedidaId}</div>)} />
                </div>
              </div>
            </div>
            
            {/* Tipo de Pago */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
              <div className="col">
                <div className="col">
                  <label htmlFor="TipoPagoId" className={`form-label ${styles.label}`}>
                    TIPO PAGO
                  </label>
                </div>
                <div className="col">
                  <Field
                    name="TipoPagoId"
                    id="TipoPagoId"
                    as="select" 
                    className={`form-select ${styles.formControl}`} 
                  >
                    <option value="">Seleccionar...</option>
                    {allPaymentTypes?.map((type)=>{
                      return(
                        <option value={type.id} key={type.id}>{type.name}</option>
                      )
                    })}
                  </Field>
                  <ErrorMessage name="TipoPagoId" component={() => (<div className={styles.error}>{errors.TipoPagoId}</div>)} />
                </div>
              </div>
            </div>

            {/* Retorno de Cargo */}
            <div className={`row mb-4 ${styles.row} ${styles.grupoV}`}>
              <div className={`col ${styles.grupoH} ${styles.retornoCargo}`}>
                  <label htmlFor="retornoCargo" className={`form-check-label ${styles.label}`}>
                    RETORNO DE CARGO
                  </label>
                  <div>
                    <Field 
                    type="checkbox" 
                    name="retornoCargo" 
                    id="retornoCargo"
                    className={`form-input ${styles.checkbox}`} 
                    />
                  </div>
              </div> 
            </div>

            {/* Enviar el formulario */}
            <button className={`btn btn-primary btn-lg ${styles.button}`} type="submit">Guardar</button>
            {enviadoForm?<p className={styles.successForm}>El fomulario se envio de manera correcta!</p>:null}
          </Form>
        )}  
      </Formik>
      {/* Contenedor de botones */}
      <div className={styles.buttonsContainer}>
        <button className={`btn btn-primary btn-lg ${styles.button}`} type="button" onClick={()=>dispatch(clearDocument())} disabled={buttonNuevoDisabled}>Nuevo</button>
        <MyModalDocument />
        <DownloadButton />
      </div>
    </div>
  );
};

export default FormComponent;



