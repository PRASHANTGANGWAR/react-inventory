import React, { useState } from "react";
import "./assetsComponents.css";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Tooltip,
} from "@mui/material";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import AuctionRibbon from "../dashboard/dashboard-investor/AuctionRibbon";
import RestClient from "../../services/http-servies/axiosClient";
import toasterService from "../../services/toaster/toasterService";
import ToasterService from "../../services/toaster/toasterService";
import AuthService from "../../services/auth/authService";
import {
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface PropAssetData {
  assetID: string;
  total: string;
  metaData: string;
  description: string;
  name: string;
  url: string;
  manager: string;
  balance: string;
  supportedDocs: string;
  creator: string;
  auction: any[];
  allAuctions: any[];
  unitName: string;
  nftStatus: string;
  openBidding: () => void;
  openViewMoreInfo: () => void;
  getAssetID: (id: string) => void;
  getAllAuctions: (allAuctions: any[]) => void;
  openBidSelector: () => void;
  openUploadCoa: () => void;
  openLoan: () => void;
}

const AssetCards = ({
  assetID,
  total,
  metaData,
  description,
  name,
  url,
  manager,
  balance,
  supportedDocs,
  creator,
  unitName,
  auction,
  nftStatus,
  allAuctions,
  openBidding,
  openViewMoreInfo,
  getAssetID,
  getAllAuctions,
  openBidSelector,
  openUploadCoa,
  openLoan
}: PropAssetData) => {
  const authService = new AuthService();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const toasterService = new ToasterService();
  const [showAlert, setShowAlert] = useState(false);
  const { accountAddress = "" } = authService.decodeToken();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  console.log("allAuctions-->", allAuctions);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const biddingHandle = () => {
    openBidding();
    getAssetID(assetID);
  };

  const loanHandle = () => {
    openLoan();
    getAssetID(assetID);
    getAllAuctions(allAuctions);
  };

  const bidSelectorHandle =()=>{
    openBidSelector();
    getAssetID(assetID);
    getAllAuctions(allAuctions);
  }

  const uploadCoaHandle =()=>{
    getAssetID(assetID);
    getAllAuctions(allAuctions);
    openUploadCoa();
  }

  const [isLoading, setLoading] = useState(false);
  const closeBiddingHandle = () => {
    console.log("in close bidding handle");
    setError('');
    setSuccess(false);
    setLoading(true);
    let auctionClose = {
      senderAddress: accountAddress,
      appId: auction[0].applicationId,
      assetId: assetID,
    };
    
    RestClient.post("auction/closeAuction", auctionClose)
      .then((resolve: any) => {
        console.log(resolve);
        if (resolve.data.success) {
          setLoading(false);
          setError('');          
          setSuccess(true);
          setTimeout(function () {
            showAlertHandle();
          }, 1000);
          
        } else {      
          console.log(resolve.data.data)  
          setError(resolve.data.data);
          setSuccess(false);
          setLoading(false);
        }
      })
      .catch((reject) => {
        setLoading(false);
        setError('Something went wrong!');
      });   
  };
  const openViewMoreInfoHandler = () => {
    openViewMoreInfo();
    getAllAuctions(allAuctions);
  };
  const showAlertHandle = () => { 
    setSuccess(false);
    setError('');
    setShowAlert(!showAlert);
  };

  return (
    <Grid item xs={12} lg={4} md={4}>
      <Paper className="paper-card">
        {nftStatus !== "WITH_OWNER" && (auction && auction.length > 0) ? (
          <AuctionRibbon
            startTime={auction[0].startTime}
            endTime={auction[0].endTime}
          />
        ) : (
          ""
        )}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignContent="center" justifyContent="space-between">
            <Grid item xs={12} sm={10}>
              <Typography variant="subtitle1" className="cardTitle">
                {name}
              </Typography>
              <Link
                sx={{ pb: 1 }}
                target="_blank"
                underline="none"
                href={`https://testnet.algoexplorer.io/asset/${assetID}`}
                color="primary"
              >
                {assetID}
              </Link>
            </Grid>
            <Grid item xs={12} sm={2} textAlign="right">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={openViewMoreInfoHandler}>
                  <ListItemIcon>
                    <InfoOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  View Transaction Info
                </MenuItem>
                <MenuItem onClick={biddingHandle}>
                  <ListItemIcon>
                    <GavelOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Add auction
                </MenuItem>
                <MenuItem onClick={bidSelectorHandle}>
                  <ListItemIcon>
                    <VolumeDownOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Bidder Selection
                </MenuItem>
                {allAuctions && allAuctions.length > 0 ?
                <MenuItem onClick={loanHandle}>
                  <ListItemIcon>
                    <MonetizationOnIcon fontSize="small" />
                  </ListItemIcon>
                  Apply for loan
                </MenuItem>:" "
                  }
                <MenuItem onClick={showAlertHandle}>
                  </MenuItem>
                {/* <MenuItem onClick={showAlertHandle}>
                  <ListItemIcon>
                    <PublishedWithChangesOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Asset Transfer
                </MenuItem> */}
                <MenuItem onClick={uploadCoaHandle}>
                  <ListItemIcon>
                    <CardMembershipOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Upload Certificate of Approval
                </MenuItem>
              </Menu>
            </Grid>
            <Divider sx={{ pt: 1 }} />
            <Grid container sx={{ pt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Symbol :
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  {unitName}
                </Typography>
              </Grid>
              <Grid xs={12} sm={12} sx={{ pt: 1 }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Description :
                </Typography>
                <div className="card-discription">
                  <Typography variant="caption" paragraph>
                    {description}
                  </Typography>
                </div>
              </Grid>
              <Grid xs={12} sm={12} sx={{ pt: 1 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={url}
                  alt="Paella dish"
                />
              </Grid>
              <Grid xs={12} sm={12} sx={{ pt: 2 }}>
                <Tooltip title={supportedDocs} arrow>
                  <IconButton aria-label="add to favorites">
                    <a href={supportedDocs} target="_blank" rel="noreferrer">
                      <AttachmentOutlinedIcon />
                    </a>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={showAlert}
        onClose={showAlertHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Close Auction"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to close Auction ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={showAlertHandle} disabled={isLoading}>Cancel</Button>
          <Button onClick={closeBiddingHandle} autoFocus>
            {isLoading ? (
              <CircularProgress
                color="secondary"
                variant="indeterminate"
                defaultValue="Modify"
                size={16}
              />
            ) : (
              "Close Auction"
            )}
          </Button>
        </DialogActions>
        {error.length>0 && (
          <Snackbar open={true}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}
        {
          success && <Snackbar open={true}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Auction closed closing popup!
          </Alert>
        </Snackbar>
        }
      </Dialog>
    </Grid>
  );
};
export default AssetCards;
