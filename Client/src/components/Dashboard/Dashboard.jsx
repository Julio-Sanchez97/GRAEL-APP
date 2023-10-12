import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import AdminTableUsers from './AdminTableUsers/AdminTableUsers';
import { getUsers, getAdmins } from '../../redux/dashboardAdminSlice';

const Dashboard = () => {
	const dispatch = useDispatch();
	const { admins } = useSelector((state)=> state.dashboardAdmin);

	useEffect(()=>{
		//trae todos los usuarios habilitadas y deshabilitadas
		dispatch(getUsers());
		dispatch(getAdmins());
	},[])

  return (
    <section className={styles.dashboard}>
			<div className={styles.column1}>
				<Card bg='dark' text='light' className={styles.box}>
					<h2 className={styles.title}>DASHBOARD</h2>
				</Card>
				
				<Card className={styles.boxAdmins}>
					<h3>TEAM MATES</h3>
					{admins?.map(admin=>{
						return(
							<li key={admin.id}>{`${admin.name} ${admin.lastname}`}</li>
						)
					})}
				</Card>
			</div>
			
			<div className={styles.column2}>
				<Card bg='dark' text='light' className={styles.box}>
					<Card.Body className={styles.tableTitle}><i className="bi bi-people-fill"/> Users</Card.Body>
				</Card>

				<Card className={styles.panel}>
					<AdminTableUsers/>
				</Card>
			</div>
    </section>
  );
};

export default Dashboard;
