import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";
import MembersList from "./MembersList";
import AddMember from "./AddMember";

const AddMemberPopup = ({ open, onClose, roomId }) => {
    const [currentPage, setCurrentPage] = useState("members"); // "members" or "addMember"
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
        const token = "c9da795286ada1a817f0d070e5a0feb7ddaf6be1";
        try {
            const payload = { new_room_members: addedEmails };
            const response = await axios.patch(
                `http://localhost:8000/api/rooms/${roomId}/`,
                payload,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (response.status === 201) {
                setSnackbar({
                    open: true,
                    message: "Successfully added to the room",
                    severity: "success",
                });
                // Optionally, update the members list here
                setCurrentPage("members"); // Go back to members list
            }
        } catch (error) {
            let errorMessage = "An error occurred";
            if (error.response && error.response.status === 400) {
                errorMessage = "The member might already be in the room";
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

    // Handle Snackbar close
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

export default AddMemberPopup;
