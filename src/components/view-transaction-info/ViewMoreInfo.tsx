import React from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from '@mui/material/useMediaQuery';
import InformationGridData from "./InformationGridData";



interface propsDialogeModal {
    open: boolean;
    closeDialog: () => void;
    allAuctions? : any[];
  }
const ViewMoreInfo = ({ open, closeDialog, allAuctions }: propsDialogeModal) => {

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
              Bidding details
            </Typography>
          </Grid>
          <Divider sx={{ pt: 2 }} />
        </Grid>
          <InformationGridData allAuction = {allAuctions}/>
      </DialogContentText>
    </Dialog>
  );
}
export default  ViewMoreInfo;