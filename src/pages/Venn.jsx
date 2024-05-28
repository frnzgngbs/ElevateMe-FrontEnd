import {
	Box,
	Button,
	Card,
	Grid,
	IconButton,
	Typography,
	TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { CheckBox } from "@mui/icons-material";
import PSCard from "../components/PSCard";
import SettingsIcon from "@mui/icons-material/Settings";
import Venn2 from "../res/venn.png";
import { useState } from "react";
import VennSettings from "../components/VennSettings";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import GridBackground from "../res/gridbackground.png"

function Venn() {
	const [showSetting, setShowSetting] = useState(false);
	const [textFields, setTextFields] = useState({
		field1: "",
		field2: "",
		field3: "",
		filter: "",
	});
	const [ProblemStatements, setProblemStatements] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedProblemStatements, setSelectedProblemStatements] = useState({
		statement: [],
	});

	const getLastCheckButton = sessionStorage.getItem("setting");

	const [selectedButton, setSelectedButton] = useState(
		getLastCheckButton == null ? getLastCheckButton : 3
	);

	const handleCheckChange = (text) => {
		setSelectedProblemStatements((prevState) => {
			const { statement } = prevState;
			if (statement.includes(text)) {
				return {
					...prevState,
					statement: statement.filter((item) => item !== text),
				};
			} else {
				return { ...prevState, statement: [...statement, text] };
			}
		});
	};

	const handleSaveProblemStatement = async () => {
		let token = localStorage.getItem("token");
		try {
			let response = await axios.post(
				"http://localhost:8000/api/three_venn_ps/",
				{
					venn: { ...textFields },
					...selectedProblemStatements,
				},
				{
					headers: { Authorization: `Token ${token}` },
				}
			);

			//for venn 2 post
		
			//
		} catch (err) {
			console.log(err);
		}
	};
	
	const toggleShowSetting = () => {
		setShowSetting((prevState) => !prevState);
	};

	const handleGenerateButtonClick = async () => {
		setIsLoading(true);
		let token = localStorage.getItem("token");
		try {
			if (selectedButton === 2) {
				let two_response = await axios.post(
					"http://localhost:8000/api/ai/two_venn/",
					{
						...textFields,
					},
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
				setProblemStatements((prev) => [...two_response.data.response]);
			} else if (selectedButton === 3) {
				let three_response = await axios.post(
					"http://localhost:8000/api/ai/three_venn/",
					{
						...textFields,
					},
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
				setProblemStatements((prev) => [...three_response.data.response]);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Box 
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<LoadingScreen />
			</Box>
			) : (
				<Box paddingBottom={4}sx={{backgroundImage: `url(${GridBackground})`, backgroundSize: '90%', backgroundRepeat: 'no-repeat', marginBottom:'60px', backgroundPositionY:"-124px" }}>
					<Typography variant="h2" textAlign="center" gutterBottom>
						Venn Diagram
					</Typography>
					<Grid
						container
						spacing={6}
						justifyContent="center"
						alignItems="center">
						<Grid item>
							<Card
								sx={{
									width: 370,
									height: 440,
									p: 3.7,
									borderRadius: 6,
									boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 35px 10px",
								}}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											mb: 2,
											width: "100%",
										}}>
										<Box width={200}>
											<Typography variant="h4">Venn Diagram Scopes</Typography>
										</Box>

										<IconButton
											sx={{
												marginTop: -4,
												marginRight: -1,
												padding: 0,
												height: "40px",
												width: "40px",
											}}
											onClick={toggleShowSetting}>
											<SettingsIcon variant="outlined" sx={{ fontSize: 30 }} />
										</IconButton>
									</Box>
									<Box sx={{ position: "relative", marginBottom: "20px" }}>
										<Box
											sx={{ display: "flex", justifyContent: "space-between" }}>
											<Typography
												variant="h6"
												sx={{
													position: "absolute",
													top: "72px",
													left: "24px",
													color: "#8E8E8E",
													fontSize: "14px",
													width: "81px",
													textAlign: "center",
													overflow: "hidden",
													display: "-webkit-box",
													WebkitLineClamp: 3,
													WebkitBoxOrient: "vertical",
												}}
											>
												{textFields.field1 ? textFields.field1 : "Field 1..."}
											</Typography>

											<Typography
												variant="h6"
												sx={{
													position: "absolute",
													top: "72px",
													right: "35px",
													color: "#8E8E8E",
													fontSize: "14px",
													width: "81px",
													textAlign: "center",
													overflow: "hidden",
													display: "-webkit-box",
													WebkitLineClamp: 3,
													WebkitBoxOrient: "vertical",
												}}>
												{textFields.field2 ? textFields.field2 : "Field 2..."}
											</Typography>
										</Box>
										<Typography
											variant="h6"
											sx={{
												position: "absolute",
												bottom: "50px",
												left: "50%",
												transform: "translate(-50%)",
												color: "#8E8E8E",
												fontSize: "14px",
												width: "81px",
												textAlign: "center",
												overflow: "hidden",
												display: "-webkit-box",
												WebkitLineClamp: 3,
												WebkitBoxOrient: "vertical",
											}}>
											{textFields.field3 ? textFields.field3 : "Field 3..."}
										</Typography>
										<img
											src={Venn2}
											alt="Venn Diagram"
											style={{ zIndex: 0, width: "325px", Height: "50px" }}
										/>
									</Box>
								</Box>
							</Card>
						</Grid>
						<Grid item>
							<Box sx={{ marginLeft: 4, width: "360px" }}>
								<Typography variant="h3">
									Problem Statement Generator
								</Typography>
								<Typography variant="body1" sx={{ mt: 2 }}>
									Specify first the number of Venn Diagram and Input the scopes
									of your problem statement you want to be generated
								</Typography>
								<Button
									onClick={handleGenerateButtonClick}
									variant="contained"
									sx={{
										mt: 4.3,
										py: 1.3,
										px: 6.2,
										borderRadius: 5.6,
										color: "#FFFB",
										fontSize: "1rem",
									}}>
									Generate
								</Button>
							</Box>
						</Grid>
					</Grid>
					<Box sx={{ mt: 16, px: 15 }}>
						<Typography variant="h3" textAlign={"center"}>
							Generated Problem Statement
						</Typography>
						<Typography variant="body1" textAlign={"center"} marginTop={2.7}>
							This are the generated problem statements, you can always edit the
							generated problem statements if you want
						</Typography>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							gap={2}
							sx={{ mt: 2, mb: 4 }}>
							{Array.isArray(ProblemStatements) &&
								ProblemStatements.map((text, index) => (
									<PSCard
										key={index}
										text={text}
										handleCheckChange={handleCheckChange}
									/>
								))}
							<Button
								onClick={handleSaveProblemStatement}
								variant="contained"
								sx={{ py: 1.3, px: 5.3, borderRadius: 5 }}>
								Save
							</Button>
						</Box>
					</Box>
					{showSetting && (
						<Box
							sx={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Box sx={{ position: "relative" }}>
								<VennSettings
									toggleShowSetting={toggleShowSetting}
									textFields={textFields}
									setTextFields={setTextFields}
									selectedButton={selectedButton}
									setSelectedButton={setSelectedButton}
									setProblemStatements={setProblemStatements}
								/>
							</Box>
						</Box>
					)}
				</Box>
			)}
		</>
	);
}

export default Venn;
