import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const WhysCard = ({ value, addWhysToList }) => {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<Card
			sx={{ borderRadius: 6.2, boxShadow: 3, width: "80%", margin: "auto" }}>
			<CardContent sx={{ display: "flex" }}>
				<IconButton
					onClick={() => {
						setIsSelected((prev) => !prev);
						addWhysToList(value);
					}}>
					{isSelected ? <CheckCircleIcon /> : <CheckCircleOutlinedIcon />}
				</IconButton>
				<Typography
					variant="body1"
					sx={{
						mt: 1,
						color: "#8e8e8e",
					}}>
					{value}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default WhysCard;
