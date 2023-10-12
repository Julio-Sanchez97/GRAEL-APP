import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AdminTableUsers.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Typography,
  Grid,
  Switch,
} from "@mui/material";
import '@fontsource/roboto/400.css';
import { enabledUser, getUsers } from "../../../redux/dashboardAdminSlice";

const AdminTableUsers = () => {
  const dispatch = useDispatch();
  /* Estados Globales */
  const { allUsers } = useSelector((state) => state.dashboardAdmin);
  /* Estados Locales */
  const [newToogle, setNewToogle] = useState(true)
  //Estados del paginado
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //Estado del search
  const [searchText, setSearchText] = useState('');
  
  //Cada vez que se haga un toogle actualizar el estado global users
  useEffect(()=>{
    dispatch(getUsers());
  },[newToogle])

  //Funcion para cambiar disparar la accion de cambiar el estado de habilitacion de un usuario
  const handleToggle = (id, enabled) => {
    dispatch(enabledUser(id,!enabled));
    setNewToogle(!newToogle);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  //filtra los usuarios por el nombre pasado en el search
  let filteredUsers = allUsers?.filter((user) =>
    (`${user?.name} ${user?.lastname}`).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '16px' }} />
      <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <div style={{ marginBottom: '16px' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={styles.headTable}>
            {/* Campos de la tabla */}
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Sede</TableCell>
              <TableCell>Documentos</TableCell>
              <TableCell>Habilitar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Cuerpo de la tabla con la informacion de los usuarios */
            filteredUsers?
              filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id} className={styles.fila}>
                  <TableCell className={styles.celdaRegistro}>
                    {user.name ?? ''} {user.lastname ?? ''}
                  </TableCell>
                  <TableCell className={styles.celdaRegistro}>{user.email}</TableCell>
                  <TableCell className={styles.celdaRegistro}>{user.Sede.name}</TableCell>
                  <TableCell className={styles.celdaRegistro}>
                    {/* Si no hay documentos se visualizara vacio, sino podras desplegar un modal para verlos */
                    user?.Documents.length > 0 ? "Ver mas..." : "Vacío"
                    }
                  </TableCell>
                  <TableCell className={styles.celdaRegistro}>
                    {/* Switch para cambiar el estado de habilitacion de los usuarios */}
                    <Switch
                      checked={user.enabled}
                      color="primary"
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={() => handleToggle(user.id, user.enabled)}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {user.enabled ? 'Habilitado' : 'Deshabilitado'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
              :null
          }
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginBottom: '8px' }}></div>
      <TablePagination
        className={styles.customPagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number(filteredUsers?.length ?? 0)}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminTableUsers;


