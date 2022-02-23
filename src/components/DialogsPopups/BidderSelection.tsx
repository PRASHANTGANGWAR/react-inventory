import React, { useState} from 'react';
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Alert,
  CircularProgress
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BidSelectionGrid from './BidSelectionGrid';
import { DialogActions } from '@material-ui/core';
import RestClient from "../../services/http-servies/axiosClient";
import AuthService from "../../services/auth/authService";

interface propsDialogeModal {
  open: boolean;
  closeDialog: () => void;
  allAuctions? : any[];
  assetID:string;
}



const BidderSelection=({ open, closeDialog, allAuctions, assetID }: propsDialogeModal)=>{

   console.log("allAuctions===>", assetID);

   const [selectedBid, setSelectedBid] = useState("");
   const [isLoading, setLoading] = useState(false);

   const [errors, setErrors] = useState({
    reserve: "",
    minIncrement: "",
    server: "",
  });

   const authService = new AuthService();
   const { accountAddress = "" } = authService.decodeToken();
  //  refunding bids
  const  manageBidSelection=(bidId:string)=>{
    console.log("here======>",bidId)
      setSelectedBid(bidId);
   }

   const onClickHandler =()=>{
    console.log("reached here",selectedBid)
    selectBidApiCall(selectedBid);    
   }


   const selectBidApiCall=(selectedBidId:string)=>{

    const appId =  allAuctions?allAuctions[0].applicationId:0;
   console.log("assetID==>"+selectedBidId);

     const formdata ={
      "senderAddress": accountAddress,
      "appId": appId,
      "assetId":assetID ,
      "bidId": selectedBidId
    }

    console.log("formdata before submit=================>",formdata);
    setLoading(true);
    RestClient.post("auction/bid/refund", formdata)
    .then((resolve: any) => {
      console.log(resolve);
      if (resolve.data.success) {
        setLoading(false);
        closeDialog();
      } else {
        setLoading(false);
        setErrors({ ...errors, server: resolve.data.data });
        
      }
    })
    .catch((reject) => {
      setLoading(false);
      setErrors({ ...errors, server: "Something went wrong!" });
    });
   }
    
    

  return (
    <Dialog
      open={open}
      fullWidth      
      maxWidth='lg'
      sx={{ minWidth: 300 }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>{closeDialog()}}
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
              Select Bidder (Total bid - {allAuctions?allAuctions[0].bids.length:0})
              </Typography>
            </Grid>
            <Divider sx={{ pt: 2 }} />
        </Grid>     
        <BidSelectionGrid 
         bids={ allAuctions?allAuctions[0].bids:[]}
         bidSelection={manageBidSelection}
         /> 
      </DialogContentText>
      <DialogActions>
        <Grid container sx={{pt: 2, pb: 4}}>
          <Grid item xs={12} sm={12} textAlign="right">
          <Button variant="contained" color="success"   onClick={onClickHandler}
            disabled={isLoading}
          >Confirm</Button> &nbsp; 
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

          {errors?.server ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors?.server}
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );

}


export default BidderSelection;