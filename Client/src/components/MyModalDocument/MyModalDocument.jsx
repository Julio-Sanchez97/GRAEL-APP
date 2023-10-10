import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./MyModalDocument.module.css";
import { PDFViewer, pdf } from '@react-pdf/renderer';
import MyDocument from '../MyDocument/MyDocument';
import { createPdf } from '../../redux/documentFormSlice';


// Create Document Component
const MyModalDocument = () => {

  const dispatch = useDispatch();
  /*Estados */ 
  const [state, setState] = useState({
    showDocument: false,//Para mostrar el documento o no
    fullscreen: true,//Para que este en toda la pantalla
    buttonName: "Generar PDF",//nombre del boton del modal
    blobPdf: null,
  });

  //Estados Globales
  const { pdfGlobal } = useSelector((state) => state.documentForm)

  //constantes donde se almaceno la info del documento y el pdf en la local storage
  const document = localStorage.getItem("document")?JSON.parse(localStorage.getItem("document")):null;
  const pdfObject = localStorage.getItem("pdf")?JSON.parse(localStorage.getItem("pdf")):null;

  // Utiliza useEffect para actualizar el nombre del botón cuando cambia el estado global'pdf'
  useEffect(() => {
    if (pdfObject !== null && typeof pdfObject === "object") {
      setState((prevState)=> ({
        ...prevState,
        buttonName: "Visualizar PDF",
      }))
    } else {
      setState((prevState)=> ({
        ...prevState,
        buttonName: "Generar PDF",
      }))
    }
  }, [pdfGlobal]);
  
  //Genera el pdf en base 64
  const generatePdfBase64 = async () => {
    //Genero una promesa para obtener el blob del pdf generado
    const { blob, error } = await new Promise((resolve, reject) => {
      pdf(<MyDocument data={document}/>)
        .toBlob()
        .then((blob) => resolve({ blob }))
        .catch((error) => reject({ error }));
    });
    //Una vez tengo el blob lo convierto a base 64
    if (blob) {
      const reader = new FileReader();
      let base64String = "";
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        let base64EncodeArray = reader.result.split(",");
        base64String = base64EncodeArray[1];
        dispatch(createPdf(document.id, base64String));
      }
    }
    else{
      console.error(error);
    }
  };

  //Mostrar el modal con el pdf en pantalla
  const handleShow = (breakpoint) => {
    setState((prevState)=> ({
      ...prevState,
      fullscreen: breakpoint,
      showDocument: true,
    }))
  }
  //Cerrar el modal
  const handleClose = () => {
    setState((prevState)=> ({
      ...prevState,
      showDocument: false
    }))
  }
  return(
    <>
      {/*Boton para abrir el documento*/}
      <Button 
        variant='primary' 
        size='lg' 
        onClick={()=>{state.buttonName==="Generar PDF"? generatePdfBase64():handleShow(true)}} 
        className={styles.btn} 
        disabled={document===null} 
      >
        {state.buttonName}
      </Button>
      <Modal 
        show={state.showDocument} 
        onHide={handleClose} 
        fullscreen={state.fullscreen}
        className={styles.modal}
      >
        {/*Encabezado del Modal que incluye un boton para cerrarlo*/}
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Documento PDF</Modal.Title>
        </Modal.Header>
        {/*Cuerpo del Modal*/}
        <Modal.Body className={styles.modalBody}>
          {document ? (
            <PDFViewer width={"100%"} height={"100%"}>
              <MyDocument 
                data={document}
              />
            </PDFViewer>
          ) : (
            <div>
              <h1>Documento no encontrado</h1>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
};
export default MyModalDocument;