import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CoaApproval from "../dashboard/dashboard-investor/CoaApproval";

import CoaApprovalPop from "../../components/DialogsPopups/CoaApprovalPop";


interface auctionListItem {
    applicationId: number;
    creatorAddress: string;
    startTime: number;
    endTime: number;
    reserve: number;
    minIncrement: number;
    auctionStatus: string;
    coaurl: string;
    coamd5Hash: string;
    bids: []
}


const AuctionListItem=(
    {
        applicationId,
        creatorAddress,
        startTime,
        endTime,
        reserve,
        minIncrement,
        auctionStatus,
        coaurl,
        coamd5Hash,
        bids
       

    } : auctionListItem

)=>{

    console.log("coaurl==>",coaurl);
    const [coaApprovalVisibility, setCoaApprovalVisibility] = useState(false);


    const manageuploadCoaVisibility = ()=>{
        setCoaApprovalVisibility(!coaApprovalVisibility);
      }

    return (
        <Card >
          <CardMedia
            component="img"
            height="140"
            image={coaurl}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             Auction Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <b>Creator Address</b> : {creatorAddress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <b>Start Time</b> : {startTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <b>End Time</b> : {endTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <b>Reserve</b> : {reserve}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <b>minIncrement</b> : {minIncrement}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <b>Total Bids</b> : {bids.length}
            </Typography>
            
          </CardContent>
          <CardActions>
          <CoaApproval  
                  
                  openDialouge={manageuploadCoaVisibility}
                  
                  />

              <CoaApprovalPop     
               open={coaApprovalVisibility}
               closeDialog={manageuploadCoaVisibility}
               appId={ applicationId?applicationId.toString() :`0`}
               coaUrl={coaurl}
               coaHash={coamd5Hash}
               status={auctionStatus}
              />
          </CardActions>
        </Card>
      );



}


export default AuctionListItem;