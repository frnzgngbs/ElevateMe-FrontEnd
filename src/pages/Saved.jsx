import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SavedPSCard from "../components/SavedPSCard";
import axios from "axios";

const Saved = () => {
	const [savedProblemStatement, setSavedProblemStatement] = useState({
		two_venn: {},
		three_venn: {}, // Initialize with an empty object
	});

	function mapData(response, setting) {
		if (Array.isArray(response.data)) {
			setSavedProblemStatement((prev) => {
				const newItems = {};
				response.data.forEach((item) => {
					newItems[item.id] = item;
				});
	
				let updatedTwoVenn = { ...prev.two_venn };
				let updatedThreeVenn = { ...prev.three_venn };
	
				// Filter out duplicates for two_venn
				if (setting !== "three_venn") {
					Object.keys(newItems).forEach((id) => {
						if (!updatedTwoVenn[id]) {
							updatedTwoVenn[id] = newItems[id];
						}
					});
				}
				
				// Filter out duplicates for three_venn
				if (setting === "three_venn") {
					Object.keys(newItems).forEach((id) => {
						if (!updatedThreeVenn[id]) {
							updatedThreeVenn[id] = newItems[id];
						}
					});
				}
	
				return {
					two_venn: updatedTwoVenn,
					three_venn: updatedThreeVenn,
				};
			});
		}
	}
	

	useEffect(() => {
		const getSavedProblemStatement = async () => {
			try {
				let token = localStorage.getItem("token");
				let response = await axios.get(
					"http://localhost:8000/api/three_venn_ps/",
					{
						headers: { Authorization: `Token ${token}` },
					}
				);

				mapData(response, "three_venn");
				console.log(savedProblemStatement);
			} catch (err) {
				console.log("Error fetching saved problem statements:", err);
			}
		};
		getSavedProblemStatement();
	}, []);

	// Note(Franz): Initial delete implementation just for display purposes
	const handleDelete = (settings, index) => {
		return null;
	};

	return (
		<Box>
			<Box sx={{ paddingTop: 4, paddingBottom: 5 }}>
				<Typography variant="h2" textAlign={"center"}>
					Saved List
				</Typography>
				<br></br>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Typography variant="body1" textAlign={"center"} width={"1000px"}>
						This pages stores all the problem statements that you want to save.
						You Can edit with the show button. the section is divided in to two
						categories. 2 Venn Diagram List and the 3 Venn Diagram List
					</Typography>
				</Box>
				<Box sx={{ mx: 10 }}>
					<Typography variant="h4" sx={{ marginTop: 10 }}>
						2 Venn Diagram List
					</Typography>
					<Box sx={{ marginTop: 4 }}>
						{/* {savedProblemStatement.two_venn.map((text, index) => (
							<SavedPSCard
								key={index}
								index={index}
								text={text}
								onDelete={() => handleDelete("two_venn", index)}
							/>
						))} */}
					</Box>
				</Box>
				<Box sx={{ mx: 10 }}>
					<Typography variant="h4" sx={{ marginTop: 10 }}>
						3 Venn Diagram List
					</Typography>
					<Stack direction={"row"}>
						<Box sx={{ marginTop: 5 }}>
							{Object.values(savedProblemStatement.three_venn).map((item) => (
								<SavedPSCard
									key={item.id}
									id={item.id}
									text={item.statement}
									venn={item.venn}
									user={item.user}
									onDelete={() => handleDelete("three_venn", item.id)}
								/>
							))}
						</Box>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
};

export default Saved;
