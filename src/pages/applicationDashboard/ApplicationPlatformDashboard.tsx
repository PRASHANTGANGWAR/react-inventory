
import React,{useEffect,useState } from 'react'
import './app-platformDashboard.css'
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { deepOrange } from '@mui/material/colors';
import AuctionList from './AuctionList';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RestClient from "../../services/http-servies/axiosClient";
import AuthService from "../../services/auth/authService";


export default function ApplicationPlatformDashboard() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const authService = new AuthService();
    const { firstName = "", lastName="",  } = authService.decodeToken();
    const open = Boolean(anchorEl);
    const [balance, setBalance] = useState(0);
  
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleLogOut = () => {
        authService.removeToken();
        navigate("/");
      };
    
      useEffect(() => {
        fetchBalance();
      }, []);
    
      const fetchBalance = () => {  
        const { accountAddress = '' } = authService.decodeToken();
        const url = `getAlgoBalance/${accountAddress}`;
       
        RestClient.get(url)
          .then((res: any) => {
            console.log(res);
            if (res.status === 200) {
              console.log(res.data);
              setBalance(res.data/1000000);
            } 
          })
      };

    return (
        <><Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ backgroundColor: deepOrange[300] }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <StorefrontOutlinedIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Application Platform Dashboard
                    </Typography>
                   
                     <IconButton
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                <PersonOutlineOutlinedIcon />
              </Avatar>
            </IconButton>
           
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> {firstName + ' ' + lastName}
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <MonetizationOnOutlinedIcon fontSize="small" />
                </ListItemIcon>
                 {balance}
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
              
                </Toolbar>
            </AppBar>
           
        </Box>
        <Container className="platform-dasboard-container">
            <p  ></p>
          
        <h2 style={{ paddingBottom:"50px"}}>Platform Dashboard</h2>
        <Container>
        <AuctionList  />

        </Container>
        
        </Container></>
    )
}
