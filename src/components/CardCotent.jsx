import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const CardCotent = ({ text, index, onDelete }) => {
	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				marginX: 7,
				marginY: 1.5,
				py: 0.5,
				px: 1,
				borderRadius: 5,
			}}>
			<IconButton onClick={onDelete}>
				<EditIcon sx={{ marginLeft: 1 }} />
			</IconButton>
			<CardContent>
				<Typography variant="body1">{text}</Typography>
			</CardContent>
			<IconButton>
				<Button variant="contained" sx={{ px: 3 }}>
					Show
				</Button>
			</IconButton>
			<IconButton onClick={onDelete}>
				<DeleteIcon color="error" />
			</IconButton>
		</Card>
	);
};

export default CardCotent;
