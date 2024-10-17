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
} from "@mui/material";
import axios from "axios";

const AddMemberPopup = ({ open, onClose }) => {
    const [emailInput, setEmailInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [addedEmails, setAddedEmails] = useState([]);
    const [emailDatabase, setEmailDatabase] = useState([]);

    // Fetch emails from the database on component mount
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/user/");
                const emails = response.data.map(user => user.email);
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

        // Get the last entered email part for suggestions
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
            .filter(email => 
                email.toLowerCase().includes(query.toLowerCase())
            )
            .filter(email => !addedEmails.includes(email)); // Exclude already added emails

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
            setAddedEmails(prev => [...prev, email]);
        }
    };

    // Handle deleting an email tag
    const handleDeleteEmail = (emailToDelete) => {
        setAddedEmails(addedEmails.filter(email => email !== emailToDelete));
    };

    // Handle key press (e.g., Enter) in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && emailInput.trim()) {
            addEmailToTags(emailInput.trim());
            setEmailInput("");
        }
    };

    // Handle the submission of emails
    const handleSubmit = () => {
        console.log("Added Emails:", addedEmails);
        onClose();
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
                    height: 500, // Adjusted height for a taller modal
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

                {/* Display label and email tags */}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Selected Email Tags
                </Typography>
                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{
                        mb: 2,
                        height: 80, // Fixed height for the tags section
                        overflowY: "auto", // Make it scrollable
                        "&::-webkit-scrollbar": { display: "none" }, // Hide the scrollbar for webkit browsers
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
                        // Display sample email tags in a lighter style
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

                {/* Display suggestions label */}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Suggested Emails
                </Typography>
                
                {/* Display suggestions */}
                <List
                    sx={{
                        height: 100, // Fixed height for the suggestions section
                        overflowY: "auto", // Make it scrollable
                        "&::-webkit-scrollbar": { display: "none" }, // Hide the scrollbar for webkit browsers
                    }}
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((email, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => handleAddEmail(email)}
                            >
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
                        gap: 2, // Space between the buttons
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
                            borderRadius:5,
                            width: "100px",
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddMemberPopup;
