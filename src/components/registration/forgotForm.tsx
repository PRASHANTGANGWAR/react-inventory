import React, { ChangeEvent, SetStateAction, useState } from "react";
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
import RestClient from "../../services/http-servies/axiosClient";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

interface signupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  userType: string;
  ConfirmPassword: string;
  serverError?: string;
}
export default function ForgotFrom() {
  const [userType, setUserType] = useState("INVESTOR");
  const [isLoading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState<string>("");
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<signupData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    userType: "",
    ConfirmPassword: "",
  });
  const [errors, setErrors] = useState<signupData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    userType: "",
    ConfirmPassword: "",
    serverError: "",
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
    let signUpErrors: signupData = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      userType: "",
      ConfirmPassword: "",
      serverError: "",
    };

    if (
      formFields.firstName === "" &&
      formFields.lastName === "" &&
      formFields.email === "" &&
      formFields.username === "" &&
      formFields.password === "" &&
      formFields.userType === ""
    ) {
      setErrors({
        firstName: "First Name is required.",
        lastName: "Last Name is required.",
        username: "Email is invalid.",
        email: "Username is required",
        password: "Password is required.",
        ConfirmPassword: "Confirm email is required",
        userType: "User Type Password is required",
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
    signUpErrors.username = formFields.username ? "" : "Username is required";
    signUpErrors.password = formFields.password
      ? formFields.password.length > 5
        ? ""
        : "Password must be more than 5 characters"
      : "Password is required";
    signUpErrors.ConfirmPassword = formFields.ConfirmPassword
      ? formFields.password === formFields.ConfirmPassword
        ? ""
        : "Password doesnt match"
      : "Confirm Password is required";

    setErrors({ ...signUpErrors });

    return Object.values(signUpErrors).every((val) => val === "");
  };

  const registerUserHandler = () => {
    const validated = validateForm();

    formFields["userType"] = userType;
    console.log(formFields);

    if (validated) {
      setLoading(true);
      RestClient.post("signup", formFields)
        .then((resolve: any) => {
          console.log(resolve);
          if (resolve.status == 200) {
            setLoading(false);
            setSignupSuccess(
              resolve.data.message || "Signup Successful! Please login now."
            );
            setTimeout(function () {
              navigate("/login");
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
        placeholder="example@domainname.com"
        fullWidth
        error={Boolean(errors?.email)}
        helperText={errors?.email}
        sx={{ mb: 3 }}
        variant="outlined"
      />

      <TextField
        id="user-password"
        label="Mobile number * "
        name="Mobile number"
        fullWidth
        onChange={handleChange}
        disabled={isLoading}
        sx={{ mb: 3 }}
        type="password"
        error={Boolean(errors?.ConfirmPassword)}
        helperText={errors?.ConfirmPassword}
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
          <MenuItem value={"Admin"}>Admin</MenuItem>
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
          "Sign me up"
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
          Signup Successfull ! Redirecting to login screen
        </Alert>
      </Snackbar>
    </Box>
  );
}
