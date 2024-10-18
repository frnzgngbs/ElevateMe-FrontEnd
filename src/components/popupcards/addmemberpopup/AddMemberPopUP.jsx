import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Modal,
    List,
    ListItem,
    ListItemText,
    Chip,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";

const AddMemberPopup = ({ open, onClose, roomId }) => {
    const [emailInput, setEmailInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [addedEmails, setAddedEmails] = useState([]);
    const [emailDatabase, setEmailDatabase] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // or "error"
    });

    // Fetch emails from the database on component mount
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

    // Handle input changes for email input
    const handleInputChange = (e) => {
        const input = e.target.value;
        setEmailInput(input);

        const lastTypedEmail = input.split(",").pop().trim();
        if (lastTypedEmail) {
            updateSuggestions(lastTypedEmail);
        } else {
            setSuggestions([]);
        }
    };

    // Update suggestions based on the input and added emails
    const updateSuggestions = (query) => {
        const filteredSuggestions = emailDatabase
            .filter((email) => email.toLowerCase().includes(query.toLowerCase()))
            .filter((email) => !addedEmails.includes(email));

        setSuggestions(filteredSuggestions);
    };

    // Add a selected email from suggestions
    const handleAddEmail = (selectedEmail) => {
        addEmailToTags(selectedEmail);
        setEmailInput("");
        setSuggestions([]);
    };

    // Handle adding emails to tags
    const addEmailToTags = (email) => {
        if (email && !addedEmails.includes(email)) {
            setAddedEmails((prev) => [...prev, email]);
        }
    };

    // Handle deleting an email tag
    const handleDeleteEmail = (emailToDelete) => {
        setAddedEmails(addedEmails.filter((email) => email !== emailToDelete));
    };

    // Handle key press (e.g., Enter) in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && emailInput.trim()) {
            addEmailToTags(emailInput.trim());
            setEmailInput("");
        }
    };

    // Handle the submission of emails
    const handleSubmit = async () => {
        const token = "c9da795286ada1a817f0d070e5a0feb7ddaf6be1";

        try {
            const payload = {
                new_room_members: addedEmails,
            };

            const response = await axios.patch(
                `http://localhost:8000/api/rooms/${roomId}/`,
                payload,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                setSnackbar({
                    open: true,
                    message: "Successfully added to the room",
                    severity: "success",
                });
                onClose(); 
                setAddedEmails([]);
            }
        } catch (error) {
            let errorMessage = "This member might be already in the room";
            if (error.response && error.response.status === 400) {
                errorMessage = "The useremail might be already a member in this room";
            }
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setEmailInput("");
        }
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
                <Typography id="add-member-title" variant="h6" gutterBottom>
                    Add Members
                </Typography>

                <TextField
                    label="Enter Email(s)"
                    variant="outlined"
                    fullWidth
                    value={emailInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Selected Email Tags
                </Typography>
                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{
                        mb: 2,
                        height: 80,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {addedEmails.length > 0 ? (
                        addedEmails.map((email, index) => (
                            <Chip
                                key={index}
                                label={email}
                                onDelete={() => handleDeleteEmail(email)}
                                sx={{
                                    backgroundColor: "rgba(24, 111, 101, 0.1)",
                                    color: "rgba(24, 111, 101, 0.8)",
                                    border: "1px solid rgba(24, 111, 101, 0.3)",
                                }}
                            />
                        ))
                    ) : (
                        ["sample@email.com", "anothersample@gmail.com"].map((sampleEmail, index) => (
                            <Chip
                                key={index}
                                label={sampleEmail}
                                sx={{
                                    backgroundColor: "rgba(24, 111, 101, 0.05)",
                                    color: "rgba(24, 111, 101, 0.5)",
                                    border: "1px solid rgba(24, 111, 101, 0.1)",
                                    fontStyle: "italic",
                                }}
                            />
                        ))
                    )}
                </Stack>

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Suggested Emails
                </Typography>

                <List
                    sx={{
                        height: 100,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((email, index) => (
                            <ListItem button key={index} onClick={() => handleAddEmail(email)}>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))
                    ) : (
                        <Typography
                            sx={{
                                color: "rgba(24, 111, 101, 0.4)",
                                fontStyle: "italic",
                                ml: 2,
                            }}
                        >
                            suggestion@example.com
                        </Typography>
                    )}
                </List>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            backgroundColor: "#186F65",
                            color: "white",
                            borderRadius: 5,
                            width: "100px",
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "#186F65",
                            color: "white",
                            borderRadius: 5,
                            width: "100px",
                        }}
                    >
                        Add
                    </Button>
                </Box>

                {/* Snackbar for displaying messages */}
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
