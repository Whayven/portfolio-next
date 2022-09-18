import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard({ infoObject }) {
    return (
        <Card sx={{ minWidth: 275 }} style={{ marginBlockStart: '10px', marginBlockEnd: '10px', backgroundColor: '#E7F6F2'}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {infoObject?.attributes?.Title}
                </Typography>
                <Typography variant="body2">
                    {infoObject?.attributes?.Description}
                </Typography>
            </CardContent>
        </Card>
    );
}
