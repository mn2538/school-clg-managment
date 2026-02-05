import { Grid } from "@mui/material";
import { MarksCard } from "../components/MarksCard";
import { useEffect, useState } from "react";


export const Dashboard = () => {

const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) return null;


  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {user.role !== "admin" && (<Grid sx={{width:"50%"}}>
        <MarksCard />
      </Grid>)}
    </Grid>
  );
};
