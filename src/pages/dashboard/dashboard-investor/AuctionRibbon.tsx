import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";


interface ribbonProps {
  startTime: string;
  endTime: string;
}
export default function AuctionRibbon({ startTime, endTime }: ribbonProps) {
  const [timeHours, settimeHours] = useState("00");
  const [timeMins, settimeMins] = useState("00");
  const [timeSecs, settimeSecs] = useState("00");
  const [ribbonString, setRibbonString] = useState("");
  const [auctionStatus, setAuctionStatus] = useState(0); // 1 -> future, 0 -> running , -1 -> done already,  -2 -> auction yet to mark

  useEffect(() => {
    console.log("startTime", startTime, endTime)
    const startDateTime = new Date(parseInt(startTime) * 1000);
    const endEndTime = new Date(parseInt(endTime) * 1000);
    console.log(startDateTime, new Date(), startDateTime > new Date(), startDateTime < new Date())

    if (startDateTime > new Date()) { // then auction is to be started yet 
      setCountdown(startDateTime.getTime());
      setRibbonString("Auction Starting in : ")
      setAuctionStatus(1);
    } else if (endEndTime > new Date()) { // then auction is already started
      setCountdown(endEndTime.getTime());
      setRibbonString("Auction Ending in : ")
      setAuctionStatus(0);
    } else { // then auction is over already
      setAuctionStatus(-1);
      setRibbonString("Auction Ended on  : " + convertDateFormat(endEndTime));
    }
  }, [auctionStatus]);

  function getZeroPadded(num: number) {
    let numberAsString = num < 10 ? "0" + num : "" + num;
    return numberAsString;
  }

  function setCountdown(from: number) {
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      let difference = from - now;
      const hour = Math.floor(
        (difference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        );
        const mins = Math.floor((difference % (60 * 60 * 1000)) / (1000 * 60));
        let sec = Math.floor((difference % (60 * 1000)) / 1000);
       
        if(sec <= 0){
          // if future ? set current  : else it was running then set to past
          // auctionStatus == 1 ? setAuctionStatus(0) : setAuctionStatus(-1)
          clearInterval(interval);
          setAuctionStatus(auctionStatus - 1);
        }

      if (difference > 0) {
        settimeHours(getZeroPadded(hour));
        settimeMins(getZeroPadded(mins));
        settimeSecs(getZeroPadded(sec));
      }
    }, 1000);
  }

  function getRibbonClassName(){
    switch(auctionStatus){
      // future
      case 1:
        return " auction-timer-navyblue" // not sure of the colour classes
      case 0:
        return " auction-timer-green"
      case -1:
        return " auction-timer-orange"


    }
  }

  const convertDateFormat = (today: Date) => {
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var hrs =  today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    return mm + "/" + dd + "/" + yyyy + " " + getZeroPadded(hrs) + ":" + getZeroPadded(min) + ":" + getZeroPadded(sec);
  };

  // getRibbonClassName fucntion to be called here 
  // to get the colour of the ribbon based on the auction status.
  return (
    <div className="info-tab"> 
      <Grid container className={"auction-timer" + getRibbonClassName()}>
        <Grid item sm={12} xs={12}>
          <Typography variant="caption" gutterBottom component="div">
            &nbsp; { } <br></br>
            &nbsp;{ribbonString}
            {auctionStatus === -1
              ? ''
              : timeHours + ":" + timeMins + ":" + timeSecs}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
