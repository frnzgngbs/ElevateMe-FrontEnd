import React, { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SavedPSCard from "../components/SavedPSCard";
import axios from "axios";

function problemStatementReducer(state, action) {
	switch (action.type) {
		case "SET_TWO_VENN":
			return { ...state, two_venn: action.statements };
		case "SET_THREE_VENN":
			return { ...state, three_venn: action.statements };
		case "DELETE_TWO_VENN":
			const { [action.id]: discardedTwoStatementValue, ...updatedTwoVenn } =
				state.two_venn;
			return { ...state, two_venn: updatedTwoVenn };
		case "DELETE_THREE_VENN":
			const { [action.id]: discardedThreeStatementValue, ...updatedThreeVenn } =
				state.three_venn;
			return { ...state, three_venn: updatedThreeVenn };
		default:
			return state;
	}
}
const Saved = () => {
	const [savedProblemStatement, dispatch] = useReducer(
		problemStatementReducer,
		{
			two_venn: {},
			three_venn: {},
		}
	);

	useEffect(() => {
		const getSavedProblemStatement = async () => {
			try {
				let token = localStorage.getItem("token");

				let response1 = await axios.get(
					"http://localhost:8000/api/two_venn_ps/",
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
				dispatch({ type: "SET_TWO_VENN", statements: mapData(response1.data) });

				let response = await axios.get(
					"http://localhost:8000/api/three_venn_ps/",
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
				dispatch({
					type: "SET_THREE_VENN",
					statements: mapData(response.data),
				});
			} catch (err) {
				console.log("Error fetching saved problem statements:", err);
			}
		};

		getSavedProblemStatement();
	}, []);

	const mapData = (data) => {
		const newItems = {};
		data.forEach((item) => {
			newItems[item.id] = item;
		});
		return newItems;
	};

	const handleEdit = async (setting, id, statement) => {
		// if (setting === "two_venn") {
		// } else if (setting === "three_venn") {
		// }
		return null;
	};

	const handleDelete = async (setting, id) => {
		if (setting === "two_venn") {
			try {
				let token = localStorage.getItem("token");
				await axios.delete(`http://localhost:8000/api/two_venn_ps/${id}/`, {
					headers: { Authorization: `Token ${token}` },
				});
				dispatch({ type: "DELETE_TWO_VENN", id });
			} catch (err) {
				console.log("Error deleting problem statement:", err);
			}
		} else if (setting === "three_venn") {
			try {
				let token = localStorage.getItem("token");
				await axios.delete(`http://localhost:8000/api/three_venn_ps/${id}/`, {
					headers: { Authorization: `Token ${token}` },
				});
				dispatch({ type: "DELETE_THREE_VENN", id });
			} catch (err) {
				console.log("Error deleting problem statement:", err);
			}
		}
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
					<Box sx={{ marginTop: 5 }}>
						{Object.values(savedProblemStatement.two_venn).map((item) => (
							<SavedPSCard
								key={item.id}
								id={item.id}
								text={item.statement}
								venn={item.venn}
								user={item.user}
								onDelete={() => handleDelete("two_venn", item.id)}
							/>
						))}
					</Box>
				</Box>
				<Box sx={{ mx: 10 }}>
					<Typography variant="h4" sx={{ marginTop: 10 }}>
						3 Venn Diagram List
					</Typography>
					<Box sx={{ marginTop: 5 }}>
						{Object.values(savedProblemStatement.three_venn).map((item) => (
							<SavedPSCard
								key={item.id}
								id={item.id}
								text={item.statement}
								venn={item.venn}
								user={item.user}
								// onEdit={() => handleEdit("three_venn", item.id, statement)}
								onDelete={() => handleDelete("three_venn", item.id)}
							/>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Saved;
