import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./ModalProducts.module.css"


const ModalProducts = ({products}) => {
  /*Estados */
  //Para mostrar el documento o no
  const [showDocument,setShowDocument] = useState(false);

  const handleShow = () => {
    setShowDocument(true);
  }
  const handleClose = () => {
    setShowDocument(false);
  }
  return(
    <>
      {/*Boton para abrir el documento*/}
      <Button 
        variant='primary' 
        size='lg' 
        onClick={()=>handleShow()} 
        className={styles.btn} 
        disabled={products.length<=0}
      >
        Mostrar Productos
      </Button>
      <Modal 
        show={showDocument} 
        onHide={handleClose} 
        className={styles.modal}
      >
        {/*Encabezado del Modal que incluye un boton para cerrarlo*/}
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Productos</Modal.Title>
        </Modal.Header>
        {/*Cuerpo del Modal*/}
        <Modal.Body className={styles.modalBody}>
          {
            products.length>0
              ?(<ul>
                {products?.map((product)=>{
                  return(
                    <li key={product.name}>Producto:{product.name} Cantidad:{product.amount}</li>
                  )
                })}
              </ul>)
              :<div><h1>No hay Productos</h1></div>           
          }
        </Modal.Body>
      </Modal>
    </>
  )
};
export default ModalProducts;