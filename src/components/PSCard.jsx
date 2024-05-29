import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const PSCard = ({ text, handleSaveProblemStatement }) => {
	return (
		<Card sx={{ width: "100%", borderRadius: 6.2, boxShadow: 3 }}>
			<CardContent
				sx={{ height: "80px", display: "flex", alignItems: "center" }}>
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
