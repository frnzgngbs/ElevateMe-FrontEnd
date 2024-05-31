import {
	Box,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Card,
	CardContent,
	Grid,
	IconButton,
	FormControl,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import PSListCard from "../components/RankingPSCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PS_action = {
	SET_PROBLEM_STATEMENT: "SET_PROBLEM_STATEMENT",
	REMOVE_PROBLEM_STATEMENT: "REMOVE_PROBLEM_STATEMENT",
	MODIFY_PROBLEM_STATEMENT: "MODIFY_PROBLEM_STATEMENT",
};

function listProblemStatementReducer(state, action) {
	switch (action.type) {
		case PS_action.SET_PROBLEM_STATEMENT:
			return [...action.statements];
		case PS_action.REMOVE_PROBLEM_STATEMENT:
			return state.filter(
				(item) => item.statement !== action.payload.statement
			);
		case PS_action.MODIFY_PROBLEM_STATEMENT:
			const newState = [...state];
			newState.splice(action.index, 0, {
				id: action.payload.id,
				venn: action.payload.venn,
				statement: action.payload.statement,
			});
			// console.log(newState);
			return newState;
		default:
			return state;
	}
}

function queuedProblemStatementReducer(state, action) {
	switch (action.type) {
		case PS_action.SET_PROBLEM_STATEMENT:
			return action.statement || [];
		case "ADD_PROBLEM_STATEMENT":
			return [
				...state,
				{
					id: action.payload.id,
					venn: action.payload.venn,
					statement: action.payload.statement,
				},
			];
		case PS_action.REMOVE_PROBLEM_STATEMENT:
			return state.filter((item) => {
				return item.statement !== action.payload.statement;
			});
		default:
			return state;
	}
}

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
			"It is urgent to find a solution for this problem in terms of time constraints, market demands, or immediate needs.",
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

