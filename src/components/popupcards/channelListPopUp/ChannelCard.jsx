import React from "react";
import { Card, CardContent, IconButton, Typography, Box } from "@mui/material";
import { Delete, GroupAdd } from "@mui/icons-material";

const ChannelCard = ({ title, onClick, onDelete, onAddMember }) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                
                cursor: "pointer",
                width:"100%",
                position: "relative",
                display: "flex", // Arrange content in a row
                alignItems: "center", // Center vertically
                padding: "8px 16px", // Add padding inside the card
                justifyContent: "space-between", // Space between title and icons
                backgroundColor: "rgba(24, 111, 101, 0.1)",
                boxShadow: 0,
            }}
            onClick={onClick} // Handle click to navigate to the channel page
        >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {title}
            </Typography>
            <Box>
                {/* Add Member Icon */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click
                        onAddMember();
                    }}
                    sx={{
                        color: "rgba(0, 0, 0, 0.54)",
                        "&:hover": {
                            color: "#187569",
                        },
                    }}
                >
                    <GroupAdd />
                </IconButton>

                {/* Delete Icon */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click
                        onDelete();
                    }}
                    sx={{
                        color: "rgba(0, 0, 0, 0.54)",
                        "&:hover": {
                            color: "#d32f2f",
                        },
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>
        </Card>
    );
};

export default ChannelCard;
