import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import ChannelCard from "./ChannelCard";

const ChannelListPopup = ({ open, onClose, channels, onAddChannel }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="channel-list-title"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography id="channel-list-title" variant="h6" gutterBottom>
                    Channels
                </Typography>
                <Grid container spacing={2} justifyContent="flex-start">
                    {channels.map((channel, index) => (
                        <Grid item xs={12} key={index}>
                            <ChannelCard title={channel.title} />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={onAddChannel}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: "#186F65",
                            color: "white",
                        }}
                    >
                        Add Channel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ChannelListPopup;