const Ranking = () => {
	const [listProblemStatement, listProblemStatementDispatch] = useReducer(
		listProblemStatementReducer,
		JSON.parse(sessionStorage.getItem("ranking_list_statements")) || []
	);
	const [queuedProblemStatement, queuedProblemStatementDispatch] = useReducer(
		queuedProblemStatementReducer,
		JSON.parse(sessionStorage.getItem("ranking_queued_list_statements")) || []
	);
	const [selectedButton, setSelectedButton] = useState(
		sessionStorage.getItem("ranking_selected_button") !== null
			? sessionStorage.getItem("ranking_selected_button")
			: 3
	);
	const navigate = useNavigate();

	const [selectedValues, setSelectedValues] = useState(
		JSON.parse(sessionStorage.getItem("ranking_selectedValues")) || []
	);
	const [totalsPerRow, setTotalsPerRow] = useState(
		JSON.parse(sessionStorage.getItem("ranking_totalsPerRow")) || []
	);

	const handleSelectChange = (rowIndex, colIndex, newValue) => {
		const newSelectedValues = selectedValues.map((row, rIdx) =>
			row.map((value, cIdx) =>
				rIdx === rowIndex && cIdx === colIndex ? newValue : value
			)
		);
		setSelectedValues(newSelectedValues);

		const newTotalsPerRow = newSelectedValues.map((row) =>
			row.reduce((sum, value) => sum + value, 0)
		);
		setTotalsPerRow(newTotalsPerRow);
		sessionStorage.setItem(
			"ranking_selectedValues",
			JSON.stringify(newSelectedValues)
		);
		sessionStorage.setItem(
			"ranking_totalsPerRow",
			JSON.stringify(newTotalsPerRow)
		);
	};

	const getRanks = (totals) => {
		const indexedTotals = totals.map((total, index) => ({ total, index }));
		indexedTotals.sort((a, b) => b.total - a.total || a.index - b.index);
		const ranks = Array(totals.length).fill(0);
		indexedTotals.forEach((item, rank) => {
			ranks[item.index] = rank + 1;
		});
		return ranks;
	};

	const ranks = getRanks(totalsPerRow);

	useEffect(() => {
		const getSavedPS = async () => {
			try {
				if (selectedButton === 2) {
					let token = localStorage.getItem("token");
					let response = await axios.get(
						`http://localhost:8000/api/two_venn_ps/`,
						{
							headers: { Authorization: `Token ${token}` },
						}
					);
					console.log(response.data);
					listProblemStatementDispatch({
						type: PS_action.SET_PROBLEM_STATEMENT,
						statements: response.data,
					});
				} else if (selectedButton === 3) {
					let token = localStorage.getItem("token");
					let response = await axios.get(
						`http://localhost:8000/api/three_venn_ps/`,
						{
							headers: { Authorization: `Token ${token}` },
						}
					);
					listProblemStatementDispatch({
						type: PS_action.SET_PROBLEM_STATEMENT,
						statements: response.data,
					});
				}
			} catch (err) {}
		};

		getSavedPS();
		setSelectedValues([...[...initialSelectedValues]]);
		setTotalsPerRow([...initialTotalsPerRow]);
	}, [selectedButton]);

	const initialSelectedValues = queuedProblemStatement?.map(() =>
		criteria.map(() => 1)
	);
	const initialTotalsPerRow = initialSelectedValues?.map((row) =>
		row.reduce((sum, value) => sum + value, 0)
	);

	useEffect(() => {
		sessionStorage.setItem(
			"ranking_list_statements",
			JSON.stringify(listProblemStatement)
		);
		sessionStorage.setItem(
			"ranking_queued_list_statements",
			JSON.stringify(queuedProblemStatement)
		);
		console.log(queuedProblemStatement);
		setSelectedValues((prev) => {
			return [...prev, ...[...initialSelectedValues]];
		});
		setTotalsPerRow((prev) => [...prev, ...initialTotalsPerRow]);
	}, [queuedProblemStatement, listProblemStatement]);

	const handleAddStatement = (id, venn, statement) => {
		queuedProblemStatementDispatch({
			type: "ADD_PROBLEM_STATEMENT",
			payload: {
				id: id,
				venn: venn,
				statement: statement,
			},
		});

		console.log(queuedProblemStatement);

		listProblemStatementDispatch({
			type: PS_action.REMOVE_PROBLEM_STATEMENT,
			payload: {
				id: id,
				venn: venn,
				statement: statement,
			},
		});
	};

	const removeSelectedStatement = (index, id, venn, statement) => {
		queuedProblemStatementDispatch({
			type: PS_action.REMOVE_PROBLEM_STATEMENT,
			index: index,
			payload: {
				id: id,
				venn: venn,
				statement: statement,
			},
		});

		const newSelectedValues = selectedValues.filter((_, i) => i !== index);
		setSelectedValues(newSelectedValues);

		const newTotalsPerRow = newSelectedValues.map((row) =>
			row.reduce((sum, value) => sum + value, 0)
		);
		setTotalsPerRow(newTotalsPerRow);

		listProblemStatementDispatch({
			type: PS_action.MODIFY_PROBLEM_STATEMENT,
			index: index,
			payload: {
				id: id,
				venn: venn,
				statement: statement,
			},
		});
	};

	const generatePotenialRootProblem = (id, venn, statement) => {
		sessionStorage.removeItem("whys_selected_statement");
		sessionStorage.removeItem("whys_venn");
		sessionStorage.removeItem("selected_whys");
		sessionStorage.removeItem("five_whys");
		navigate("/five_whys", {
			state: { id: id, venn: venn, statement: statement },
		});
	};

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
					<RadioGroup
						value={selectedButton}
						onChange={(e) => {
							const value = +e.target.value;
							sessionStorage.setItem("ranking_selected_button", value);
							setSelectedButton((prev) => (prev = value));
							queuedProblemStatementDispatch({
								type: PS_action.SET_PROBLEM_STATEMENT,
								statement: [],
							});
						}}
						name="radio-button-group"
						sx={{ flexDirection: "row" }}>
						<FormControlLabel value="2" control={<Radio />} label="2" />
						<FormControlLabel value="3" control={<Radio />} label="3" />
					</RadioGroup>
				</Box>
				<Box
					sx={{ maxHeight: "500px", overflowY: "auto", mt: 2, mb: 4, p: 1.3 }}>
					{listProblemStatement.map((item, id) => (
						<Box key={id} sx={{ mb: 1 }}>
							<PSListCard
								key={id}
								{...item}
								addStatement={handleAddStatement}
							/>
						</Box>
					))}
				</Box>
			</Box>

			<Box sx={{ mx: 13.3, mb: 3 }}>
				<Typography variant="h3">Problem Statement Ranking</Typography>
			</Box>

			<Box sx={{ display: "flex", gap: 10, mx: 17, mb: 7 }}>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{criteria.map(({ criteria_title }, index) => (
						<Box key={index}>
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
								{criteria_title} -
							</Typography>
						</Box>
					))}
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{criteria.map(({ description }, index) => (
						<Box key={index}>
							<Typography variant="body1">{description}</Typography>
						</Box>
					))}
				</Box>
			</Box>

			<Box sx={{ mr: 14, ml: 17, mb: 2 }}>
				<Card
					sx={{
						background: "#D9D9D9",
						borderRadius: 5,
						width: "95%",
						mb: 2,
						ml: 5,
					}}>
					<CardContent
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
							borderRadius: 5,
						}}>
						<Grid container sx={{ justifyContent: "space-between" }}>
							<Grid item xs={5}>
								<Typography sx={{ textAlign: "center" }}>
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

				{queuedProblemStatement.length > 0 &&
					selectedValues.length > 0 &&
					queuedProblemStatement.map(({ id, venn, statement }, rowIndex) => (
						<Box key={rowIndex} sx={{ display: "flex", mb: 2 }}>
							<IconButton
								onClick={() => {
									generatePotenialRootProblem(id, venn, statement);
								}}>
								<CheckCircleOutlineIcon />
							</IconButton>
							<Card
								sx={{
									background: "#D9D9D9",
									borderRadius: 5,
									width: "95%",
								}}>
								<CardContent
									sx={{
										display: "flex",
										alignItems: "center",
										width: "100%",
										borderRadius: 5,
									}}>
									<Grid container sx={{ justifyContent: "space-between" }}>
										<Grid
											item
											xs={5}
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}>
											<Typography sx={{ textAlign: "center" }}>
												{statement}
											</Typography>
										</Grid>
										{criteria.map((_, colIndex) => (
											<Grid
												key={colIndex}
												item
												xs
												sx={{ display: "flex", justifyContent: "center" }}>
												<FormControl sx={{ justifyContent: "center" }}>
													<Select
														required
														value={selectedValues[rowIndex][colIndex]}
														onChange={(e) =>
															handleSelectChange(
																rowIndex,
																colIndex,
																parseInt(e.target.value)
															)
														}>
														<MenuItem value={1}>1</MenuItem>
														<MenuItem value={2}>2</MenuItem>
														<MenuItem value={3}>3</MenuItem>
														<MenuItem value={4}>4</MenuItem>
														<MenuItem value={5}>5</MenuItem>
													</Select>
												</FormControl>
											</Grid>
										))}
										<Grid
											item
											xs
											sx={{ display: "flex", justifyContent: "center" }}>
											<Typography
												sx={{ display: "flex", alignItems: "center" }}>
												{totalsPerRow[rowIndex]}
											</Typography>
										</Grid>
										<Grid
											item
											xs
											sx={{ display: "flex", justifyContent: "center" }}>
											<Typography
												sx={{ display: "flex", alignItems: "center" }}>
												{ranks[rowIndex]}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
							<IconButton
								onClick={() =>
									removeSelectedStatement(rowIndex, id, venn, statement)
								}>
								<DeleteOutlineIcon fontSize={"medium"} color="error" />
							</IconButton>
						</Box>
					))}
			</Box>
		</Box>
	);
};

export default Ranking;
