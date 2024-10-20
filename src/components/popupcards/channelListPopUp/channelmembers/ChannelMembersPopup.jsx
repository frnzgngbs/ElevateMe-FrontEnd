import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";
import MembersList from "./MemberListChannel";
import AddMember from "./AddMemberChannel";

const ChannelMembersPopup = ({ open, onClose, roomId, user, channelId}) => {
    const [currentPage, setCurrentPage] = useState("members"); 
    const [emailDatabase, setEmailDatabase] = useState([]);
    const [members, setMembers] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/user/");
                const emails = response.data.map((user) => user.email);
                setEmailDatabase(emails);
            } catch (error) {
                console.error("Failed to fetch emails:", error);
            }
        };

        fetchEmails();
    }, []);

    const handleAddMembers = async (addedEmails) => {
             try {
        let token = localStorage.getItem("token");

            const payload = { new_channel_member_emails: addedEmails, room_id: roomId };
            console.log(payload);
            console.log("CHannel:" + channelId)
            const response = await axios.patch(
                `http://localhost:8000/api/channels/${channelId}/`,
                payload,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (response.status === 201) {
                setSnackbar({
                    open: true,
                    message: "Successfully added to the roomsssss",
                    severity: "success",
                });

                setCurrentPage("members"); 
            }
        } catch (error) {
            let errorMessage = "An error occurred";
            if (error.response && error.response.status === 400) {
                errorMessage = "The member might already be in the channel";
            }
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    };

    const handleBackToMembers = () => {
        setCurrentPage("members");
    };

    const handleAddMembersPage = () => {
        setCurrentPage("addMember");
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-member-title"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 500,
                    height: 500,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                {currentPage === "members" ? (
                    <MembersList
                        members={members}
                        onAddMembers={handleAddMembersPage}
                        roomId={roomId}
                        onClose={onClose}
                        user={user}
                        channelId= {channelId}
                    />
                ) : (
                    <AddMember
                        emailDatabase={emailDatabase}
                        onSubmit={handleAddMembers}
                        onBack={handleBackToMembers}
                    />
                )}

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    );
};

export default ChannelMembersPopup;
