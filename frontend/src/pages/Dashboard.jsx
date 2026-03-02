import { Grid } from "@mui/material";
import { MarksCard } from "../components/MarksCard";
import { ScheduleCard } from "../components/ScheduleCard";
import { useEffect, useState } from "react";

export const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) return null;

    return (
      <Grid
        container
        spacing={3}
        sx={{ padding: 3 }}
        wrap="nowrap"
      >
        {user.role !== "admin" && (
          <>
            <Grid item sx={{ flex: 1, display: 'flex', minWidth: 0 }}>
              <MarksCard />
            </Grid>
            <Grid item sx={{ flex: 1, display: 'flex', minWidth: 0 }}>
              <ScheduleCard />
            </Grid>
          </>
        )}
      </Grid>
    );
};