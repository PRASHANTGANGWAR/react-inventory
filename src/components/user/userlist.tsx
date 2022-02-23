// import React, { useEffect } from "react";
import "./Dashboard.css";
import Applicationheader from "../../components/app-header/Header";
import RestClient from "../../services/http-servies/axiosClient";
import {TokensInCoin} from "../../config/constants";
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import { useEffect,useState }  from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { Grid, Paper, Avatar, Typography, Divider, Link, Snackbar, Alert } from "@mui/material";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    getInventory();
  }, []);
  const [rows, setRows] = useState([]);
  const getInventory = () => {  
    // const { accountAddress = '' } = authService.decodeToken();
    const url = `users`;
    RestClient.get(url)
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          // setBalance(res.data/1000000);
          setRows(res.data);
        } 
      })
  };

  function renderForm(){
    navigate("/addUser");
  }

  function updateStatus(row: any){
    console.log("========row===", row)

    const url = `users/update-status`;
    RestClient.post(url, { status: !row.status, email: row.email})
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          // setRows(res.data);
        } 
      })
  }
  

  function activateUser(){
    navigate("/addUser"); // update user 
  }

  return (
    <>
    <Applicationheader />
    <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Sign In with Email address
        </Typography>
   <button type="button" onClick={renderForm} > Add User  </button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">User Id/Emp ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Mobile Number</TableCell>
            <TableCell align="right">Staus</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.empId}</TableCell>
              <TableCell align="right">{row.firstName + row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.mobileNo}</TableCell>
              <TableCell align="right">{row.status? "Active": "Inactive"}</TableCell>
              <TableCell align="right">{!row.status? <button type="button" onClick={ () => updateStatus(row)} > Activate  </button>: <button type="button" onClick={ () => updateStatus(row)} > De-Activate</button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

