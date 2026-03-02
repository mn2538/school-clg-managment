import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const ScheduleCard = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const user = JSON.parse(localStorage.getItem("user"));
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/view-schedule/${user.id}`,
                    { headers : {Authorization: `Bearer ${token}` }}
                );
                setSchedule(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchdata();
    }, []);

    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardHeader title={"Schedule"} sx={{ paddingLeft: 2 }} />
            <CardContent sx={{ overflow: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Class 1</TableCell>
                                <TableCell>Class 2</TableCell>
                                <TableCell>Class 3</TableCell>
                                <TableCell>Class 4</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {schedule.map((item) => (
                                    <TableCell key={item.id}>
                                        {item.class_id}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {schedule.map((item) => (
                                    <TableCell key={`start-${item.id}`}>
                                        {item.start_time} 
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}