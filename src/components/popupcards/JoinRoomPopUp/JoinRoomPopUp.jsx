import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const JoinRoomPopup = ({ open, onClose, onJoin }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="join-room-title"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                    textAlign: 'center',
                }}
            >
                <Typography id="join-room-title" variant="h6" component="h2" gutterBottom>
                    Join Room Code
                </Typography>
                <TextField
                    fullWidth
                    label="Room Code"
                    variant="outlined"
                    sx={{
                        mb: 2,
                        borderRadius: 2, 
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3, 
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onJoin}
                    sx={{
                        borderRadius: 8, 
                        px: 4, 
                    }}
                >
                    Join
                </Button>
            </Box>
        </Modal>
    );
};

export default JoinRoomPopup;
