import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box } from "@mui/material";

const SIDEBAR_WIDTH = 260;

export const SideBar = () => {
    return (
        <Drawer variant="permanent" sx={{width: SIDEBAR_WIDTH, boxSizing: "border-box", borderRight: "1px solid #eee" }}>

        </Drawer>
    )
}