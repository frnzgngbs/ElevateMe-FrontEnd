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
                display: "flex",
                alignItems: "center", 
                padding: "8px 16px", 
                justifyContent: "space-between", 
                backgroundColor: "rgba(24, 111, 101, 0.1)",
                boxShadow: 0,
            }}
            onClick={onClick}
        >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {title}
            </Typography>
            <Box>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation(); 
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

                <IconButton
                    onClick={(e) => {
                        e.stopPropagation(); 
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
