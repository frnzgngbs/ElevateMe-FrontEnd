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
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import axios from "axios";

const MembersList = ({ roomId, onAddMembers, onClose }) => {
    const [membersEmails, setMembersEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembersEmails = async () => {
            try {
                let token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                const membersResponse = await axios.get(
                    `http://localhost:8000/api/rooms/${roomId}/members/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                const memberIds = membersResponse.data.map(
                    (member) => member.member_id
                );

                const emailsPromises = memberIds.map(async (memberId) => {
                    const userResponse = await axios.get(
                        `http://localhost:8000/api/user/${memberId}/`,
                        {
                            headers: {
                                Authorization: `Token ${token}`,
                            },
                        }
                    );
                    return userResponse.data.email;
                });

                const emails = await Promise.all(emailsPromises);
                setMembersEmails(emails);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembersEmails();
    }, [roomId]);

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ textAlign: "center", marginTop: -3 }}>
            Current Members
        </Typography>
        {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <CircularProgress />
            </Box>
        ) : error ? (
            <Typography color="error" align="center">
                {error}
            </Typography>
        ) : (
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <List>
                    {membersEmails.map((email, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                backgroundColor: "rgba(24, 111, 101, 0.1)",
                                borderRadius: "8px",
                                marginBottom: "8px",
                            }}
                        >
                            <ListItemText primary={email} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        )}
        {/* Pagination Dots */}
        <Box>
        <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'center', bottom: 55, left: 0, right:0, }}>
            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#187569', margin: '0 4px' }} />
            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ddd', margin: '0 4px' }} />
        </Box>
    
        {/* Buttons anchored at the bottom */}
        <Box
            sx={{
                position: 'absolute',
                bottom: 2, // 20px from the bottom
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <Button
                variant="contained"
                onClick={onClose}
                sx={{
                    borderRadius: "20px",
                    padding: "8px 24px",
                    backgroundColor: "#187569",
                    "&:hover": {
                        backgroundColor: "#145c56",
                    },
                }}
            >
                Close
            </Button>
            <Button
                variant="contained"
                onClick={onAddMembers}
                sx={{
                    borderRadius: "20px",
                    padding: "8px 24px",
                    backgroundColor: "#187569",
                    "&:hover": {
                        backgroundColor: "#145c56",
                    },
                }}
            >
                <AddIcon sx={{ marginRight: 1 }} />
                Add
            </Button>
        </Box>
        </Box>
    </Box>
    
    );
};

export default MembersList;
