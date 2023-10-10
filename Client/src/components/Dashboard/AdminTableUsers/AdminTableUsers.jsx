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
import { enabledUser } from "../../../redux/dashboardAdminSlice";

const AdminTableUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.dashboardAdmin);

  const [data, setData] = useState(users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setData(users);
  }, [users]);

  const handleToggle = (id) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, enabled: !user.enabled } : user
    );

    setData(updatedData);

    dispatch(enabledUser(id,!(data.find((user) => user.id === id).enabled)));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const filteredData = data?.filter((user) =>
    (`${user?.name} ${user?.lastname}`).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Table Users
      </Typography>
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
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Sede</TableCell>
              <TableCell>Documentos</TableCell>
              <TableCell>Habilitar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user?.id} className={styles.fila}>
                <TableCell className={styles.celdaRegistro}>
                  {user?.name ?? ''} {user?.lastname ?? ''}
                </TableCell>
                <TableCell className={styles.celdaRegistro}>{user?.email}</TableCell>
                <TableCell className={styles.celdaRegistro}>{user?.Sede.name}</TableCell>
                <TableCell className={styles.celdaRegistro}>
                  {user?.Documents.length > 0 ? "Ver mas..." : "Vacío"}
                </TableCell>
                <TableCell className={styles.celdaRegistro}>
                  <Switch
                    checked={user?.enabled}
                    color="primary"
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={() => handleToggle(user.id)}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {user?.enabled ? 'Habilitado' : 'Deshabilitado'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginBottom: '8px' }}></div>
      <TablePagination
        className={styles.customPagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number(filteredData?.length ?? 0)}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminTableUsers;


