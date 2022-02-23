import React, { useEffect, useState } from "react";
import "./InvestercardComponents.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
import InvestorDashboardAssetCards from "./InvestorDashboardAssetCards";
import InvesterBidAssetModal from "./InvesterBidAssetModal";
import RestClient from "../../../services/http-servies/axiosClient";
import Spinner from "../../Spinner/Spinner";
import AddLoanModal from "../../LoanPrecess/AddLoanModal";
import LoanContainer from "../../LoanPrecess/LoanContainer";


interface AssetData {
  assetID: string;
  total: string;
  metaDataHash: string;
  description: string;
  name: string;
  manager: string;
  balance: string;
  supportedDocs: string;
  creator: string;
  unitName:string;
  url : string;
  nftStatus : string;
  auction: [
  //   {
  //   startTime: string,
  //   endTime: string,
  //   minIncrement: string,
  //   reserve : string,
  //   applicationId : string
  // }
]
}
export default function InvesterDashboardContainer() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [visibiltyBiddingDialouge, setVisibiltyBiddingDialouge] =
    useState(false);
  const [assetList, setAssetList] = useState<AssetData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [reserveAmount, setreserveAmount] = useState('');
  const [assetID, setAssetID] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [appIdHandle, setAppIdHandle] = useState('');
  const manageBiddignHandler = () => {
    setVisibiltyBiddingDialouge(!visibiltyBiddingDialouge);
  };
  useEffect(() => {
    fetchAsset(); 
  }, []);

  const fetchAsset = () => {  
    const url = 'asset/auctioned';
    setLoading(true);
    RestClient.get(url)
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          const dataList = res;
          let assetList = [];
          console.log(dataList);
          for (let key in dataList.data) {
            assetList.push({
              name: dataList.data[key].name,
              url: dataList.data[key].url,
              assetID: dataList.data[key].assetId,
              description: dataList.data[key].description,
              balance: dataList.data[key].balance,
              metaDataHash: dataList.data[key].metaDataHash,
              supportedDocs: dataList.data[key].supportedDocs,
              manager: dataList.data[key].manager,
              total: dataList.data[key].total,
              creator: dataList.data[key].creator,
              unitName: dataList.data[key].unitName,
              nftStatus: dataList.data[key].nftStatus,
              auction: dataList.data[key].auction
            });
          } 
         
          console.log(assetList);
          setAssetList(assetList);
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
const assetIDHandle = (id :string) => {
  setAssetID(id);
}
const getReserveAmountHandle = (amount :string) => {
  setreserveAmount(amount);
}
const getMinAmountHandle = (amount :string) => {
  setMinAmount(amount);
}
const getAssetApplicationIdHandle = (amount :string) => {
  setAppIdHandle(amount);
}

const [loanVisibiltyDialouge, setLoanVisibiltyDialouge] = useState(false);

const changeVisibiltyLoan = () => {
  setLoanVisibiltyDialouge(!loanVisibiltyDialouge);
};
const [age, setAge] = React.useState('');

const handleChange = (event: SelectChangeEvent) => {
  setAge(event.target.value as string);
};
  return (
    <Container className="invester-container" sx={{ mt: 2 }}>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={10} sx={{ mb: 1 }}>
            <Typography variant="h6">
              Bidding Assets ({assetList.length})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ mb: 1 }} textAlign='right'>
            <LoanContainer openDialouge={changeVisibiltyLoan} />            
          </Grid>
        </Grid>
        <Divider />
      </Box>
      <InvesterBidAssetModal
          open={visibiltyBiddingDialouge}
          closeDialog={manageBiddignHandler}
          assetID={assetID}
          reserveAmount={reserveAmount}
          applicationId = {appIdHandle}
          minAmount={minAmount}
        />
         <AddLoanModal
                open={loanVisibiltyDialouge}
                closeDialog={changeVisibiltyLoan}
                
              />

      <Grid
        container
        sx={{ mt: 2 }}
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 3, md: 1, lg: 5 }}
      >
             {isLoading ? (
            <Spinner></Spinner>
          ) : assetList.length > 0 ? (

        assetList.map((asset : AssetData)=> {
          return  <InvestorDashboardAssetCards
          key={String(asset.assetID)}
          name={asset.name}
          unitName={asset.unitName}
          supportedDocs={asset.supportedDocs}
          assetID={asset.assetID}
          total={asset.total}
          metaData={asset.metaDataHash}
          manager={asset.manager}
          balance={asset.balance}
          creator={asset.creator}
          // applicationID={asset.auction[0].applicationId}
          url={asset.url}
          description={asset.description}             
          nftStatus = {asset.nftStatus}
          // startTime = {asset.auction[0].startTime}
          // endTime = {asset.auction[0].endTime}
          auction = {asset.auction.filter((item: any) => {
            return item.auctionStatus !== "CLOSED" 
          })}
          // reserveAmount={asset.auction[0].reserve}
          // minAmount={asset.auction[0].minIncrement}
          openBidding={manageBiddignHandler}
          getAssetId={assetIDHandle}
          getReserveAmount= {getReserveAmountHandle}
          getAssetApplicationId= {getAssetApplicationIdHandle}
          getMinAmount = {getMinAmountHandle}
        />
        })
          ) : error ? ( 
            <Alert variant='filled' severity="error" sx={{ m: 3 }}>
              Something went wrong
            </Alert>
          ) : (
            <Alert variant='filled' severity="warning" sx={{ m: 3 }}>
              This account doesn't have any created assets
            </Alert>
          )}
              
      </Grid>
    </Container>
  );
}
