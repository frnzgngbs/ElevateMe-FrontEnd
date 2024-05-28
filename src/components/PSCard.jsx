import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useState } from "react";

const PSCard = ({ checked, text, handleCheckChange }) => {
	const [click, setClick] = useState(checked);
	return (
		<Card sx={{ width: "100%", borderRadius: 6.2, boxShadow: 3 }}>
			<CardContent sx={{ display: "flex", alignItems: "center" }}>
				<IconButton
					onClick={() => {
						handleCheckChange(text);
						setClick((prev) => !prev);
					}}>
					{!click ? <CheckBoxOutlineBlankOutlinedIcon /> : <CheckBoxIcon />}
				</IconButton>
				<Typography variant="body1" sx={{ mt: 1, color: "#8e8e8e" }}>
					{text}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default PSCard;
