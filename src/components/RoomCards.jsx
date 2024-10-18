

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import SampleImage from "../res/sampleImage.jpg"; 

const RoomCards = ({ title }) => {
	return (
		<Card
			sx={{
				maxWidth: 300, 
				borderRadius: "16px", 
				boxShadow: 3, 
				overflow: "hidden", 
			}}>
			<CardMedia
				component="img"
				height="160" 
				image={SampleImage} 
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
