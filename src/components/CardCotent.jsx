import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";

const CardCotent = ({ text, index, onDelete }) => {
	return (
		<Card
			sx={{
				display: "flex",
				marginX: 7,
				marginY: 1.5,
				borderRadius: 5,
			}}>
			<Grid container alignItems="center">
				<Grid item sx={{ ml: 1 }}>
					<IconButton onClick={onDelete}>
						<EditIcon />
					</IconButton>
				</Grid>
				<Grid item xs>
					<CardContent>
						<Typography variant="body1">{text}</Typography>
					</CardContent>
				</Grid>
				<Grid item sx={{ mx: 1 }}>
					<IconButton>
						<Button variant="contained" sx={{ px: 3 }}>
							Show
						</Button>
					</IconButton>
				</Grid>
				<Grid item sx={{ mr: 1 }}>
					<IconButton onClick={onDelete}>
						<DeleteIcon color="error" />
					</IconButton>
				</Grid>
			</Grid>
		</Card>
	);
};

export default CardCotent;
