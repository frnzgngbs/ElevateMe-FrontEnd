import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { useState } from "react";

import VennSettingsHistoryPopup from "../components/popupcards/vennsettingspopup/VennSettingsHistory";

const SavedPSCard = ({ id, text, venn, onDelete }) => {
	const [openPopup, setOpenPopup] = useState(false);
	const [isEditable, setIsEditable] = useState(false);

	const handleOpenPopup = () => {
		setOpenPopup(!openPopup);
	};

	const setTextFieldToEditable = () => {
		setIsEditable((prev) => !prev);
	};

	return (
		<>
			<Card
				key={id}
				sx={{
					display: "flex",
					position: "relative",
					marginX: 7,
					zIndex: 1,
					marginY: 1.5,
					borderRadius: 5,
					boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 35px 10px",
				}}>
				<Grid container alignItems="center" sx={{ position: "relative" }}>
					<Grid item sx={{ ml: 1 }}>
						<IconButton>
							{/* 
							TODO: Add this later on the icon button functionality
							onClick={() => setIsEditable((prev) => !prev)}
							*/}
							<EditIcon />
						</IconButton>
					</Grid>
					<Grid item xs>
						<CardContent>
							<Grid container>
								<Grid
									item
									xs
									sx={{
										display: "flex",
										alignItems: "center",
									}}>
									<Typography variant="body1">
										{/*
										TODO: Add this later
										 contenteditable={isEditable ? "true" : "false"} */}
										{text}
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Grid>
					<Grid item sx={{ mx: 1 }}>
						<IconButton onClick={handleOpenPopup}>
							<Button variant="contained" sx={{ px: 3, borderRadius: 5 }}>
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
			<VennSettingsHistoryPopup
				venn={venn}
				open={openPopup}
				onClose={() => setOpenPopup(false)}
			/>
		</>
	);
};

export default SavedPSCard;
