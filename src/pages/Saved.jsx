import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SavedPSCard from "../components/SavedPSCard";

const Saved = () => {
	const [cards, setCards] = useState({
		two_venn: [],
		three_venn: [],
	});

	useEffect(() => {
		const dummyText =
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum temporibus laborum assumenda voluptate aliquam dignissimos, harum vel, totam repellat qui. Itaque natus ex quis, quae sunt commodi beatae perferendis!";
		setCards((prev) => ({
			...prev, // Spread the previous state
			two_venn: Array(5).fill(dummyText), // 5 dummy items for two_venn
			three_venn: Array(3).fill(dummyText), // 3 dummy items for three_venn
		}));
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
						{cards.two_venn.map((text, index) => (
							<SavedPSCard
								key={index}
								index={index}
								text={text}
								onDelete={() => handleDelete("two_venn", index)}
							/>
						))}
					</Box>
				</Box>
				<Box sx={{ mx: 10 }}>
					<Typography variant="h4" sx={{ marginTop: 10 }}>
						3 Venn Diagram List
					</Typography>
					<Stack direction={"row"}>
						<Box sx={{ marginTop: 5 }}>
							{cards.two_venn.map((text, index) => (
								<SavedPSCard
									key={index}
									text={text}
									onDelete={() => handleDelete("three_venn", index)}
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
