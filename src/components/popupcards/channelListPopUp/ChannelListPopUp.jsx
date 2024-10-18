// components/popupcards/channelListPopUp/ChannelListPopUp.js
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import ChannelCard from "./ChannelCard"; // Adjust the import path if necessary
import CreateChannelPopup from "../createchannelpopup/CreateChannelPopUP"; // Import the new component
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ChannelListPopup = ({ open, onClose, roomId }) => {
    const navigate = useNavigate();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createChannelOpen, setCreateChannelOpen] = useState(false); // State for controlling the CreateChannelPopup
    const token = "c9da795286ada1a817f0d070e5a0feb7ddaf6be1"; // Temporary token

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/rooms/${roomId}/channels`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setChannels(response.data);
            } catch (error) {
                console.error("Error fetching channels:", error);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchChannels();
        }
    }, [open, roomId]);

    const handleChannelClick = (channelId) => {
        navigate(`/channel/${channelId}`);
        onClose();
    };

    const handleAddChannel = () => {
        setCreateChannelOpen(true);
    };

    const handleCreateChannelClose = () => {
        setCreateChannelOpen(false);
    };

    const handleChannelCreated = (newChannel) => {
        setChannels((prevChannels) => [...prevChannels, newChannel]);
        handleCreateChannelClose();
    };

    if (loading) {
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
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                    }}
                >
                    <Typography id="channel-list-title" variant="h6" gutterBottom>
                        Loading Channels...
                    </Typography>
                </Box>
            </Modal>
        );
    }

    return (
        <>
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
                        {channels.map((channel) => (
                            <Grid item xs={12} key={channel.id}>
                                <ChannelCard
                                    title={channel.channel_name}
                                    onClick={() => handleChannelClick(channel.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddChannel}
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

            {/* Render CreateChannelPopup */}
            <CreateChannelPopup
                open={createChannelOpen}
                onClose={handleCreateChannelClose}
                roomId={roomId}
                onChannelCreated={handleChannelCreated}
            />
        </>
    );
};

export default ChannelListPopup;
