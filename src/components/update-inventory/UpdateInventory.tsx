import React, { ChangeEvent, useEffect, useState } from "react";
// import ImageUploading, { ImageListType } from "react-images-uploading";

import {
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Snackbar,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Grid

} from "@mui/material";


import { ChakraProvider } from '@chakra-ui/react' 

import FileUpload from './../upload/FileUpload'

import { useNavigate } from "react-router-dom";
import RestClient from "../../services/http-servies/axiosClient";
import AuthService from "../../services/auth/authService";
import ToasterService from "../../services/toaster/toasterService";
import { green } from "@mui/material/colors";
import "./UpdateInventory.css";
import { Checkbox } from "@material-ui/core";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function LoginForm() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        sealId: "",
        noofcoins: "",
        weight: "",
        server: "",
        newSealId: ""
    });
    const [loginData, setLoginData] = useState({
        sealId: "",
        noofcoins: "",
        weight: "",
        server: "",
        newSealId: ""
    });

    // const [loginData, setLoginData] = useState({
    //     sealId: "",
    //     noofcoins: "",
    //     weight: "",
    //     server: "",
    //     newSealId: ""
    // });

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState("");
    const [typeOfUpdate, setTypeOfUpdate] = useState(1) // 1=> inward , 2-> outward
    const toasterService = new ToasterService();
    const authService = new AuthService();

    useEffect(() => {
    }, []);

    useEffect(() => {
        getClient();
    }, []);
    const getClient = () => {
        // const { accountAddress = '' } = authService.decodeToken();
        const url = `client`;
        RestClient.get(url)
            .then((res: any) => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data);
                    setRows(res.data);
                }
            })
    };



    const updateInventory = () => {
        const url = `inventory/inwarding`;
        const params = {
            clientId: selectedRows,
            currentSealId: loginData.sealId,
            weight: loginData.weight,
            noOfCoin: loginData.noofcoins
        }
        console.log({ params })
        RestClient.post(url, params)
            .then((res: any) => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data);
                    // setRows(res.data);
                }
            })
    };

    const outwardInventory = () => {
        const url = `inventory`;
        const params = {
            clientId: selectedRows,
            currentSealId: loginData.sealId,
            newSealId: loginData.weight,
            noOfCoin: loginData.noofcoins
        }
        console.log({ params })
        RestClient.post(url, params)
            .then((res: any) => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data);
                    setRows(res.data);
                }
            })
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        setErrors({ ...errors, [name]: "" });
        setLoginData({ ...loginData, [name]: value });
        if (value === "") {
            setErrors({ ...errors, [name]: `${name} is required` });
        }
    };

    const typeDropDownHandler = (event: any) => {
        console.log(event.target.value, "======");
        setTypeOfUpdate(event.target.value);
    }

    const onClientUserChange = (event: any) => {
        console.log(event.target.value);
        setSelectedRows(event.target.value)
    }

    const validateForm = (loginData: any) => {
        if (loginData.SealId === "" && loginData.Noofcoins === "" && loginData.weight === "") {
            setErrors({
                sealId: "Email ID is required",
                noofcoins: "Password is required",
                weight: "",
                server: "",
                newSealId: ""
            });
            return false;
        }
        if (loginData.emailId === "") {
            setErrors({ ...errors, sealId: "Seal ID is required" });
            return false;
        }
        if (loginData.password === "") {
            setErrors({ ...errors, noofcoins: "No of coins is required" });
            return false;
        }
        if (loginData.weight === "") {
            setErrors({ ...errors, weight: "Weight is required" });
            return false;
        }
        return true;
    };

    return (
        // <div className="container-login">
        <>
            <div className="container-login">
                <div className="left-col-login">
                    <Grid container spacing={2}>

                        <Box m={6} pt={3} component="form" noValidate autoComplete="off">
                            <h1 id="demo-simple-select-label">Manage Inventory <span>{typeOfUpdate == 1 ? "- Inwarding" : "- Outwarding"}</span></h1>
                            {/* <label>Name:</label> */}

                            <Grid item xs={6}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typeOfUpdate}
                                    label="Age"
                                    onChange={typeDropDownHandler}>
                                    <MenuItem value={1}>Inwarding</MenuItem>
                                    <MenuItem value={2}>Outwarding</MenuItem>
                                </Select>
                            </Grid>
                            <Grid mt={4} mb={4} item xs={6}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Client Id"
                                    onChange={onClientUserChange}
                                    value={selectedRows}
                                >
                                    {
                                        rows.map((elem: any) => <MenuItem value={elem.value}>{elem.name}</MenuItem>)
                                    }
                                    {/* <MenuItem value={2}>Client2</MenuItem> */}
                                </Select>
                            </Grid>

                            {typeOfUpdate == 1 ?
                                <>
                                    <TextField
                                        id="outlined-basic"
                                        label="Seal Id "
                                        name="sealId"
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(errors?.sealId)}
                                        helperText={errors?.sealId}
                                        sx={{ mb: 3 }}
                                        variant="outlined"
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label="Weight "
                                        name="weight"
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(errors?.sealId)}
                                        helperText={errors?.sealId}
                                        sx={{ mb: 3 }}
                                        variant="outlined"
                                    />

                                    <TextField
                                        id="filled-basic"
                                        label="Number Of Coins"
                                        fullWidth
                                        sx={{ mb: 3 }}
                                        name="noofcoins"
                                        onChange={handleChange}
                                        error={Boolean(errors?.noofcoins)}
                                        helperText={errors?.noofcoins}
                                        variant="outlined"
                                    />
        <ChakraProvider>
            <FileUpload />
        </ChakraProvider>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        sx={{ mb: 3, bgcolor: '#007fa3' }}
                                        className="btn-sign"
                                        disabled={isLoading}
                                    // onClick={loginHandle}
                                    > Upload Document</Button>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        sx={{ mb: 3, bgcolor: '#007fa3' }}
                                        className="btn-sign"
                                        disabled={isLoading}
                                        onClick={updateInventory}
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
                                            "Inwarding"
                                        )}
                                    </Button>
                                </>

                                :
                                <>

                                    <TextField
                                        id="outlined-basic"
                                        label="Seal Id "
                                        name="currentSealId"
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(errors?.sealId)}
                                        helperText={errors?.sealId}
                                        sx={{ mb: 3 }}
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Number Of Coins"
                                        fullWidth
                                        sx={{ mb: 3 }}
                                        name="noOfcoins"
                                        onChange={handleChange}
                                        error={Boolean(errors?.noofcoins)}
                                        helperText={errors?.noofcoins}
                                        type="text"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="New Seal ID "
                                        name="newSealId"
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(errors?.newSealId)}
                                        helperText={errors?.newSealId}
                                        sx={{ mb: 3 }}
                                        variant="outlined"
                                    />

                                    {/* <Checkbox {...label} defaultChecked /> */}
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Empty SealID" />



                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        sx={{ mb: 3, bgcolor: '#007fa3' }}
                                        className="btn-sign"
                                        disabled={isLoading}
                                        onClick={outwardInventory}
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
                                            "Outwarding"
                                        )}
                                    </Button>
                                </>
                                // </div>

                            }
                            {errors?.server ? (
                                <Alert sx={{ mt: 2 }} severity="error">
                                    {errors?.server}
                                </Alert>
                            ) : (
                                ""
                            )}
                        </Box>
                    </Grid>

                </div>
            </div>

        </>
    );
}
