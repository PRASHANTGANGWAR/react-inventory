import React,{useEffect,useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuctionListItem from "./AuctionListItem";
import RestClient from "../../services/http-servies/axiosClient";
import Spinner from "../Spinner/Spinner";

interface AuctionData {
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





const AuctionList = ()=>{

    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const [auctionList, setAuctionList] = useState<AuctionData[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        fetchAuctionList();
    }, []);


    const fetchAuctionList = () => {
        const url = `auction/0`;
         setLoading(true);
        RestClient.get(url, {"queryParameter":"ALL"})
          .then((res: any) => {
            console.log(res);
            if (res.status === 200) {
              const dataList = res;
              let AuctionList = [];
    
              for (let key in dataList.data) {
                AuctionList.push({
                  applicationId: dataList.data[key].applicationId,
                  creatorAddress: dataList.data[key].creatorAddress,
                  startTime: dataList.data[key].startTime,
                  endTime: dataList.data[key].endTime,
                  reserve: dataList.data[key].reserve,
                  minIncrement: dataList.data[key].minIncrement,
                  auctionStatus: dataList.data[key].auctionStatus,
                  coaurl: dataList.data[key].coaurl,
                  coamd5Hash: dataList.data[key].coamd5Hash,
                  bids: dataList.data[key].bids
                });
              }
              console.log(AuctionList);
              setAuctionList(AuctionList);
              setLoading(false);
              setError("");
            } else {
              setLoading(false);
              setError("Something went wrong Couldn't fetch data");
            }
          })
          .catch(() => {
            setLoading(false);
            setError("Something went wrong Couldn't fetch data");
          });
      };

    return (
        <div>


          {
           
           isLoading? (<Spinner></Spinner>):(auctionList.map(item=>{
            return (
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                 AuctionID : {item.applicationId}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}> {item.auctionStatus} </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                
                  <AuctionListItem  
                
                  applicationId={item.applicationId}
                  creatorAddress={item.creatorAddress}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  reserve={item.reserve}
                  minIncrement={item.minIncrement}
                  auctionStatus={item.auctionStatus}
                  coaurl={item.coaurl}
                  coamd5Hash={item.coamd5Hash}
                  bids={item.bids}
                 
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
            )
        }))}  
       
      </div>

    );


}


export default AuctionList;