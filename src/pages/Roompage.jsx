import { Box, Button, Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import GridBackground from "../res/gridbackground.png";
import RoomCard from "../components/RoomCards";
import JoinRoomPopup from "../components/popupcards/JoinRoomPopUp/JoinRoomPopUp"; 
import { useState } from "react";

const RoomPage = () => {

    const [rooms, setRooms] = useState([
        { id: 1, title: "Room 1" },
        { id: 2, title: "Room 2" },
        { id: 3, title: "Room 3" },
        { id: 4, title: "Room 4" },
    ]);

    // popup Join Roommm
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleJoinRoom = () => {
        handleClosePopup();
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
                    maxWidth: "1200px", 
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
                        Add Room
                    </Button>
                </Grid>

                {/* Room Cards */}
                {rooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
                        <RoomCard title={room.title} />
                    </Grid>
                ))}
            </Grid>

            <JoinRoomPopup 
                open={isPopupOpen} 
                onClose={handleClosePopup} 
                onJoin={handleJoinRoom} 
            />
        </Box>
    );
};

export default RoomPage;
