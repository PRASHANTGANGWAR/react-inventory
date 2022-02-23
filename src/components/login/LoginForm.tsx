import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestClient from "../../services/http-servies/axiosClient";
import AuthService from "../../services/auth/authService";
import ToasterService from "../../services/toaster/toasterService";
import { green } from "@mui/material/colors";
import "./loginPage.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    emailId: "",
    password: "",
    server: "",
  });
  const [loginData, setLoginData] = useState({ emailId: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toasterService = new ToasterService();
  const authService = new AuthService();

  useEffect(() => {
    if (authService.validateToken()) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setErrors({ ...errors, [name]: "" });
    setLoginData({ ...loginData, [name]: value });
    if (value === "") {
      setErrors({ ...errors, [name]: `${name} is required` });
    }
  };

  const validateForm = (loginData: any) => {
    if (loginData.emailId === "" && loginData.password === "") {
      setErrors({
        emailId: "Email ID is required",
        password: "Password is required",
        server: "",
      });
      return false;
    }
    if (loginData.emailId === "") {
      setErrors({ ...errors, emailId: "Email ID is required" });
      return false;
    }
    if (loginData.password === "") {
      setErrors({ ...errors, password: "Password is required" });
      return false;
    }
    return true;
  };

  const loginHandle = () => {
    const loginObj = {
      email: loginData.emailId,
      password: loginData.password,
    };

    if (validateForm(loginObj)) {
      setLoading(true);
      setErrors({ ...errors, server: "" });
      RestClient.post("users/login", loginObj)
        .then((res: any) => {
          console.log(res);
          if (res.status == 200) {
            authService.setToken("token", JSON.stringify(res.data));
            setLoginSuccess(true);

            setTimeout(function () {
              if ((res.data.userType === "INVESTOR"))
                navigate("/dashboard-investor");
              else if((res.data.userType === "PLATFORM_OWNER")){
                navigate("/app-dashboard");
              }else{
                navigate("/dashboard");
              }
             
            }, 2000);
            setErrors({ ...errors, server: "" });
            setLoading(false);
          } else {
            console.log("Error", res);
            setErrors({ ...errors, server: "Invalid Credentials!" });
            setLoading(false);
            setLoginSuccess(false);
          }
        })
        .catch((err) => {
          console.log("Error", err);
          setErrors({ ...errors, server: "Invalid Credentials!" });
          setLoading(false);
          setLoginSuccess(false);
        });
    }
  };

  return (  
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Email "
            name="emailId"
            onChange={handleChange}
            fullWidth
            error={Boolean(errors?.emailId)}
            helperText={errors?.emailId}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <TextField
            id="filled-basic"
            label="Password"
            fullWidth
            sx={{ mb: 3 }}
            name="password"
            onChange={handleChange}
            error={Boolean(errors?.password)}
            helperText={errors?.password}
            type="password"
            variant="outlined"
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mb: 3, bgcolor: '#007fa3' }}
            className="btn-sign"
            disabled={isLoading}
            onClick={loginHandle}
          >
            {isLoading ? (
              <CircularProgress
                color="secondary"
                variant="indeterminate"
                defaultValue="Modify"
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              "Login"
            )}
          </Button>
          {errors?.server ? (
            <Alert sx={{ mt: 2 }} severity="error">
              {errors?.server}
            </Alert>
          ) : (
            ""
          )}

          <Snackbar open={loginSuccess} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: "100%" }}>
              Login Successfull ! Please wait
            </Alert>
          </Snackbar>
        </Box>
  
  );
}
