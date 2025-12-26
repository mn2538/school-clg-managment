import React from "react";
import { Grid } from "@mui/material";
import { GoodMorning } from "../components/GoodMorning";
import { MarksCard } from "../components/MarksCard";

export const Dashboard = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <GoodMorning name="Mohan" />
      </Grid>

      <Grid item xs={12}>
        <MarksCard />
      </Grid>
    </Grid>
  );
};
