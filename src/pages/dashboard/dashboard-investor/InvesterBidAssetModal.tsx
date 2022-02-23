import React, { ChangeEvent, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AuthService from "../../../services/auth/authService";
import RestClient from "../../../services/http-servies/axiosClient";
import { useNavigate } from "react-router-dom";
interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
  assetID: string;
  reserveAmount: string;
  applicationId: string;
  minAmount: string;
}
const authService = new AuthService();
const InvesterBidAssetModal = ({
  open,
  closeDialog,
  assetID,
  reserveAmount,
  applicationId,
  minAmount,
}: propsDialogeModal) => {
  const [biddingAmount, setBiddingAmount] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { accountAddress = "" } = authService.decodeToken();
  const [errors, setErrors] = useState("");
  const [bidSuccess, setBidSuccess] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBiddingAmount(event.target.value);
  };

  const validateForm = () => {
    if (biddingAmount === "") {
      setErrors("Can't leave field blank");
      return false;
    } else {      
      if(biddingAmount < minAmount){
        setErrors("Minimum amount must be "+ minAmount);
        return false;
      }
      return true;
    }
  };
  const addBiddingHandle = () => {
    const biddingDetails = {
      bidAmount: parseInt(biddingAmount)*1000000,
      bidder: accountAddress,
      auctionApplicationId: applicationId,
      assetId: assetID,
    };

    if (validateForm()) {
      setLoading(true);
      setErrors("");
      RestClient.post("auction/bid", biddingDetails)
        .then((res: any) => {         
          if (res.data.success) {           
            setTimeout(function () {
              closeDialog();
            }, 2000);
            setBidSuccess(true);
            setLoading(false);
          } else {
            console.log("Error", res);
            setErrors(res.data.data );
            setLoading(false);
            setBidSuccess(false);
          }
        })
        .catch((err) => {
          console.log("Error", err);
          setErrors("Something went wrong");
          setLoading(false);
          setBidSuccess(false);
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
            <Typography variant="caption">Reserve Amount :</Typography>
            <Typography variant="h5" color="primary">
              {reserveAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pt: 3, pr: 1 }}>
            <Typography variant="caption">
              Minumum Increment Amount/Bid :
            </Typography>
            <Typography variant="h5" color="primary">
              {minAmount}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ pt: 2 }}>
            <TextField
              id="outlined-basic"
              type="number"
              fullWidth
              name="minIncrement"
              disabled={isLoading}
              label="Bid Amount"
              onChange={handleChange}              
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sx={{ pt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mb: 3 }}
              className="btn-sign"
              disabled={isLoading}
              onClick={addBiddingHandle}
            >
              {" "}
              {isLoading ? (
                <CircularProgress
                  color="secondary"
                  variant="indeterminate"
                  defaultValue="Modify"
                  size={16}
                />
              ) : (
                "My Bid"
              )}
            </Button>
            {errors.length > 0 ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors}
              </Alert>
            ) : (
              ""
            )}
          </Grid>
          <Snackbar open={bidSuccess} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: "100%" }}>
              Congrats! Your Bid is placed.
            </Alert>
          </Snackbar>
        </Grid>
      </DialogContentText>
    </Dialog>
  );
};
export default InvesterBidAssetModal;
