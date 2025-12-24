import React from 'react';
import { Box, Card, CardContent, Typography} from '@mui/material';

export const GoodMorning = ({name}) => {
return (
<Box sx={{width:"100%", textAlign:"left", margin:3}}>
<Card elevation={3} sx={{ borderRadius: 3, width: "100%", background:"#F5E7C6" }}>
  <CardContent>
    <Typography variant='h4'>Hello {name}, Hope you have a great day!!</Typography>
  </CardContent>
</Card>
</Box>
);
};