import React from "react";
import { Box, Card, CardContent, CardHeader, Button } from "@mui/material";
import { useMarks } from "../context/MarksContext";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./DataTable";

export const MarksCard = () => {
  const { marks } = useMarks();
  const nav = useNavigate();

  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
      <CardHeader title={"Marks"} />
      <Button onClick={() => {nav("/markspage")}}>View All</Button>
      </Box>
      <CardContent>
        {marks.length === 0 ? (
          <p>No Marks Found</p>
        ) : (
          <DataTable data={marks.slice(0, 3)} editable={false}></DataTable>
        )}
      </CardContent>
    </Card>
  );
};
