import { Outlet } from "react-router-dom";
import { Box, Typography, Avatar, Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Button, ButtonGroup } from "@mui/material";
import {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const LeftTopBar = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    let role = "";
    if(user){
        role = user.role;
    };

    const buttons = [  
                    <Button onClick={() => {navigate("/dashboard")}} key="dashboard">Dashboard</Button>,
                    <Button onClick={() => {navigate("/markspage")}} key="markspage">MarksPage</Button>,
                  ];


    const capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }
    const name = capitalize(user.username);
    const time = new Date().getHours();
    let greeting = "Good morning";
    if(time > 12){
        greeting = "Good afternoon";
    } else if(time > 17){
        greeting = "Good evening"; 
    } else if(time > 20){
        greeting = "Good night";
    }

const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/") return null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event("storage"));
        navigate("/");
    };

    return (
        <Box sx={{display: "flex", height: "100vh"}}>
            <Box sx={{display:"flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #000042 0%, #090979 40%, #0284C7 100%)", width: "15%", color: "#fff"}}>
                <ButtonGroup variant="text" orientation="vertical" sx={{"& .MuiButtonGroup-grouped": {color: "#fff",borderColor: "#F6CE71"}}} >
                    {buttons}
                </ButtonGroup>
            </Box>
            <Box sx={{width:"85%", display: "flex", flexDirection: "column"}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px"}}>
                    <Box>
                        
                    </Box>
                    <IconButton color="primary"  sx={{ p: 0, "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": { color: "#F6CE71"}}} 
                    onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Avatar sx={{bgcolor: "#090979"}}>{name[0]}</Avatar>
                    </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>  
                                <ListItemIcon sx={{ color: "error.main" }}><LogoutIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                </Box>
                <Box sx={{display:"flex", flexDirection: "column", justifyContent: "center", padding: "8px 16px"}}>
                            <Typography variant="h4">
                                {greeting}, {name}
                            </Typography>
                            <Typography>
                                Hope you have a great day!! 👋
                            </Typography>
                </Box>
                <Box sx={{flex:1, p:3, overflow:"auto"}}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

