import React from "react";
import "./loginPage.css";
import { deepOrange } from "@mui/material/colors";
import { Grid, Paper, Avatar, Typography, Divider, Link } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LoginForm from "./LoginForm";
import Globalheader from '../global-header/GlobalHader';
const bannerImage = require("../images/happy-farmer.jpg");

export default function Userlogin() {
  return (
    <>
    <Globalheader></Globalheader>
    <div className="container-login">
      <div className="left-col-login">
        <Grid className="login-Box">
          <Paper elevation={4} className="paperLoginBox">

            <Typography
              variant="subtitle1"
              sx={{ mb: 3 }}
              className="credentials"
            >
              Enter your credentials to continue
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="subtitle2" sx={{ mb: 3 }}>
              Sign In with Email address
            </Typography>

            <LoginForm />
            <Divider sx={{ mb: 3 }} />
            <Link href="/forgot" underline="none" color="inherit">
              Forgot Password ?
            </Link>
          </Paper>
        </Grid>
      </div>      
        {/* <img className="hero-image-login" src={String(bannerImage)}></img>    */}
    </div>
    </>  
  );
}
