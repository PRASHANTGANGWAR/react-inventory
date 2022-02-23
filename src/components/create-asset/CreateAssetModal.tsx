import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";

import Stack from "@mui/material/Stack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormGroup from "@mui/material/FormGroup";
import RestClient from "../../services/http-servies/axiosClient";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ToasterService from "../../services/toaster/toasterService";
import AuthService from "../../services/auth/authService";

interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
  refreshList: () => void;
}

const toasterService = new ToasterService();
const CreateAssetModal = ({
  open,
  closeDialog,
  refreshList,
}: propsDialogeModal) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [assetCreated, setAssetCreated] = useState(false);
  const [errors, setErrors] = useState({
    AssetName: "",
    Symbol: "",
    Description: "",
    Image: "",
    serverError: "",
  });
  const [formFields, setFormFields] = useState({
    AssetName: "",
    Symbol: "",
    Description: "",
  });
  const authService = new AuthService();
  const [selectedFile, setSelectedFile] = useState("");
  const [documentFile, setDocumentFile] = useState<any>("");

  const uploadedImage = React.useRef<any>();
  const imageUploader = React.useRef<any>();

  const documentUploaded = React.useRef<any>();
  const documentUploader = React.useRef<any>();

  const { accountAddress = "" } = authService.decodeToken();

  const handleImageUpload = (event: any) => {
    const [file] = event.target.files;
    if (file) {
      setSelectedFile(event.target.files[0]);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e: any) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setErrors({ ...errors, Image: "" });
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

  const closeDilaogHandle = () => {
    closeDialog();
  };

  const Input = styled("input")({
    display: "none",
  });

  const validateForm = () => {
    if (
      formFields.AssetName === "" &&
      formFields.Symbol === "" &&
      formFields.Description === "" &&
      selectedFile === ""
    ) {
      setErrors({
        AssetName: "Asset Name is required",
        Symbol: "Symbol is required.",
        Description: "Description is required.",
        Image: "image is required",
        serverError: "",
      });
      return false;
    }
    if (formFields.AssetName === "") {
      setErrors({ ...errors, AssetName: "Asset Name is required" });
      return false;
    }
    if (formFields.Symbol === "") {
      setErrors({ ...errors, Symbol: "Symbol is required" });
      return false;
    }
    if (formFields.Description === "") {
      setErrors({ ...errors, Description: "Description is required" });
      return false;
    }
    if (selectedFile === "") {
      setErrors({ ...errors, Symbol: "Image is required" });
      return false;
    }
    return true;
  };

  const createAssetHandler = () => {
    const validated = validateForm();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assetName", formFields.AssetName);
    formData.append("supportedDoc", documentFile);
    formData.append("description", formFields.Description);
    formData.append("metaDataHash", "test");
    formData.append("URL", "test");
    formData.append("creatorAddress", accountAddress);
    formData.append("unitName", formFields.Symbol.substring(0,3));    

    if (validated) {
      setLoading(true);
      setErrors({ ...errors, serverError: "" });
      console.log(formData.getAll);
      RestClient.post("asset/create", formData)
        .then((resolve: any) => {
          if (resolve.data.success) {
            console.log(resolve);
            setLoading(false);
            closeDilaogHandle();
            refreshList();
            setAssetCreated(true);            
          } else {
            setErrors({ ...errors, serverError: resolve.data.data });
            setLoading(false);
            setAssetCreated(false);
          }
        })
        .catch((reject) => {
          setErrors({ ...errors, serverError: "Something went wrong!" });
          setLoading(false);
          setAssetCreated(false);          
        });
    }
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
              Asset details
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
            <TextField
              id="filled-basic"
              fullWidth
              label="Name"
              name="AssetName"
              placeholder="Asset Name"
              variant="outlined"
              error={Boolean(errors?.AssetName)}
              helperText={errors?.AssetName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
            <TextField
              id="filled-basic"
              fullWidth
              label="Symbol name"
              placeholder="USDT"
              name="Symbol"
              variant="outlined"
              error={Boolean(errors?.Symbol)}
              helperText={errors?.Symbol}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
            <label htmlFor="contained-button-file">
              <Button
                variant="outlined"
                color="error"
                component="span"
                startIcon={<CloudUploadOutlinedIcon fontSize="small" />}
                //@ts-ignore
                onClick={() => imageUploader.current.click()}
              >
                Upload Image
              </Button>
            </label>
          </Grid>

          <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
            <Stack spacing={1}>
              <img
                ref={uploadedImage}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50px",
                  background: "rgba(0, 0, 0, 0.38)",
                }}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              />
            </Stack>{" "}
            {
              <span
                style={{
                  color: "#D32F2F",
                }}
              >
                {errors?.Image}
              </span>
            }
          </Grid>

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
                Upload your document
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
                
          {/* <Grid item xs={12} lg={12} sx={{ mb: 1 }}>
            <TextField
              id="basic-url"
              fullWidth
              rows="2"
              multiline
              label="Meta data Hash"
              name="URL"
              placeholder="https://glo.globallogic.com"
              variant="outlined"
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid> */}

          <Divider />

          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              id="asset-note"
              fullWidth
              multiline
              rows="4"
              label="Description"
              name="Description"
              placeholder="Asset description"
              variant="outlined"
              error={Boolean(errors?.Description)}
              helperText={errors?.Description}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormGroup>
              <Button
                variant="contained"
                type="submit"
                className="custom-button"
                size="large"
                fullWidth
                disabled={isLoading}
                onClick={createAssetHandler}
              >
                {isLoading ? (
                  <CircularProgress
                    color="secondary"
                    variant="indeterminate"
                    defaultValue="Modify"
                    size={16}
                  />
                ) : (
                  "Create Asset"
                )}
              </Button>
              {errors.serverError ? (
                <Alert severity="error">{errors.serverError}</Alert>
              ) : (
                ""
              )}
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContentText>     
    </Dialog>
  );
};
export default CreateAssetModal;
