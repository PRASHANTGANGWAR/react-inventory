import React, { ChangeEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
  auction:Array<any>;
}
const toasterService = new ToasterService();
const FileLoan = ({ open, closeDialog, assetID, auction, refresh }: propsDialogeModal) => {
  console.log("--->allAuctions", auction)
  const [isLoading, setLoading] = useState(false);
  const [loanFields, setLoanFields] = useState({
    amount: 0,
    loanReason: "",
  });
  const authService = new AuthService();
  const [errors, setErrors] = useState({
    amount: "",
    loanReason: "",
    server: "",
  });
  const { accountAddress = "" } = authService.decodeToken();
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setErrors({ ...errors, [name]: "" });

    setLoanFields({ ...loanFields, [name]: value });
    if (value === "") {
      setErrors({ ...errors, [name]: `${name} is required.` });
    }
  };

  const validateForm = (loginData: any) => {
    if (loanFields.amount === 0 ) {
      setErrors({
        amount: "Amount is required",
        loanReason: "",
        server: "",
      });
      return false;
    }
    if (loanFields.loanReason === "") {
      setErrors({ ...errors, loanReason: "Reason is required" });
      return false;
    }
    
    return true;
  };

  const createAssetHandler = () => {
       
    const isValiated = validateForm(loanFields);
    const formData = {
      "borrowerAddress" :  accountAddress,
      "amount":  loanFields.amount,
      "interestRate":  10,
      "loanReason":  loanFields.loanReason,
      "auctionApplicationId":auction[auction.length-1].applicationId,
      "assetId" : assetID
    }
console.log(formData)
    if (isValiated) {
      setLoading(true);
      RestClient.post("loan/file", formData)
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
              Asset ID : {assetID}
            </Typography>
          </Grid>
          <Divider sx={{ pt: 2 }} />
        </Grid>
        

        <Grid container>  
          <Grid item xs={12} sm={12} sx={{ pt: 2 }}>
            <TextField
              id="outlined-basic"
              type="number"
              fullWidth
              onChange={handleChange}
              disabled={isLoading}
              name="amount"
              label="Amount to lend"
              error={Boolean(errors?.amount)}
              helperText={errors?.amount}
              placeholder="Amount"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ pt: 2 }}>
            <TextField
              id="outlined-basic"
              type="input"
              fullWidth
              name="loanReason"
              onChange={handleChange}
              error={Boolean(errors?.loanReason)}
              helperText={errors?.loanReason}
              disabled={isLoading}
              label="Reason for loan"
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
                "Apply For Loan"
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
export default FileLoan;
