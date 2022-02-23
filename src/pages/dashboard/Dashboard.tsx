// import React, { useEffect } from "react";
import "./Dashboard.css";
import Applicationheader from "../../components/app-header/Header";
import RestClient from "../../services/http-servies/axiosClient";
import {TokensInCoin} from "../../config/constants";
import { useNavigate } from "react-router-dom";

// import AssetContainer from "../AssetsComponents/AssetContainer";
// import AppicationFooter from "../../components/app-footer/Footer";
// import AuthService from "../../services/auth/authService";
// import { useNavigate } from "react-router-dom";

// const authService = new AuthService();
// export default function Dashboard() {
//   const { userType = "" } = authService.decodeToken();
//   const navigate = useNavigate();
//   console.log(userType);
//   useEffect(() => {
//     if (authService.validateToken()) {
//       if (userType != "FARMER") navigate("/dashboard-investor");
//     } else {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <div>
//       <Applicationheader />
//       <AssetContainer />
//         <></>
//       <AppicationFooter />
//     </div>
//   );
// }



import * as React from 'react';
import { useEffect,useState }  from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    getInventory();
  }, []);
  const [rows, setRows] = useState([]);
  const getInventory = () => {  
    // const { accountAddress = '' } = authService.decodeToken();
    const url = `inventory`;
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
    navigate("/updateInventory");
  }

  return (
    <>
    <Applicationheader />
   <button type="button" onClick={renderForm} > Update Inventory  </button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Original Seal ID</TableCell>
            <TableCell align="right">Current Seal ID&nbsp;(g)</TableCell>
            <TableCell align="right">Original Coin Count</TableCell>
            <TableCell align="right">Original Token Count</TableCell>
            <TableCell align="right">Seal Staus</TableCell>
            <TableCell align="right">Current Coin Count</TableCell>
            <TableCell align="right">Current Token Count</TableCell>
            <TableCell align="right">Previous Seal ID</TableCell>
            <TableCell align="right">Previous Coin Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.originalSealId}</TableCell>
              <TableCell align="right">{row.currentSealId}</TableCell>
              <TableCell align="right">{row.coinCount}</TableCell>
              <TableCell align="right">{row.coinCount*TokensInCoin}</TableCell>
              <TableCell align="right">{row.sealStatus}</TableCell>
              <TableCell align="right">{row.currentCoinCount}</TableCell>
              <TableCell align="right">{row.currentCoinCount*TokensInCoin}</TableCell>
              <TableCell align="right">{row.previousSealId}</TableCell>
              <TableCell align="right">{row.previousCoinCount}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}