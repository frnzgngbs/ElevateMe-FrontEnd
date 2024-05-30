import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import PSCard from "../components/PSCard";
import PopupVennHistory from "../components/popupcards/vennHistorypopup/vennHistoryPopUp";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

const FiveWhys = () => {
	const data = [
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
	];
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(false);
	const [fiveWhys, setFiveWhys] = useState([]);

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

	const venn = location.state?.venn;

	useEffect(() => {
		sessionStorage.setItem("whys_selected_statement", statement);
	}, [statement]);

	const handleShowPopup = () => {
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};
	const [vennValues, setVennValues] = useState({
		field1: "john",
		field2: "jsadas",
		field3: "asd",
		filter: "ads",
		numVenns: 3,
	});

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
					<Box sx={{ mt: 6, ml: 7 }}>
						<Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
							Problem Statement
						</Typography>
						<br></br>
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
									<form onSubmit="">
										{fiveWhys.map((text, index) => (
											<Box sx={{ mt: 2 }}>
												<PSCard key={index} text={text} />
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
												sx={{
													px: 2.3,
													py: 1.2,
													borderRadius: 5.6,
													color: "#FFFB",
												}}>
												Generate Root
											</Button>
										</Box>
									</form>
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
