import { Grid } from "@mui/material";
import { GoodMorning } from "../components/GoodMorning";
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
      <Grid item xs={12} sx={{ width: "100%" }}>
        <GoodMorning name={user.username} />
      </Grid>

      {user.role !== "admin" && (<Grid sx={{width:"50%"}}>
        <MarksCard />
      </Grid>)}
    </Grid>
  );
};
