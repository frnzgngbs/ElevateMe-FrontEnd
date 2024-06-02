import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Typography, Card,
	CardActions,
	CardContent,} from "@mui/material";
import RootProblemHistoryPopup from "../components/popupcards/potentialRootHistoryPopup/potentialRootHistoryPopup";
import { useLocation } from "react-router-dom";
import WhysCard from "../components/WhysCard";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import HMWCard from "../components/HMWCard";
import ElevatorPitch from "./../components/popupcards/elevatorPitchPopUp/ElevatorPitch";
import { Elevator } from "@mui/icons-material";

const HMW = () => {
	const [open, setOpen] = React.useState(false);
	const location = useLocation();
	const [fiveHMW, setFiveHMW] = useState(
		JSON.parse(sessionStorage.getItem("five_hmws")) || []
	);
	const [selectedHMW, setSelectedHMW] = useState(
		JSON.parse(sessionStorage.getItem("selected_hmws")) || []
	);
	const [isLoading, setIsLoading] = useState(false);

	const [openElevator, setOpenElevator] = useState(false);

	const generated_root =
		location.state?.potential_root?.root ||
		sessionStorage.getItem("generated_root");

	// const list_of_whys = location.state?.list_of_whys || [];
	const list_of_whys = useMemo(() => {
		const storedWhys = sessionStorage.getItem("root_five_whys");
		const parsedWhys = storedWhys ? JSON.parse(storedWhys) : [];
		return location.state?.list_of_whys || parsedWhys;
	}, [location.state?.list_of_whys]);

	const [elevatorPitch, setElevatorPitch] = useState([]);

	const selected_statement =
		location.state?.statement || sessionStorage.getItem("selected_statement");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const generateFiveHMW = async () => {
		if (selectedHMW.lengt === 0) {
			alert("");
		}
		setIsLoading((prev) => !prev);
		try {
			let token = localStorage.getItem("token");
			let response = await axios.post(
				"http://localhost:8000/api/ai/five_hmws/",
				{
					selected_statement: selected_statement,
					list_of_whys: list_of_whys,
					root_problem: generated_root,
				},
				{
					headers: { Authorization: `Token ${token}` },
				}
			);
			setFiveHMW([...response.data.five_hmws]);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading((prev) => !prev);
		}
	};

	const addHMWToList = (hmw) => {
		if (selectedHMW !== null) {
			if (!selectedHMW.includes(hmw)) {
				return setSelectedHMW((curr) => [...curr, hmw]);
			} else {
				return setSelectedHMW(selectedHMW.filter((hmws) => hmws !== hmw));
			}
		}
		return setSelectedHMW((prev) => [...prev, ...hmw]);
	};

	// useEffect(() => {
	// 	console.log(selectedHMW);
	// }, [selectedHMW]);

	// SAVING OF SESSION HERE
	useEffect(() => {
		sessionStorage.setItem("selected_hmws", JSON.stringify(selectedHMW));
		sessionStorage.setItem("five_hmws", JSON.stringify(fiveHMW));
		sessionStorage.setItem("generated_root", generated_root);
		sessionStorage.setItem("root_five_whys", JSON.stringify(list_of_whys));
		sessionStorage.setItem("selected_statement", selected_statement);
		sessionStorage.setItem("elevatorPitch", JSON.stringify(elevatorPitch));
	}, [
		selectedHMW,
		fiveHMW,
		generated_root,
		list_of_whys,
		selected_statement,
		elevatorPitch,
	]);

	const generateElevatorPitch = async () => {
		if (selectedHMW.length === 0) {
			alert(
				"Cannot generate an elevator's pitch with no at least one hmw's selected."
			);
			return;
		}

		setIsLoading((prev) => !prev);

		try {
			let token = localStorage.getItem("token");
			let response = await axios.post(
				"http://localhost:8000/api/ai/elevator_pitch/",
				{
					problem_statement: selected_statement,
					list_of_whys: [...list_of_whys],
					root_problem: generated_root,
					list_of_hmws: [...selectedHMW],
				},
				{ headers: { Authorization: `Token ${token}` } }
			);
			sessionStorage.removeItem("selected_hmws");
			setElevatorPitch(response.data.elevator_pitch);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading((prev) => !prev);
			sessionStorage.removeItem("selected_hmws");
			setSelectedHMW([]);
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
					<Typography variant="h1" textAlign={"center"} fontSize="50px">
						How Migt We
					</Typography>

					<Typography
						variant="body1"
						textAlign={"center"}
						fontSize="14px"
						width="800px"
						margin="auto"
						marginBottom={"50px"}
						marginTop="10px">
						Now subject the selected problem statement to a 5-Why analysis. In
						5-Whys, you ask "why" five times to uncover the underlying issue
						behind a problem. Click the generate button to generate a 5 whys
						statement
					</Typography>
					
					<Typography variant="h4">Potential Root Problem</Typography>
					<Box sx={{ mt: 3, ml: 7 }}>
						<Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
							Below, is your generated potential root problem.
						</Typography>
						<Grid
    container
    sx={{ display: "flex", justifyContent: "center" }}>
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            mt: 2,
            width: "100%",
        }}>
        <Card
            variant="outlined"
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                border: "1px solid #8e8e8e",
                borderRadius: 4,
                maxWidth: "800px",
                height: "80px",
                boxShadow: "none",
                width: "95%",
                margin: "auto",
            }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Typography variant="body2">{generated_root}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 5, color: "#FFFB" }}
                    onClick={handleOpen}>
                    Show
                </Button>
            </CardActions>
        </Card>
    </Box>
</Grid>
<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
    <Button
        variant="contained"
        onClick={generateFiveHMW}
        sx={{
            px: 2.3,
            py: 1.2,
            borderRadius: 5.6,
            color: "#FFFB",
        }}>
        Generate 5 HMW's
    </Button>
</Box>

					</Box>
					<Box sx={{ mt: 5 }}>
						<Typography variant="h4">Generated 5 HMW's</Typography>
						<Box sx={{ mt: 1, ml: 7 }}>
							<Box>
								<Typography variant="body2" textAlign={"justify"}>
									Enumerate 5 HMW statement(s) by specifying an ACTION (what you
									want to achieve), a SUBJECT (to be influenced or affected),
									and a WHAT (outcome or what you like to achieve).
								</Typography>
								<Box sx={{ my: 5 }}>
									<Box component={"form"}>
										{fiveHMW.map((value, index) => (
											<Box sx={{ mt: 2 }}>
												<HMWCard
													key={index}
													value={value}
													addHMWToList={addHMWToList}
												/>
											</Box>
										))}
										<Box
											sx={{
												display: "flex",
												justifyContent: "flex-end",
												mt: 3,
											}}>
											<Box sx={{ mr: 2 }}>
												<Button
													variant="contained"
													onClick={() => {
														setOpenElevator((prev) => !prev);
													}}
													sx={{
														px: 2.3,
														py: 1.2,
														borderRadius: 5.6,
														color: "#FFFB",
													}}>
													Show Elevator Pitch
												</Button>
											</Box>
											<Button
												variant="contained"
												onClick={generateElevatorPitch}
												sx={{
													px: 2.3,
													py: 1.2,
													borderRadius: 5.6,
													color: "#FFFB",
												}}>
												Generate Elevator's Pitch
											</Button>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
			{openElevator && (
				<ElevatorPitch data={elevatorPitch} setOpenElevator={setOpenElevator} />
			)}
			<RootProblemHistoryPopup
				open={open}
				onClose={() => setOpen(false)}
				problemStatement={selected_statement}
				whyStatements={list_of_whys}
			/>
		</Box>
	);
};

export default HMW;
