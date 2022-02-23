import React from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Grid, Paper, Avatar, Typography, Divider, Link, Snackbar, Alert } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import RegistrationFrom from "./RegistrationFrom";
import Globalheader from "../global-header/GlobalHader";
import "./registration.css";
const video3 = require("../images/videoregistration.mp4");

export default function NewUserRegistration() {
  return (
    <>
    <Globalheader></Globalheader>
    <div className="container-login">
      <div className="left-col-login">
    <div className='pagebg'>
      <Grid className='login-Box'>
      <Paper elevation={4} className="paperLoginBox">
        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Sign In with Email address
        </Typography>
        <RegistrationFrom />
        <Divider sx={{ mb: 3 }} />
        <Link href="/login" underline="none" color="inherit" >
          go back to login{" "}
        </Link>
      </Paper>
    </Grid>
    </div>
    </div>    
    </div>
    <footer>
        <div className="container">
          <h4>© Copyright The Hemp Blockchin</h4>
        </div>
      </footer>
    </> 
  );
}
