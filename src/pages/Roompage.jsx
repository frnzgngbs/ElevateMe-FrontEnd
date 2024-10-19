import { Box, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import GridBackground from "../res/gridbackground.png";
import RoomCard from "../components/RoomCards";
import JoinRoomPopup from "../components/popupcards/JoinRoomPopUp/JoinRoomPopUp";
import CreateRoomPopup from "../components/popupcards/createroompopup/CreateRoomPopUp";
import ChannelListPopup from "../components/popupcards/channelListPopUp/ChannelListPopUp";
import { useState, useEffect } from "react";
import axios from "axios";

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isCreateRoomPopupOpen, setIsCreateRoomPopupOpen] = useState(false);
    const [isChannelListOpen, setIsChannelListOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomChannels, setRoomChannels] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentlyLoginId, setCurrentlyLoginId] = useState(null);

    useEffect(() => {
        const fetchCurrentlyLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Fetched token:", token);

                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                // Fetch the currently logged-in user's ID
                const userResponse = await axios.get('http://localhost:8000/api/user/get_currently_login/', {
                    headers: { Authorization: `Token ${token}` },
                });

                const userId = userResponse.data.id;
                setCurrentlyLoginId(userId);
                console.log("Currently logged in user ID:", userId);

                // Fetch rooms for this user
                const roomsResponse = await axios.get('http://localhost:8000/api/rooms/', {
                    headers: { Authorization: `Token ${token}` },
                });

                console.log("Response data:", roomsResponse.data);

                // Filter rooms to only include those where the logged-in user is the owner
                const roomData = roomsResponse.data
                    .filter((room) => room.room_owner_id === userId)
                    .map((room) => ({
                        id: room.id,
                        title: room.room_name,
                        roomCode: room.room_code,
                        ownerEmail: room.room_owner_id.email,
                        channels: [],
                    }));

                    console.log(roomData)

                setRooms(roomData);
            } catch (error) {
                console.error("Error fetching rooms or user:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized: Check if the token is valid and correctly formatted.");
                }
            }
        };

        fetchCurrentlyLoggedInUser();
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleOpenCreateRoomPopup = () => {
        setIsCreateRoomPopupOpen(true);
    };

    const handleCloseCreateRoomPopup = () => {
        setIsCreateRoomPopupOpen(false);
    };

    const handleDeleteRoom = (deletedRoomId) => {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== deletedRoomId));
    };

    const handleRoomCreated = (newRoom) => {
        setRooms((prevRooms) => [
            ...prevRooms,
            {
                id: newRoom.id,
                title: newRoom.room_name,
                roomCode: newRoom.room_code,
                ownerEmail: newRoom.room_owner_id.email,
                channels: [],
            },
        ]);
        setShowSuccess(true); // Show success message
        handleCloseCreateRoomPopup();
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    const handleOpenChannelList = (room) => {
        setSelectedRoom(room);
        setIsChannelListOpen(true);
    };

    const handleCloseChannelList = () => {
        setIsChannelListOpen(false);
    };

    const handleAddChannel = (roomId) => {
        const newChannel = { title: `Channel ${roomChannels[roomId]?.length + 1 || 1}` };
        setRoomChannels((prevChannels) => ({
            ...prevChannels,
            [roomId]: [...(prevChannels[roomId] || []), newChannel],
        }));
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url(${GridBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: 1,
            }}
        >
            <Typography variant="h1" fontSize="50px" gutterBottom sx={{ marginTop: "5px" }}>
                Room Page
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    maxWidth: "1450px",
                    margin: "20px auto",
                    padding: "0 16px",
                    px: { xs: "16px", sm: "50px", md: "100px" }
                }}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "20px",
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenPopup}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: "#186F65",
                            color: "white",
                            minWidth: "150px",
                        }}
                    >
                        Join Room
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenCreateRoomPopup}
                        sx={{
                            marginLeft: 2,
                            borderRadius: 4,
                            backgroundColor: "#186F65",
                            color: "white",
                            minWidth: "150px",
                        }}
                    >
                        Create Room
                    </Button>
                </Grid>

                {rooms.map((room) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={room.id}
                        onClick={() => handleOpenChannelList(room)}
                    >
                        <RoomCard 
                            title={room.title} 
                            roomCode={room.roomCode} 
                            ownerEmail={room.ownerEmail} 
                            roomId={room.id}
                            onDelete={handleDeleteRoom}
                        />
                    </Grid>
                ))}
            </Grid>

            <JoinRoomPopup
                open={isPopupOpen}
                onClose={handleClosePopup}
                onJoin={() => handleClosePopup()}
            />

            <CreateRoomPopup
                open={isCreateRoomPopupOpen}
                onClose={handleCloseCreateRoomPopup}
                onRoomCreated={handleRoomCreated}
            />

            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSuccess} severity="success">
                    Room created successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RoomPage;
