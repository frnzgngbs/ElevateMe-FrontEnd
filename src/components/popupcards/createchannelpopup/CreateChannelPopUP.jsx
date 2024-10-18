import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const CreateChannelPopup = ({ open, onClose, roomId, onChannelCreated }) => {
    const [channelName, setChannelName] = useState("");
    const [members, setMembers] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleCreate = async () => {
        const memberEmails = members.split(',').map(email => email.trim());
        const payload = {
            channel_name: channelName,
            room_id: roomId,
            channel_members: memberEmails,
        };

        try {
            setLoading(true);
            //TODO:Token
            const token = "c9da795286ada1a817f0d070e5a0feb7ddaf6be1"; // Replace this with your dynamic token logic if necessary

            const response = await axios.post(`http://localhost:8000/api/channels/`, payload, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Channel created successfully:", response.data);

            // Call the onChannelCreated callback with the new channel data (if needed to update UI)
            onChannelCreated(response.data);

            // Show success snackbar
            setSnackbar({
                open: true,
                message: "Channel created successfully!",
                severity: "success",
            });

            // Reset fields and close the popup after successful creation
            setChannelName("");
            setMembers("");
            onClose();
        } catch (error) {
            console.error("Error creating channel:", error);
            if (error.response) {
                console.error("Error details:", error.response.data);
            }

            // Show error snackbar
            setSnackbar({
                open: true,
                message: "Error creating channel. Please try again.",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        width: '400px',
                        padding: '16px',
                    },
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Create a New Channel
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Channel Name"
                        fullWidth
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        sx={{
                            borderRadius: 4,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                            },
                        }}
                    />
                    <TextField
                        label="Members"
                        fullWidth
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        helperText="Enter member emails separated by commas"
                        sx={{
                            borderRadius: 4,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Button 
                            onClick={onClose} 
                            variant="contained" 
                            color="secondary"
                            sx={{
                                borderRadius: 20,
                                padding: '8px 24px',
                                backgroundColor: '#186F65',
                                color: 'white',
                            }}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleCreate} 
                            variant="contained" 
                            color="primary"
                            sx={{
                                borderRadius: 20,
                                padding: '8px 24px',
                                backgroundColor: '#186F65',
                                color: 'white',
                            }}
                            disabled={loading || !channelName}
                        >
                            {loading ? "Creating..." : "Create"}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateChannelPopup;
