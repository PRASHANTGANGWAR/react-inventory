import React, { ChangeEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from "@material-ui/lab/DateTimePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import RestClient from "../../services/http-servies/axiosClient";
import ToasterService from "../../services/toaster/toasterService";
import AuthService from "../../services/auth/authService";

interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
  assetID: string;
  refresh : () => void;
}
const toasterService = new ToasterService();
const Bidding = ({ open, closeDialog, assetID, refresh }: propsDialogeModal) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [biddingFields, setBiddingFields] = useState({
    reserve: "",
    minIncrement: "",
  });
  const authService = new AuthService();
  const [errors, setErrors] = useState({
    reserve: "",
    minIncrement: "",
    server: "",
  });
  const { accountAddress = "" } = authService.decodeToken();
  const formatDate = (rawDate: Date) => {
    return (
      ("00" + (rawDate.getMonth() + 1)).slice(-2) +
      "" +
      ("00" + rawDate.getDate()).slice(-2) +
      "" +
      rawDate.getFullYear() +
      " " +
      ("00" + rawDate.getHours()).slice(-2) +
      ":" +
      ("00" + rawDate.getMinutes()).slice(-2) +
      ":" +
      ("00" + rawDate.getSeconds()).slice(-2)
    );
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setErrors({ ...errors, [name]: "" });

    setBiddingFields({ ...biddingFields, [name]: value });
    if (value === "") {
      setErrors({ ...errors, [name]: `${name} is required.` });
    }
  };

  const validateForm = (loginData: any) => {
    if (biddingFields.reserve === "" && biddingFields.minIncrement === "") {
      setErrors({
        reserve: "Reserve is required",
        minIncrement: "Min-Increment is required",
        server: "",
      });
      return false;
    }
    if (biddingFields.reserve === "") {
      setErrors({ ...errors, reserve: "Reserve ID is required" });
      return false;
    }
    if (biddingFields.minIncrement === "") {
      setErrors({ ...errors, minIncrement: "Min-Increment is required" });
      return false;
    }
    if(startDate > endDate){
      return false;
    }
    return true;
  };

  const createAssetHandler = () => {
       
    const isValiated = validateForm(biddingFields);
    const formData = {
      "reserve" :  biddingFields.reserve,
      "minIncrement":  biddingFields.minIncrement,
      "creatorAddress":  accountAddress,
      "startTime":  (+startDate/1000).toFixed(0),
      "endTime" : (+endDate/1000).toFixed(0),
      "assetId" : assetID
    }
console.log(formData)
    if (isValiated) {
      setLoading(true);
      RestClient.post("auction/create", formData)
        .then((resolve: any) => {
          console.log(resolve);
          if (resolve.data.success) {
            setLoading(false);
            closeDialog();
            refresh();
            toasterService.success("Auction Created Successfully");
          } else {
            setLoading(false);
            setErrors({ ...errors, server: resolve.data.data });
          }
        })
        .catch((reject) => {
          setLoading(false);
          setErrors({ ...errors, server: "Something went wrong!" });
          toasterService.error("Couldn't create asset");
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
          onClick={() => {
            closeDialog();
          }}
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
        <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}>
          <Grid item>
            <Typography variant="h6" color="primary">
              Auction Asset : {assetID}
            </Typography>
          </Grid>
          <Divider sx={{ pt: 2 }} />
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6} sx={{ pt: 3, pr: 1 }}>
            <Typography variant="subtitle1">
              Start auction Date Time :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props: any) => <TextField {...props} />}
                label="Start auction Date Time"
                value={startDate}
                minDate={new Date()}
                onChange={(newValue: any) => {
                  setStartDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ pt: 3, pr: 1 }}>
            <Typography variant="subtitle1">
              End auction Date Time :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props: any) => <TextField {...props} />}
                label="End auction Date Time"
                value={endDate}
                minDate={startDate}
                maxDate={
                  new Date(
                    startDate?.getFullYear(),
                    startDate?.getMonth(),
                    startDate?.getDate() + 2,
                    startDate?.getHours(),
                    startDate?.getMinutes()
                  )
                }
                onChange={(newValue: any) => {
                  setEndDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
         
          <Grid item xs={12} sm={12} sx={{ pt: 2 }}>
            <TextField
              id="outlined-basic"
              type="number"
              fullWidth
              onChange={handleChange}
              disabled={isLoading}
              name="reserve"
              label="Reserve Amount"
              error={Boolean(errors?.reserve)}
              helperText={errors?.reserve}
              placeholder="Bidding Starts from"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ pt: 2 }}>
            <TextField
              id="outlined-basic"
              type="number"
              fullWidth
              name="minIncrement"
              onChange={handleChange}
              error={Boolean(errors?.minIncrement)}
              helperText={errors?.minIncrement}
              disabled={isLoading}
              label="Minumum Increment Amount/Bid"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sx={{ pt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              size='large'
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
                "Start Auction"
              )}
            </Button>
            {errors?.server ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors?.server}
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </DialogContentText>
    </Dialog>
  );
};
export default Bidding;
