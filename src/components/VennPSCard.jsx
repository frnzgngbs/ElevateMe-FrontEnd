import { Checkbox } from "@mui/material";
import { Card, CardContent, FormControlLabel, Typography } from "@mui/material";
import React from "react";

const VennPSCard = ({ text }) => {
	return (
		<Card sx={{ width: "100%", maxWidth: 1000, borderRadius: 8, boxShadow: 3 }}>
			<CardContent sx={{ display: "flex", alignItems: "center" }}>
				<FormControlLabel
					control={
						<Checkbox
							sx={{
								color: "primary.main",
								"&.Mui-checked": {
									color: "primary.main",
								},
								borderRadius: "50%", // This line makes the checkbox circular
							}}
						/>
					}
					label={
						<Typography variant="body1" sx={{ mt: 1 }}>
							{text}
						</Typography>
					}
					sx={{ flex: 1, margin: 0 }}
				/>
			</CardContent>
		</Card>
	);
};

export default VennPSCard;
