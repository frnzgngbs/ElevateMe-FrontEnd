// MembersList.js
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

const MembersList = ({ roomId, onAddMembers }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                //TODO: Temporary token
                const token = "c9da795286ada1a817f0d070e5a0feb7ddaf6be1";
                console.log("Fetched token:", token);

                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                const response = await axios.get(`http://localhost:8000/api/rooms/${roomId}/members/`, {
                    headers: {
                        Authorization: `Token ${token}`, // Use the temporary token
                    },
                });

                console.log("Response data:", response.data);
                setMembers(response.data); // Adjust based on the actual response structure
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [roomId]); // Removed token from dependencies since it's hardcoded

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Current Members
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {members.map((member, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                backgroundColor: "rgba(24, 111, 101, 0.1)", // Same styling as suggested emails
                                borderRadius: "8px", // Rounded corners
                                marginBottom: "8px", // Space between member cards
                            }}
                        >
                            <ListItemText primary={member.member_email || member.member_name} /> {/* Change this to the correct property */}
                        </ListItem>
                    ))}
                </List>
            )}
            <Button
                variant="contained"
                onClick={onAddMembers}
                sx={{ mt: 2 }}
            >
                Add Members
            </Button>
        </Box>
    );
};

export default MembersList;
