import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import DashboardInvestor from "../../pages/dashboard/dashboard-investor/dashboardInvestor";
import Homepage from "../home-page/homepage";
import AuthService from "../../services/auth/authService";
import Userlogin from "../login/Userlogin";
import PageNotFound from "../page-not-found/PageNotFound";
import NewUserRegistration from "../registration/NewUserRegistration";
import ApplicationPlatformDashboard from "../../pages/applicationDashboard/ApplicationPlatformDashboard";
import ForgotPassword from "../registration/forgot";
import AddUser from "../user/addUser";
import ListUser from "../user/userlist";
import Profile from "./../profile/Profile"


export default function RoutesComponent() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Userlogin />}/>            
          <Route path="/" element={<Homepage />}/>   
          <Route path="/dashboard" element={ <Dashboard />}/>                
          <Route path="/updateInventory" element={ <DashboardInvestor />}/> 
          <Route path="/app-dashboard" element={ <ApplicationPlatformDashboard />}/> 
          <Route path="/addUser" element={ <AddUser />}/> 
          <Route path="/listUser" element={ <ListUser />}/> 
          <Route path="/signup" element={<NewUserRegistration />}/>
          <Route path="/forgot" element={<ForgotPassword />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path='*'  element={<PageNotFound/>} />                  
        </Routes>
      </BrowserRouter>
    </div>
  );
}


