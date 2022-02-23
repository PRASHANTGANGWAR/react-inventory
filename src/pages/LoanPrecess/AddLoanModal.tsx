import React from 'react'
import { Button, Divider, Grid, Typography } from '@mui/material'
//import AddIcon from "@mui/icons-material/Add";
//import { deepOrange } from '@mui/material/colors';
import ToasterService from '../../services/toaster/toasterService';
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert
} from "@mui/material";


//import Stack from "@mui/material/Stack";
//import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
//import FormGroup from "@mui/material/FormGroup";
import RestClient from "../../services/http-servies/axiosClient";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import AuthService from "../../services/auth/authService";


interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
}

const toasterService = new ToasterService();

const AddLoanModal = ({
  open,
  closeDialog,

}: propsDialogeModal) => {


  const closeDilaogHandle = () => {
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ minWidth: 120 }}>
        <IconButton
          aria-label="close"
          onClick={closeDilaogHandle}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContentText sx={{ p: 3 }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        >
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Typography variant="h6" color="primary">
              Apply For Loan
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} md={12} lg={12} sx={{ mb: 1 }}>
            <Typography variant='caption'>Interest Rate</Typography>
            <Typography variant='h4' color='darkred'>data %</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mb: 1 }}>
            <TextField 
              id="invester-loan-amount" 
              label="Loan amount"
              fullWidth
              type='number'
              variant="outlined" />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mb: 1 }}>
            <TextField 
            id="invester-loan-reason" 
            label="Loan Reason"
            fullWidth
            multiline
            rows='3'
            variant="outlined" />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mb: 1 }}>
            <Button 
             variant="contained"
             size='large'
             fullWidth
             >Get Loan</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mb: 1 }}>
          <Alert severity="error">Loan Amount should not be bigger then Platform amount.</Alert>
          <Alert severity="success">Successfully got the loan — please check your account!</Alert>
          </Grid>
        </Grid>

      </DialogContentText>
    </Dialog>
  )
}
export default AddLoanModal;
