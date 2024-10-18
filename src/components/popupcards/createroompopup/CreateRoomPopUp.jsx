import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const CreateRoomPopup = ({ open, onClose, onRoomCreated }) => {
    const [roomName, setRoomName] = useState("");
    const [members, setMembers] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        const memberEmails = members.split(',').map(email => email.trim());
        const payload = {
            new_room_member_emails: memberEmails,
            room_name: roomName,
        };

        try {
            setLoading(true);
            const token = "c9da795286ada1a817f0d070e5a0feb7ddaf6be1"; // Replace this with your dynamic token logic if necessary

            const response = await axios.post('http://localhost:8000/api/rooms/', payload, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Room created successfully:", response.data);
            
            // Call the onRoomCreated callback with the new room data (if needed to update UI)
            onRoomCreated(response.data);
            
            // Reset fields and close the popup after successful creation
            setRoomName("");
            setMembers("");
            onClose();
        } catch (error) {
            console.error("Error creating room:", error);
            if (error.response) {
                console.error("Error details:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
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
                Create a New Room
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Room Name"
                    fullWidth
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
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
                        disabled={loading || !roomName}
                    >
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default CreateRoomPopup;
