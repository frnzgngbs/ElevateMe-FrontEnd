import { Card, CardContent, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const PSCard = ({ text, handleSaveProblemStatement }) => {
	return (
		<Card sx={{ width: "80%", borderRadius: 6.2, boxShadow: 3 }}>
			<CardContent sx={{ display: "flex", alignItems: "center" }}>
				<IconButton onClick={() => handleSaveProblemStatement(text)}>
					<AddCircleOutlineIcon />
				</IconButton>
				<Typography variant="body1" sx={{ mt: 1, color: "#8e8e8e" }}>
					{text}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default PSCard;
