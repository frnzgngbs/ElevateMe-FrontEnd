// components/RoomCard.js

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import SampleImage from "../res/sampleImage.jpg"; // Replace with actual image

const RoomCards = ({ title }) => {
	return (
		<Card
			sx={{
				maxWidth: 300, // Fixed card width
				borderRadius: "16px", // More curve around the corners
				boxShadow: 3, // Adds a subtle shadow
				overflow: "hidden", // Ensures image and content are properly clipped
			}}>
			<CardMedia
				component="img"
				height="160" // Adjusted height for a slightly bigger image
				image={SampleImage} // Replace with the actual image path
				alt={title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default RoomCards;
