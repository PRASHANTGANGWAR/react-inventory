import React, { useEffect, useState } from "react";
import "./InvestercardComponents.css";
import {
  Button,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import AuctionRibbon from "./AuctionRibbon";
import CoaApproval from "./CoaApproval";
import CoaApprovalPop from "../../../components/DialogsPopups/CoaApprovalPop";

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
  unitName: string;
  nftStatus: string;  
  auction : any[];
  openBidding: () => void;
  getAssetId: (id: string) => void;
  getReserveAmount: (amount: string) => void;
  getMinAmount: (amount: string) => void;
  getAssetApplicationId: (id: string) => void;
}
const InvestorDashboardAssetCards = ({
  assetID,
  description,
  name,
  url,
  supportedDocs,
  unitName,
  // startTime,
  // endTime,
  // reserveAmount,
  // applicationID,
  auction,
  // minAmount,
  openBidding,
  getAssetId,
  getReserveAmount,
  getMinAmount,
  getAssetApplicationId,
}: PropAssetData) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [coaApprovalVisibility, setCoaApprovalVisibility] = useState(false);
  const open = Boolean(anchorEl);


  console.log("auction===>"+JSON.stringify(auction[0]));
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const openBiddingHandler = () => {
    console.log(auction)
    openBidding();
    getAssetId(assetID);
    getMinAmount(auction[0].reserve);
    getReserveAmount(auction[0].minIncrement);
    getAssetApplicationId(auction[0].applicationId);
  };

  const manageuploadCoaVisibility = ()=>{
    setCoaApprovalVisibility(!coaApprovalVisibility);
  }


  return (
    <Grid item xs={12} lg={3} md={3}>
      
      <Paper className="invester-card">   
      {(auction && auction.length > 0) ? 
        <AuctionRibbon startTime={auction[0].startTime} endTime={auction[0].endTime} /> : ''
      }             
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignContent="center" justifyContent="space-between">
            <Grid item xs={12} sm={10}>
              <Typography variant="subtitle1" className="cardTitle">
                {name}
              </Typography>
              <Link sx={{ pb: 1 }} underline="none" href="#" color="primary">
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
              {/* <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <RepeatOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  View Transaction Info
                </MenuItem>
              </Menu> */}
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
              <Grid xs={12} sm={12} sx={{ pt: 1}}>
                <Typography variant="caption" display="block" gutterBottom>
                  Discription :
                </Typography>
                <div className="card-discription">
                  <Typography variant="caption" paragraph>
                    {description}
                  </Typography>
                 
                  <CoaApproval  
                  
                  openDialouge={manageuploadCoaVisibility}
                  
                  />

              <CoaApprovalPop     
               open={coaApprovalVisibility}
               closeDialog={manageuploadCoaVisibility}
               appId={  auction[0] ? auction[0].applicationId: 0}
               coaUrl={ auction[0] ? auction[0].coaurl: ""}
               coaHash={auction[0] ? auction[0].coamd5Hash: ""}
               status={auction[0] ? auction[0].auctionStatus: ""}
              />
  
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
              <Grid xs={12} sm={6} sx={{ pt: 2 }}>
                <Tooltip title="Attachment" arrow>
                  <IconButton aria-label="add to favorites">
                    <a href={supportedDocs}  target="_blank" rel="noreferrer">
                   <AttachmentOutlinedIcon />
                   </a>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid xs={12} sm={6} sx={{ pt: 2 }} textAlign="right">
                <Button
                  variant="contained"
                  className="invester-bid-btn"
                  startIcon={<GavelOutlinedIcon />}
                  onClick={openBiddingHandler}
                >
                  Bid Asset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default InvestorDashboardAssetCards;
