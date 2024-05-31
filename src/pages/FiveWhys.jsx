import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import PSCard from "../components/PSCard";
import PopupVennHistory from "../components/popupcards/vennHistorypopup/vennHistoryPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import WhysOrHMWCard from "../components/WhysOrHMWCard";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const FiveWhys = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(false);
	const [fiveWhys, setFiveWhys] = useState(
		JSON.parse(sessionStorage.getItem("five_whys")) || []
	);
	const [selectedWhys, setSelectedWhys] = useState(
		JSON.parse(sessionStorage.getItem("selected_whys")) || []
	);
	const navigate = useNavigate();

	const generateFiveWhys = async (statement) => {
		setIsLoading((prev) => !prev);
		try {
			let token = localStorage.getItem("token");
			let response = await axios.post(
				"http://localhost:8000/api/ai/five_whys/",
				{
					ranked_problem: statement,
				},
				{
					headers: { Authorization: `Token ${token}` },
				}
			);
			setFiveWhys((prev) => [...response.data.response]);
			console.log(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading((prev) => !prev);
		}
	};
	const statement =
		location.state?.statement ||
		sessionStorage.getItem("whys_selected_statement");

	const venn = location.state?.venn || sessionStorage.getItem("whys_venn");

	useEffect(() => {
		sessionStorage.setItem("whys_selected_statement", statement);
		sessionStorage.setItem("whys_venn", venn);
		sessionStorage.setItem("selected_whys", JSON.stringify(selectedWhys));
		sessionStorage.setItem("five_whys", JSON.stringify(fiveWhys));
	}, [statement, venn, selectedWhys, fiveWhys]);

	const handleShowPopup = () => {
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	const addWhysToList = (why) => {
		if (selectedWhys !== null) {
			if (!selectedWhys.includes(why)) {
				return setSelectedWhys((curr) => [...curr, why]);
			} else {
				return setSelectedWhys(selectedWhys.filter((whys) => whys !== why));
			}
		}
		return setSelectedWhys((prev) => [...prev, ...why]);
	};

	// NOTE: Only used for debugging purposes
	useEffect(() => {
		console.log(selectedWhys);
	}, [selectedWhys]);

	const generatePotentialRootProb = async () => {
		setIsLoading((prev) => !prev);
		try {
			let token = localStorage.getItem("token");
			let response = await axios.post(
				"http://localhost:8000/api/ai/potential_root/",
				{
					list_of_whys: [...selectedWhys],
				},
				{
					headers: { Authorization: `Token ${token}` },
				}
			);
			console.log(response.data);
			navigate("/hmw", { state: { potential_root: response.data } });
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading((prev) => !prev);
		}
	};

	return (
		<Box>
			{isLoading ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}>
					<LoadingScreen />
				</Box>
			) : (
				<Box sx={{ px: 12, py: 2 }}>
					<Typography variant="h4">Selected Problem Statement</Typography>
					<Box sx={{ mt: 1, ml: 7 }}>
						<Grid container sx={{ ml: 2 }}>
							<Grid item xs sx={{ display: "flex", alignItems: "center" }}>
								<Typography variant="body2">{statement}</Typography>
							</Grid>
							<Grid item sx={{ p: 2 }}>
								<Button
									variant="contained"
									sx={{ borderRadius: 5.6, color: "#FFFB" }}
									onClick={handleShowPopup}>
									Show
								</Button>
							</Grid>
						</Grid>
						<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
							<Button
								variant="contained"
								onClick={() => generateFiveWhys(statement)}
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
									want to achieve), a SUBJECT (to be influenced or affected),
									and a WHAT (outcome or what you like to achieve).
								</Typography>
								<Box sx={{ my: 5 }}>
									<Box>
										{fiveWhys.map((value, index) => (
											<Box sx={{ mt: 2 }}>
												<WhysOrHMWCard
													key={index}
													value={value}
													addWhysToList={addWhysToList}
												/>
											</Box>
										))}
										<Box
											sx={{
												display: "flex",
												justifyContent: "flex-end",
												mt: 3,
											}}>
											<Button
												variant="contained"
												onClick={generatePotentialRootProb}
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
					{isPopupOpen && (
						<PopupVennHistory
							venn={venn}
							open={isPopupOpen}
							onClose={handleClosePopup}
						/>
					)}
				</Box>
			)}
		</Box>
	);
};

export default FiveWhys;
