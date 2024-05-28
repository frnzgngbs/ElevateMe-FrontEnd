import {
	Box,
	ButtonBase,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import React from "react";

function HomePageCards({ card, icon, title, description, handleCardClick }) {
	return (
		<Box>
			<Box>
				<Card
					sx={{
						borderRadius: 5,
						boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 35px 10px",
					}}
					elevation={3}>
					<ButtonBase onClick={() => handleCardClick(card)}>
						<CardActionArea>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100px",
										marginTop: 2,
									}}>
									<CardMedia
										component="img"
										src={icon}
										sx={{
											maxHeight: "100px",
											maxWidth: "100%",
											objectFit: "contain",
										}}
									/>
								</Box>
								<Typography variant="h5" textAlign={"center"} sx={{ mt: 2 }}>
									{title}
								</Typography>
								<Typography
									variant="body1"
									textAlign={"center"}
									fontSize={"13px"}
									sx={{ mt: 1 }}>
									{description}
								</Typography>
							</CardContent>
						</CardActionArea>
					</ButtonBase>
				</Card>
			</Box>
		</Box>
	);
}

export default HomePageCards;
