import { Card, CardContent, Typography } from "@mui/material";

const ChannelCard = ({ title, onClick }) => {
    return (
        <Card
            sx={{ borderRadius: 4, boxShadow: 2, cursor: "pointer" }} // Added cursor pointer for better UX
            onClick={onClick} // Handle click to navigate to the channel page
        >
            <CardContent>
                <Typography variant="h6">{title}</Typography>
            </CardContent>
        </Card>
    );
};

export default ChannelCard;
