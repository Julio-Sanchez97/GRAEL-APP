import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from "../../images/logo_3.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    width: "100%",
    padding: 10,
    alignItems: "center",
    backgroundColor: 'white',
    fontFamily: "Helvetica",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "30%",
    marginBottom: 10,
    padding: 10,
  },
  containerImgInfoEmpresa:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "40%",
  },
  sectionBoletaCLiente: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "60%",
  },
  imgLogo: {
    width: 200,
    height: 80,
  },
  sectionInfo: {
    display: "flex",
    flexDirection: "column",
  },
  cuadroBoleta:{
    display:"flex",
    flexDirection: "column",
    width: 300,
    height: 100,
    backgroundColor: "#F1EFEF",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    justifyContent: "center",
    marginBottom: 5,
    border: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  sectionInfoCliente: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    minHeight: 80,
    padding: 4,
    border: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  containerTabla: {
    width: "100%",
    padding:10,
  },
  tabla: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingVertical: 5,
    textAlign: "center",
    border: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  camposTabla: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  registroTabla: {
    display: "flex",
    flexDirection: "row",
    borderBottom: 1,
    borderTop: 1,
    borderColor: "gray",
    backgroundColor: "#F1EFEF",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  precioTotalItems:{
    display: "flex",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textCampo: {
    color: "black",
    fontSize: 11,
    marginVertical: 4,
    fontFamily: "Helvetica-Bold",
  },
  textContent: {
    color: "black",
    fontSize: 11,
    marginVertical: 4,
  },
  title: {
    color: "black",
    fontSize: 15,
    marginVertical: 4,
    fontFamily: "Helvetica-Bold",
  },
});

// Create Document Component
const MyDocument = ({data}) => {
  let precioTotal = 0;
  let fechaEmisionServer = data.createdAt.split("T")[0].split("-");
  let fechaEmision = fechaEmisionServer.reverse().join("-")

  if (data.Products && data.Products.length > 0) {
    precioTotal = data.Products.reduce((total, product) => {
      return total + product.ProductDocument.amountProduct * product.price;
    }, 0);
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Container información empresa y cliente */}
        <View style={styles.container}>
          {/* Información empresa */}
          <View style={styles.containerImgInfoEmpresa}>
            <Image src={logo} style={styles.imgLogo}/>
            <View style={[styles.sectionInfo, {padding: 4}]}>
              <Text style={styles.title}>GRAEL SAC</Text>
              <Text style={styles.textContent}>{`Dirección: ${data.sede.address}`}</Text>
              <Text style={styles.textContent}>{`Correo: ${data.sede.email}`}</Text>
              <Text style={styles.textContent}>{`Teléfono: ${data.sede.phoneNumber}`}</Text>
            </View>
          </View>
          {/* Información boleta y cliente */}
          <View style={styles.sectionBoletaCLiente}>
            {/* Info cuadro boleta */}
            <View style={styles.cuadroBoleta}>
              <Text>{`RUC N° ${data.sede.ruc}`}</Text>
              <Text>BOLETA ELECTRÓNICA</Text>
              <Text>{`${data.sede.code}-${data.serieRegister}`}</Text>
            </View>
            {/* Info Cliente */}
            <View style={styles.sectionInfoCliente}>
              <View style={[styles.sectionInfo, {width: "30%"}]}>
                <Text style={styles.textCampo}>Fecha Emisión</Text>
                <Text style={styles.textCampo}>Destinatario</Text>
                <Text style={styles.textCampo}>DNI</Text>
                <Text style={styles.textCampo}>Dirección</Text>
              </View>
              <View style={[styles.sectionInfo, {width: "70%"}]} wrap>
                <Text style={styles.textContent} wrap>{`: ${fechaEmision}`}</Text>
                <Text style={styles.textContent} wrap>{`: ${data.client.name}`}</Text>
                <Text style={styles.textContent} wrap>{`: ${data.client.dni}`}</Text>
                <Text style={styles.textContent} wrap>{`: ${data.client.address}`}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Container tabla de productos */}
        <View style={styles.containerTabla}>
          <View style={styles.tabla}>
            {/* Campos de la tabla de items */}
            <View style={styles.camposTabla}>
              <Text style={[styles.textCampo, {width:"10%"}]}>Cantidad</Text>
              <Text style={[styles.textCampo, {width:"10%"}]}>Unidad</Text>
              <Text style={[styles.textCampo, {width:"20%"}]}>Código</Text>
              <Text style={[styles.textCampo, {width:"40%"}]}>Descripción</Text>
              <Text style={[styles.textCampo, {width:"10%"}]}>P.U.</Text>
              <Text style={[styles.textCampo, {width:"10%"}]}>Total</Text>
            </View>
            { /* Registros de los items */
              data.Products?.length>0
              ?data.Products.map((product) => {
                return(
                  <View style={styles.registroTabla} key={product.id}>
                    <Text style={[styles.textContent, {width:"10%"}]}>{product.ProductDocument.amountProduct}</Text>
                    <Text style={[styles.textContent, {width:"10%"}]}>UNI.</Text>
                    <Text style={[styles.textContent, {width:"20%"}]}>{product.code}</Text>
                    <Text style={[styles.textContent, {width:"40%"}]}>{product.name}</Text>
                    <Text style={[styles.textContent, {width:"10%"}]}>{(product.price).toFixed(2)}</Text>
                    <Text style={[styles.textContent, {width:"10%"}]}>{(product.ProductDocument.amountProduct * product.price).toFixed(2)}</Text>
                  </View>
                )
              })
              :null
            }
          <View style={styles.precioTotalItems}>
            {/* Precio total items */}
            <View style={{display:"flex", flexDirection:"row"}}>
              <View>
                <Text style={styles.textContent}>{`SUB TOTAL    `}</Text>
                <Text style={styles.textContent}>{`I.G.V    `}</Text>
                <Text style={styles.textCampo}>{`TOTAL    `}</Text>
              </View>
              <View>
                <Text style={styles.textContent}>{`S/   ${(precioTotal * (82/100)).toFixed(2)}`}</Text>
                  <Text style={styles.textContent}>{`S/   ${(precioTotal * (18/100)).toFixed(2)}`}</Text>
                  <Text style={styles.textCampo}>{`S/   ${(precioTotal).toFixed(2)}`}</Text>
              </View>
            </View>
          </View>
          </View>
        </View>
      </Page>
    </Document>
)};

export default MyDocument;