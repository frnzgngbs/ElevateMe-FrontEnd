import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import PSCard from "../components/PSCard";

const FiveWhys = () => {
	const data = [
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
	];

	return (
		<Box>
			<Box sx={{ px: 12, py: 2 }}>
				<Typography variant="h4">Selected Problem Statement</Typography>
				<Box sx={{ mt: 6, ml: 7 }}>
					<Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
						Problem Statement
					</Typography>
					<br></br>
					<Grid container sx={{ ml: 2 }}>
						<Grid item xs sx={{ display: "flex", alignItems: "center" }}>
							<Typography variant="body2">Problem Statement</Typography>
						</Grid>
						<Grid item sx={{ mr: 2.2 }}>
							<Button
								variant="contained"
								sx={{ borderRadius: 5.6, color: "#FFFB" }}>
								Show
							</Button>
						</Grid>
					</Grid>
					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
						<Button
							variant="contained"
							sx={{
								px: 2.3,
								py: 1.2,
								borderRadius: 5.6,
								color: "#FFFB",
							}}>
							Generate 5 Whys
						</Button>
					</Box>
				</Box>
				<Box sx={{ mt: 5 }}>
					<Typography variant="h4">Generated 5 Why's</Typography>
					<Box sx={{ mt: 1, ml: 7 }}>
						<Box>
							<Typography variant="body2" textAlign={"justify"}>
								Enumerate 5 HMW statement(s) by specifying an ACTION (what you
								want to achieve), a SUBJECT (to be influenced or affected), and
								a WHAT (outcome or what you like to achieve).
							</Typography>
							<Box sx={{ my: 5 }}>
								<Box component={"form"}>
									{data.map((text, index) => (
										<Box sx={{ mt: 2 }}>
											<PSCard key={index} text={text} />
										</Box>
									))}
									<Box
										sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
										<Button
											variant="contained"
											sx={{
												px: 2.3,
												py: 1.2,
												borderRadius: 5.6,
												color: "#FFFB",
											}}>
											Generate Root
										</Button>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default FiveWhys;
