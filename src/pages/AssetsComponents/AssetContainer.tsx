import React, { useEffect, useState } from "react";
import "./assetsComponents.css";
import { Alert, Box, Container, Grid } from "@mui/material";
import CreateAsstes from "./CreateAsstes";
import AssetCards from "./AssetCards";
import CreateAssetModal from "../../components/create-asset/CreateAssetModal";
import RestClient from "../../services/http-servies/axiosClient";
import Spinner from "../Spinner/Spinner";
import Bidding from "../../components/bidding/Bidding";
import ViewMoreInfo from "../../components/view-transaction-info/ViewMoreInfo";
import AuthService from "../../services/auth/authService";
import AddLoanModal from "../LoanPrecess/AddLoanModal";
import LoanContainer from "../LoanPrecess/LoanContainer";
import Fileloan from "../../components/loan/FileLoan"
import BidderSelection from "../../components/DialogsPopups/BidderSelection";
import UploadCoa from "../../components/DialogsPopups/UploadCoa";

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
  unitName: string;
  url: string;
  nftStatus: string;
  auction: [
    //   {
  //   startTime: string,
  //   endTime: string,
  //   minIncrement: string,
  // }
  ];
}

export default function AssetContainer() {
  const authService = new AuthService();
  const { accountAddress = "" } = authService.decodeToken();
  const [visibiltyDialouge, setvisibiltyDialouge] = useState(false);
  
  const [asesetID, setAsesetID] = useState("");
  const [visibiltyBiddingDialouge, setVisibiltyBiddingDialouge] =
    useState(false);
  const [allAuctions, setAllAuctions] = useState<any>();
  const [visibileMoreInfo, setvisibileMoreInfo] = useState(false);
  const [bidSelectionVisibility, setBidSelectionVisibility] = useState(false);
  const [uploadCoaVisibility, setUploadCoaVisibility] = useState(false);
  const [loanVisibility, setLoanVisibility] = useState(false);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [assetList, setAssetList] = useState<AssetData[]>([]);
  const [error, setError] = useState<string>("");

  const changeVisibilty = () => {
    setvisibiltyDialouge(!visibiltyDialouge);
  };



  const manageBiddignHandler = () => {
    setVisibiltyBiddingDialouge(!visibiltyBiddingDialouge);
  };

  const manageViewMoreHandler = () => {
    setvisibileMoreInfo(!visibileMoreInfo);
  };

  const manageBidSelectionVisibility = ()=>{
    setBidSelectionVisibility(!bidSelectionVisibility);
  }

  const manageuploadCoaVisibility = ()=>{
    setUploadCoaVisibility(!uploadCoaVisibility);
  }

  const manageLoanVisibility = ()=>{
    setLoanVisibility(!loanVisibility);
  }


  useEffect(() => {
    fetchAsset();
  }, []);

  const fetchAsset = () => {
    const url = `asset/` + accountAddress;
    setLoading(true);
    RestClient.get(url)
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          const dataList = res;
          let assetList = [];

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
              auction: dataList.data[key].auction,
              // auction: {
              //   startTime: dataList.data[key].auction?.startTime,
              //   endTime: dataList.data[key].auction?.endtime,
              //   minIncrement: dataList.data[key].auction?.minIncrement,
              // }
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
  const getAllAuctionHandler = (allAuction: any[]) => {
    setAllAuctions(allAuction);
  };
  const getAssetIDHandle = (assetID: string) => {
    setAsesetID(assetID);
  };
  return (
    <>
      <Container className="buy-container">
        <Box className="mt-85">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <CreateAsstes
                openDialouge={changeVisibilty}
                assetCount={assetList.length}
              />
          
              <Bidding
                open={visibiltyBiddingDialouge}
                closeDialog={manageBiddignHandler}
                assetID={asesetID}
                refresh={fetchAsset}
              />
              <ViewMoreInfo
                open={visibileMoreInfo}
                closeDialog={manageViewMoreHandler}
                allAuctions={allAuctions}
              />
              <CreateAssetModal
                open={visibiltyDialouge}
                closeDialog={changeVisibilty}
                refreshList={fetchAsset}
              />

              <BidderSelection  
               open={bidSelectionVisibility}
               closeDialog={manageBidSelectionVisibility}
               allAuctions={allAuctions}
               assetID={asesetID}
              />

              <UploadCoa 
               open={uploadCoaVisibility}
               closeDialog={manageuploadCoaVisibility}
               allAuctions={allAuctions}
              />
              <Fileloan
                open={loanVisibility}
                closeDialog={manageLoanVisibility}
                assetID={asesetID}
                refresh={fetchAsset}
                auction={allAuctions}
              />


            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          sx={{ mt: 1 }}
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 3, md: 12, lg: 6 }}
        >
          {error ? (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          ) : (
            ""
          )}
          {isLoading ? (
            <Spinner></Spinner>
          ) : assetList.length > 0 ? (
            assetList.map((asset: AssetData) => (
              <AssetCards
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
                url={asset.url}
                description={asset.description}
                auction={asset.auction?.filter((item: any) => {
                  return item.auctionStatus === "OPEN";
                })}
                openBidding={manageBiddignHandler}
               
                openViewMoreInfo={manageViewMoreHandler}
                getAssetID={getAssetIDHandle}
                nftStatus={asset.nftStatus}
                allAuctions={asset.auction}
                getAllAuctions={getAllAuctionHandler}
                openBidSelector={manageBidSelectionVisibility}
                openUploadCoa={manageuploadCoaVisibility}
                openLoan={manageLoanVisibility}
              />
            ))
          ) : error ? (
            ""
          ) : (
            <Alert variant="filled" severity="warning" sx={{ m: 3 }}>
              This account doesn't have any created assets
            </Alert>
          )}
        </Grid>
      </Container>
    </>
  );
}
