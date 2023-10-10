import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css"
import style from "./Dashboard.module.css";
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
    <section className={style.dashboard}>
			<div className={style.column1}>
				<h1 className={style.title}>GRAEL</h1>
				<Card className={style.box}>
					<Button variant={'outline-warning'} className={style.columnComponent} onClick={() => console.log("hola")}><i className="bi bi-people-fill"/>Users</Button>
				</Card>
				<Card className={style.box}>
					<h4>TeamMates</h4>
					{admins?.map(admin=>{
						return(
							<li key={admin.id}>{`${admin.name} ${admin.lastname}`}</li>
						)
					})}
				</Card>
				<Card className={style.box}>
					<Button variant="outline-danger" className={style.columnComponentExit} as={Link} to="/home"><i className="bi bi-box-arrow-left"/>Exit Dashboard</Button>
				</Card>
			</div>
			
			<div className={style.column2}>
				<Card className={style.panel}>
					Admin Dashboard
				</Card>

				<Card className={style.panel}>
					<AdminTableUsers/>
				</Card>
			</div>
    </section>
  );
};

export default Dashboard;
