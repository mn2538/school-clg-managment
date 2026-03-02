import React from "react";
import { Box, Card, CardContent, CardHeader, Button } from "@mui/material";
import { useMarks } from "../context/MarksContext";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./DataTable";

export const MarksCard = () => {
  const { marks } = useMarks();
  const nav = useNavigate();

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
        <CardHeader title={"Marks"} sx={{ padding: "16px 0" }} />
        <Button onClick={() => {nav("/markspage")}}>View All</Button>
      </Box>
      <CardContent sx={{ overflow: 'auto' }}>
        {marks.length === 0 ? (
          <p>No Marks Found</p>
        ) : (
          <DataTable data={marks.slice(0, 3)} editable={false}></DataTable>
        )}
      </CardContent>
    </Card>
  );
};