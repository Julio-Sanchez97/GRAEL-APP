import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./DownloadButton.module.css";

const DownloadButton = () => {
  const { pdfGlobal } = useSelector((state) => state.documentForm);
  const [buttonNuevoDisabled, setButtonNuevoDisabled] = useState(true);
  const pdf = localStorage.getItem("pdf")?JSON.parse(localStorage.getItem("pdf")):null;
  const documentObject = localStorage.getItem("document")?JSON.parse(localStorage.getItem("document")):null;

  useEffect(()=>{
    pdf !== null && typeof pdf === "object"?setButtonNuevoDisabled(false):setButtonNuevoDisabled(true)
  },[pdfGlobal])

  //Funcion de descarga de base64 a pdf
  const handleDownloadClick = (base64String) => {
    // Decodificar la cadena Base64 en datos binarios
    const binaryData = atob(base64String);

    // Convertir los datos binarios en un array buffer
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Crear un Blob a partir del array buffer
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

    // Crear una URL para el Blob
    const blobUrl = URL.createObjectURL(blob);

    // Crear un enlace <a> para descargar el archivo
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = `Boleta Electronica ${documentObject.sede.code}-${documentObject.serieRegister}`;

    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();

    // Liberar la URL del Blob cuando ya no se necesite
    URL.revokeObjectURL(blobUrl);
  };


  return(
    <>
      <Button 
        variant='primary' 
        size='lg' 
        onClick={()=>handleDownloadClick(pdf.documentBase64)} 
        className={styles.btn} 
        disabled={buttonNuevoDisabled} 
      >
        Descargar
      </Button>
    </>
  )
}

export default DownloadButton;