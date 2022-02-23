import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppicationFooter from "../../../components/app-footer/Footer";
import ButtonAppBar from "../../../components/app-header/Header";
import AuthService from "../../../services/auth/authService";
import InvesterDashboardContainer from "./InvesterDashboardContainer";
import InvestorDashboardAssetCards from "./InvestorDashboardAssetCards";
import UpdateInventory from "../../../components/update-inventory/UpdateInventory";

const authService = new AuthService();
export default function DashboardInvestor() {
  // const { userType = "" } = authService.decodeToken();
  const navigate = useNavigate();
  // console.log(userType);
  // useEffect(() => {
  //   if (authService.validateToken()) {
  //     if (userType !== "INVESTOR") navigate("/dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);
  
  return (
    <div>
      <ButtonAppBar />
      <UpdateInventory/>
      <AppicationFooter />
    </div>
  );
}
