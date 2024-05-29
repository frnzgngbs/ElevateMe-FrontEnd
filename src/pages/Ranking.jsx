import {
	Box,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button,
	Card,
	CardContent,
	Grid,
	IconButton,
} from "@mui/material";
import React from "react";
import PSListCard from "../components/RankingPSCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Ranking = () => {
	const data = [
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
	];

	const criteria = [
		{
			criteria_title: "Impact",
			description:
				"The problem has a significant impact on various stakeholders, such as individuals, groups, organizations, and the environment.",
		},
		{
			criteria_title: "Capability",
			description:
				"The problem solver has the ability to effectively address and solve this problem based on your skills, resources, and expertise.",
		},
		{
			criteria_title: "Development Cost",
			description:
				"The potential solution is feasible to develop considering potential costs, investments, and financial resources required.",
		},
		{
			criteria_title: "Urgency",
			description:
				" It is urgent to find a solution for this problem in terms of time constraints, market demands, or immediate needs.",
		},
		{
			criteria_title: "Innovation Opportunity",
			description:
				"The problem has the potential to present innovative solutions or new approaches that could lead to unique outcomes or competitive advantages.",
		},
		{
			criteria_title: "Market Size",
			description:
				"Potential market is large enough to make the solution a viable business.",
		},
	];

	const sample = [1, 2, 3, 4, 5];
	return (
		<Box pb={5}>
			<Box
				sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
				<Typography variant="h1" sx={{ textAlign: "center", width: "400px" }}>
					Problem Statement List
				</Typography>
			</Box>
			<Box sx={{ mx: 17 }}>
				<Box sx={{ display: "flex", justifyContent: "end" }}>
					<RadioGroup name="radio-button-group" sx={{ flexDirection: "row" }}>
						<FormControlLabel value="2" control={<Radio />} label="2" />
						<FormControlLabel value="3" control={<Radio />} label="3" />
					</RadioGroup>
				</Box>
				<Box
					sx={{ maxHeight: "500px", overflowY: "auto", mt: 2, mb: 4, p: 1.3 }}>
					{data.map((item, index) => (
						<Box key={index} sx={{ mb: 1 }}>
							<PSListCard text={item} />
						</Box>
					))}
				</Box>
			</Box>

			<Box sx={{ mx: 13.3, mb: 3 }}>
				<Typography variant="h3">Problem Statement Ranking</Typography>
			</Box>

			<Box sx={{ display: "flex", gap: 10, mx: 17, mb: 10 }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
					}}>
					{criteria.map(({ criteria_title }, index) => (
						<Box key={index}>
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
								{criteria_title}-
							</Typography>
						</Box>
					))}
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
					}}>
					{criteria.map(({ description }, index) => (
						<Box key={index}>
							<Typography variant="body1">{description}</Typography>
						</Box>
					))}
				</Box>
			</Box>

			<Box>
				<Card
					sx={{
						mr: 14,
						ml: 22,
						background: "#D9D9D9",
						borderRadius: 5,
						mb: 2,
					}}>
					<CardContent
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
							borderRadius: 5,
						}}>
						<Grid container sx={{ justifyContent: "space-between" }}>
							<Grid item xs>
								<Typography sx={{ width: "100px", textAlign: "center" }}>
									Problem Statement
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography textAlign={"center"}>Impact</Typography>
							</Grid>
							<Grid item xs>
								<Typography textAlign={"center"}>Capability</Typography>
							</Grid>
							<Grid item xs>
								<Typography textAlign={"center"}>Dev Cost</Typography>
							</Grid>
							<Grid item xs>
								<Typography sx={{ width: "100px", textAlign: "center" }}>
									Urgency of Needs
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography textAlign={"center"}>
									Innovation Opportunity
								</Typography>
							</Grid>
							<Grid item xs textAlign={"center"}>
								<Typography>Market Size</Typography>
							</Grid>
							<Grid item xs textAlign={"center"}>
								<Typography>Total</Typography>
							</Grid>
							<Grid item xs textAlign={"center"}>
								<Typography>Rank</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{sample.map((value) => {
					return (
						<Box sx={{ display: "flex", mr: 14, ml: 17, mb: 2 }}>
							<IconButton>
								<CheckCircleOutlineIcon />
							</IconButton>
							<Card
								sx={{
									background: "#D9D9D9",
									borderRadius: 5,
									width: "100%",
								}}>
								<CardContent
									sx={{
										display: "flex",
										alignItems: "center",
										width: "100%",
										borderRadius: 5,
									}}>
									<Grid container sx={{ justifyContent: "space-between" }}>
										<Grid item xs>
											<Typography sx={{ width: "100px", textAlign: "center" }}>
												{value}
											</Typography>
										</Grid>
										<Grid item xs>
											<Typography textAlign={"center"}></Typography>
										</Grid>
										<Grid item xs>
											<Typography textAlign={"center"}></Typography>
										</Grid>
										<Grid item xs>
											<Typography textAlign={"center"}></Typography>
										</Grid>
										<Grid item xs>
											<Typography
												sx={{
													width: "100px",
													textAlign: "center",
												}}></Typography>
										</Grid>
										<Grid item xs>
											<Typography textAlign={"center"}></Typography>
										</Grid>
										<Grid item xs textAlign={"center"}>
											<Typography></Typography>
										</Grid>
										<Grid item xs textAlign={"center"}>
											<Typography></Typography>
										</Grid>
										<Grid item xs textAlign={"center"}>
											<Typography></Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default Ranking;
