
import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Chip,
    Stack,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

const AddMember = ({ emailDatabase, onSubmit, onBack }) => {
    const [emailInput, setEmailInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [addedEmails, setAddedEmails] = useState([]);

    // Update suggestions based on the input
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

    const updateSuggestions = (query) => {
        const filteredSuggestions = emailDatabase
            .filter((email) => email.toLowerCase().includes(query.toLowerCase()))
            .filter((email) => !addedEmails.includes(email));

        setSuggestions(filteredSuggestions);
    };

    const handleAddEmail = (selectedEmail) => {
        if (selectedEmail && !addedEmails.includes(selectedEmail)) {
            setAddedEmails((prev) => [...prev, selectedEmail]);
        }
        setEmailInput("");
        setSuggestions([]);
    };

    const handleDeleteEmail = (emailToDelete) => {
        setAddedEmails(addedEmails.filter((email) => email !== emailToDelete));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && emailInput.trim()) {
            handleAddEmail(emailInput.trim());
        }
    };

    const handleSubmit = () => {
        if (addedEmails.length > 0) {
            onSubmit(addedEmails);
            setAddedEmails([]);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
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
                    height: 60,
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
                                backgroundColor: "rgba(24, 111, 101, 0.1)", // Match this color with the suggested emails
                                color: "rgba(24, 111, 101, 0.8)",
                                border: "1px solid rgba(24, 111, 101, 0.3)",
                            }}
                        />
                    ))
                ) : (
                    // Placeholder emails
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
                    height: 120,
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {suggestions.length > 0 ? (
                    suggestions.map((email, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => handleAddEmail(email)}
                            sx={{
                                backgroundColor: "rgba(24, 111, 101, 0.1)", // Match this color with email tags
                                borderRadius: "8px", // Rounded corners
                                marginBottom: "8px", // Space between suggested email cards
                                "&:hover": {
                                    backgroundColor: "rgba(24, 111, 101, 0.2)", // Darker on hover
                                },
                            }}
                        >
                            <ListItemText primary={email} />
                        </ListItem>
                    ))
                ) : (
                    // Placeholder for no suggestions
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography
                                    sx={{
                                        color: "rgba(24, 111, 101, 0.4)",
                                        fontStyle: "italic",
                                    }}
                                >
                                    No suggestions available
                                </Typography>
                            }
                        />
                    </ListItem>
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
                    onClick={onBack}
                    sx={{
                        backgroundColor: "#186F65",
                        color: "white",
                        borderRadius: 5,
                        width: "100px",
                    }}
                >
                    Back
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
        </Box>
    );
};

export default AddMember;
