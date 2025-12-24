import React from "react";
import { Grid, Card, CardContent, StatCard, Typography } from '@mui/material';
import {GoodMorning} from '../components/GoodMorning';

export const Dashboard = () => {
return (
    <Grid container spacing={3}>
        <GoodMorning name="Mohan"/>
    </Grid>
)
}