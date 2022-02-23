// import React, { useEffect } from "react";
import "./Dashboard.css";
import Applicationheader from "../../components/app-header/Header";
import RestClient from "../../services/http-servies/axiosClient";
import { TokensInCoin } from "../../config/constants";
import { useNavigate } from "react-router-dom";

// import * as React from 'react';
// import { useEffect,useState }  from "react";
import React, { ChangeEvent, SetStateAction, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";

interface addUserData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  empId: string;
  serverError: string;
}

export default function ForgotFrom() {
  const [userType, setUserType] = useState("INVESTOR");
  const [isLoading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState<string>("");
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<addUserData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    empId: "",
    serverError: ""
  });
  const [errors, setErrors] = useState<addUserData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    empId: "",
    serverError: ""
  });

  const handleUserType = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserType(event.target.value);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setErrors({ ...errors, [name]: "" });
    setFormFields({ ...formFields, [name]: value });
    if (value === "") {
      setErrors({ ...errors, [name]: `${name} is required.` });
    }
  };

  const validateForm = () => {
    const regexEmail = new RegExp(/\S+@\S+\.\S+/);
    let signUpErrors: addUserData = {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      empId: "",
      serverError: ""
    };

    if (
      formFields.firstName === "" &&
      formFields.lastName === "" &&
      formFields.email === "" &&
      formFields.mobileNo === "" && 
      formFields.empId === ""

    ) {
      setErrors({
        firstName: "First Name is required.",
        lastName: "Last Name is required.",
        mobileNo: "Mobile No is required.",
        email: "Username is required.",
        empId: "Employee ID",
        serverError: ""
      });
      return false;
    }
    signUpErrors.firstName = formFields.firstName
      ? ""
      : "First Name is required";
    signUpErrors.lastName = formFields.lastName ? "" : "Last Name is required";
    signUpErrors.email = regexEmail.test(formFields.email)
      ? ""
      : "Email is invalid";
    signUpErrors.mobileNo = formFields.mobileNo ? "" : "Mobile No is required";

    setErrors({ ...signUpErrors });

    return Object.values(signUpErrors).every((val) => val === "");
  };

  const registerUserHandler = () => {
    const validated = validateForm();

    if (validated) {
      setLoading(true);
      RestClient.post("users", formFields)
        .then((resolve: any) => {
          console.log(resolve);
          if (resolve.status == 200) {
            setLoading(false);
            setSignupSuccess(
              resolve.data.message || "Signup Successful! Please login now."
            );
            setTimeout(function () {
              navigate("/addUser");
            }, 2000);
          } else {
            setErrors({
              ...errors,
              serverError: resolve.data.message || "Something went wrong!",
            });
          }
        })
        .catch((reject) => {
          setErrors({ ...errors, serverError: "Something went wrong!" });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Applicationheader />

      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="full-name"
          label="First name"
          fullWidth
          disabled={isLoading}
          onChange={handleChange}
          name="firstName"
          sx={{ mb: 3 }}
          variant="outlined"
        />
        <TextField
          id="last-name"
          label="Last name"
          fullWidth
          name="lastName"
          disabled={isLoading}
          onChange={handleChange}
          sx={{ mb: 3 }}
          variant="outlined"
        />

        <TextField
          id="user-email"
          label="Email Address"
          name="email"
          disabled={isLoading}
          onChange={handleChange}
          placeholder="example@domainname.co2m"
          fullWidth
          error={Boolean(errors?.email)}
          helperText={errors?.email}
          sx={{ mb: 3 }}
          variant="outlined"
        />

        <TextField
          id="mobile-no"
          label="Mobile number * "
          name="mobileNo"
          fullWidth
          onChange={handleChange}
          disabled={isLoading}
          sx={{ mb: 3 }}
          error={Boolean(errors?.mobileNo)}
          helperText={errors?.mobileNo}
          variant="outlined"
        />


        <TextField
          id="empId"
          label="Employee ID * "
          name="empId"
          fullWidth
          onChange={handleChange}
          disabled={isLoading}
          sx={{ mb: 3 }}
          error={Boolean(errors?.empId)}
          helperText={errors?.empId}
          variant="outlined"
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            disabled={isLoading}
            label="usertype"
            onChange={handleUserType}
          >
            <MenuItem defaultValue={"Admin"} value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Subadmin"}>SubAdmin</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 3, bgcolor: '#007fa3' }}
          size="large"
          className="btn-sign"
          disabled={isLoading}
          onClick={registerUserHandler}
        >
          {isLoading ? (
            <CircularProgress
              color="secondary"
              variant="indeterminate"
              defaultValue="Modify"
              size={16}
            />
          ) : (
            "Add User"
          )}
        </Button>
        {errors.serverError ? (
          <Alert severity="error">{errors.serverError}</Alert>
        ) : (
          ""
        )}
        {/* {signupSuccess ? <Alert severity="success">{signupSuccess}</Alert> : ""} */}
        <Snackbar open={signupSuccess != ""} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            User Added Successfully!
          </Alert>
        </Snackbar>
      </Box>
    </>

  );
}
