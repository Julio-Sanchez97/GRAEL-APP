import {useState} from 'react'
import Modal from "react-bootstrap/Modal"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from "./ModalDocumentsUser.module.css"

const ModalDocumentsUser = ({user}) => {
  const [showModal,setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
  }
  //Funcion de descarga de base64 a pdf
  const handleDownloadClick = (base64String, fileName) => {
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
    downloadLink.download = `Boleta Electronica ${fileName}`;

    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();

    // Liberar la URL del Blob cuando ya no se necesite
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <>
      <div className={styles.documents} onClick={()=>handleShow()}>
        Ver mas...
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        className={styles.modal}
      >
        <Modal.Header closeButton className={styles.modalheader}>
          <Modal.Title>{`Documents of user ${user.name} ${user.lastname}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Table>
            {/* Campos de la tabla */}
            <thead>
              <tr>
                <th className={styles.cell}>#</th>
                <th className={styles.cell}>File Name</th>
                <th className={styles.cell}>Date</th>
                <th className={styles.cell}>Download</th>
              </tr>
            </thead>
            {/* Filas con la info de la tabla */}
            <tbody>
              {
                user.Documents.map((document, index) => {
                  let fechaEmisionServer = document.updatedAt.split("T")[0].split("-");
                  let fechaEmision = fechaEmisionServer.reverse().join("/");
                  let fileName = `${user.Sede.code}-${document.serieRegister}`
                  return(
                    <tr key={document.id}>
                      <td className={styles.cell}>{index+1}</td>
                      <td className={styles.cell}>{fileName}</td>
                      <td className={styles.cell}>{fechaEmision}</td>
                      <td className={styles.cell}><Button variant='primary'><i className="bi bi-download" onClick={()=>{handleDownloadClick(document.Pdf.documentBase64, fileName)}}></i></Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalDocumentsUser