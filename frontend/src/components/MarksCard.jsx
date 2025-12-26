import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useMarks } from "../context/MarksContext";
import { DataTable } from "./DataTable";

export const MarksCard = () => {
  const { marks } = useMarks();

  return (
    <Card>
      <CardHeader title={"Marks"} />
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
