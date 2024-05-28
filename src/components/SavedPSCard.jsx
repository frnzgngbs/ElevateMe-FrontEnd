import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
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
		<Box>
			<Card
				key={id}
				sx={{
					display: "flex",
					position: "relative",
					marginX: 7,
					zIndex: 1,
					marginY: 1.4,
					borderRadius: 5,
					boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 35px 10px",
				}}>
				<CardContent
					sx={{ display: "flex", alignItems: "center", width: "100%" }}>
					<Grid container alignItems="center">
						<Grid item>
							<IconButton onClick={() => setIsEditable((prev) => !prev)}>
								{/* 
							TODO: Add this later on the icon button functionality
							onClick={() => setIsEditable((prev) => !prev)}
							*/}
								<EditIcon />
							</IconButton>
						</Grid>
						<Grid item xs>
							<Box>
								{isEditable ? (
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}>
										<Typography
											variant="body1"
											contentEditable={isEditable.toString()}>
											{text}
										</Typography>
										<Box>
											<Button>Yes</Button>
											<Button>No</Button>
										</Box>
									</Box>
								) : (
									<Typography variant="body1">{text}</Typography>
								)}
							</Box>
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
				</CardContent>
			</Card>
			<VennSettingsHistoryPopup
				venn={venn}
				open={openPopup}
				onClose={() => setOpenPopup(false)}
			/>
		</Box>
	);
};

export default SavedPSCard;
