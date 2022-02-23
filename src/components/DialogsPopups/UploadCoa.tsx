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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RestClient from "../../services/http-servies/axiosClient";
import AuthService from "../../services/auth/authService";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";


interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
  allAuctions? : any[];
}



const UploadCoa = ({ open, closeDialog,allAuctions }: propsDialogeModal) => {

  const authService = new AuthService();
  const { accountAddress = "" } = authService.decodeToken();
  const documentUploader = useRef<any>();
  const documentUploaded = React.useRef<any>();
  const [documentFile, setDocumentFile] = useState<any>("");
  const [isLoading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    serverError: "",
  });


 

  const uploadCoaHandler = () => {
    console.log("=======uploadCoaHandler=======");
    setLoading(true);
    const appId= allAuctions?allAuctions[0].applicationId:0;
    const formData = new FormData();
    formData.append("file", documentFile);
    formData.append("cultivatorAddress", accountAddress);    
    formData.append("appId", appId);    
    RestClient.post("auction/coa/upload", formData)
        .then((resolve: any) => {
          if (resolve.data.success) {
            console.log("=======in if=======");
            setLoading(false);
            setErrors({
              serverError: "",
            });
        
            setDocumentFile("");
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

  const handleDocumentUpload = (event: any) => {
    const [file] = event.target.files;
    if (file) {
      setDocumentFile(event.target.files[0]);
      const reader = new FileReader();
      const { current } = documentUploaded;
      current.file = file;
      reader.onload = (e: any) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const Input = styled("input")({
    display: "none",
  });



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
          onClick={() => { closeDialog() }}
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
            Upload certificate of approval
      </Typography>
      <Divider sx={{ pt: 2, mb: 2 }} />
      <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}>
      <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
            <label htmlFor="contained-button-file">
              <Button
                variant="outlined"
                color="error"
                component="span"
                startIcon={<CloudUploadOutlinedIcon fontSize="small" />}
                //@ts-ignore
                onClick={() => documentUploader.current.click()}
              >
                Upload Certificate of Approval
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
            <Stack spacing={1}>
              <InsertDriveFileIcon sx={{ fontSize: 60 }} />
              <h6>{documentFile?.name}</h6>
              <Input
                type="file"
                onChange={handleDocumentUpload}
                ref={documentUploader}
                style={{
                  display: "none",
                }}
              />
            </Stack>
          </Grid>
            <Grid item xs={12} sm={12} sx={{pt:2}} textAlign='right'>
            <Button variant="contained"  
            onClick={uploadCoaHandler}
            disabled={isLoading}
            >Upload COA</Button> &nbsp;
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

            {errors?.serverError ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors?.serverError}
              </Alert>
            ) : (
              ""
            )}
            </Grid>          
        </Grid> 
        
      </DialogContentText>
    </Dialog>
  );

}


export default UploadCoa;