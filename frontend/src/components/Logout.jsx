import React from "react";
import {Button} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useMarks } from "../context/MarksContext";

export const Logout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setMarks } = useMarks();

    if (location.pathname === "/") return null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event("storage"));
        setMarks([]);
        navigate("/");
    };

    return (
        <Button 
            variant="contained" 
            color="error"
            sx={{
                position: "fixed", 
                bottom: 20, 
                right: 20, 
                zIndex: 9999,
                padding: "8px 16px",
                fontSize: "14px"
            }} 
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}