import React,{useRef,useState} from 'react';
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  CardMedia
  
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RestClient from "../../services/http-servies/axiosClient";
import AuthService from "../../services/auth/authService";



interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
  appId: string;  
  coaUrl:string;
  coaHash:string;
  status:string;

}



const CoaApprovalPop = ({ open, closeDialog,appId,coaUrl,coaHash,status }: propsDialogeModal) => {

  const authService = new AuthService();
  const { accountAddress = "" } = authService.decodeToken();

  const [errors, setErrors] = useState({
    serverError: "",
  });

  const [isLoading, setLoading] = useState(false);

  console.log("appId, coaUrl, coaHash", appId, coaUrl, coaHash,status);

  
  
  const approveHandler = () => {
    console.log("=======approveHandler=======");
    setLoading(true);
    const formdata = {
      "publicAddress": accountAddress,
      "appId": appId
    }

    console.log("formdata of certificate approval", formdata);
    
    RestClient.post("auction/coa/approve", formdata)
        .then((resolve: any) => {
          if (resolve.data.success) {

            console.log("=======in if=======");
            setLoading(false);
            setErrors({
              serverError: "",
            });
            closeDialog();

          } else {

            console.log("=======in else=======",resolve.data.data);
            setLoading(false);
            setErrors({ ...errors, serverError: resolve.data.message });
            
          }
        })
        .catch((reject) => {
          console.log("reject",reject);
          setLoading(false);
          setErrors({ ...errors, serverError: "Something went wrong!" });         
        });
 
  };

  const clearErrorState=()=>{
    setErrors({
      serverError: "",
    });
    closeDialog();
  }




  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth='sm'
      sx={{ minWidth: 300 }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => { clearErrorState() }}
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
      <DialogContentText sx={{ p: 5 }}>
      <Typography variant="h6" color="primary">
            Approve certificate of approval
          
      </Typography>
      <Divider sx={{ pt: 2, mb: 2 }} />
      <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}>

           <Grid item xs={12} sm={12} sx={{pt:2}} textAlign='right'>
           <CardMedia
                  component="img"
                  height="194"
                  image={coaUrl}
                  alt="Paella dish"
                />
        
          
            </Grid>  
          
            <Grid item xs={12} sm={12} sx={{pt:2}} textAlign='left'>
            <Stack spacing={2}>
            <Typography variant="subtitle2">
             Md5Hash : {coaHash}
            </Typography>
            <Typography variant="subtitle2">
             Status : {status}
            </Typography>
            </Stack>
         
            </Grid>

            <Grid item xs={12} sm={12} sx={{pt:2}} textAlign='right'>

            <Button variant="contained" 
             onClick={approveHandler} 
             disabled={isLoading  } 
            >Approve COA</Button> &nbsp;
            
            {isLoading ? (
                <CircularProgress
                  color="secondary"
                  variant="indeterminate"
                  defaultValue="Modify"
                  size={16}
                />
              ) : (
                ""
              )}
            </Grid>




         

            {errors?.serverError ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors?.serverError}
              </Alert>
            ) : (
              ""
            )}     
        </Grid> 
        
      </DialogContentText>
    </Dialog>
  );

}


export default CoaApprovalPop;