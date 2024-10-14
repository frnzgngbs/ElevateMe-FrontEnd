// components/ChannelCard.js
import { Card, CardContent, Typography } from "@mui/material";

const ChannelCard = ({ title }) => {
    return (
        <Card sx={{ borderRadius: 4, boxShadow: 2 }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
            </CardContent>
        </Card>
    );
};

export default ChannelCard;
