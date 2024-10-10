import { Box, Button, Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import GridBackground from "../res/gridbackground.png";
import RoomCard from "../components/RoomCards";

const RoomPage = () => {
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
			}}>
			{/* Centering the title at the top-middle */}
			<Grid item xs={12} sx={{ marginTop: "50px" }}>
				<Typography variant="h1" fontSize="50px" gutterBottom>
					Room Page
				</Typography>
			</Grid>



			<>{/* Add Room Button in the Top Right */}
			<Grid container justifyContent="flex-end" sx={{ paddingRight: "50px", marginBottom: "20px" }}>
				<Button
					variant="contained"
					startIcon={<Add />}
					sx={{ borderRadius: 4, backgroundColor: "#1976d2", color: "white" }}>
					Add Room
				</Button>
			</Grid>

			{/* Cards Section */}
			<Grid
				container
				spacing={3} // Controls spacing between cards
				justifyContent="center"
				sx={{ padding: "0 50px", maxWidth: "1200px", margin: "0 auto" }}>
				{/* Example cards using the RoomCard component */}
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<RoomCard title="Room 1" />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<RoomCard title="Room 2" />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<RoomCard title="Room 3" />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<RoomCard title="Room 4" />
				</Grid>
			</Grid></>


			
		</Box>
	);
};

export default RoomPage;
