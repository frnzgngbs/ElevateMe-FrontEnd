import {
	Box,
	Button,
	ButtonBase,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";

import venn from "../res/venn.svg";
import save from "../res/save.svg";
import list from "../res/list.svg";
import five_whys from "../res/WHY’S.svg";
import HMW from "../res/HMW.svg";
import elevator from "../res/elevator.svg";
import notebook from "../res/techno-book.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const cards = {
		venn: {
			icon: venn,
			title: "Venn Diagram",
			description:
				"ElevateMe is an app that generates problem statements. It follows the Technopreneurship Workbook. A group of CIT-U students make this app to automate the current and long process of tecnopreneurship workbook.",
		},
		saved: {
			icon: save,
			title: "Saved List",
			description:
				"ElevateMe is an app that generates problem statements. It follows the Technopreneurship Workbook. A group of CIT-U students make this app to automate the current and long process of tecnopreneurship workbook.",
		},
		list: {
			icon: list,
			title: "Saved List",
			description:
				"ElevateMe is an app that generates problem statements. It follows the Technopreneurship Workbook. A group of CIT-U students make this app to automate the current and long process of tecnopreneurship workbook.",
		},
		five_whys: {
			icon: five_whys,
			title: "5 Why's",
			description:
				"ElevateMe is an app that generates problem statements. It follows the Technopreneurship Workbook. A group of CIT-U students make this app to automate the current and long process of tecnopreneurship workbook.",
		},
		hmw: {
			icon: HMW,
			title: "How Might We",
			description:
				"ElevateMe is an app that generates problem statements. It follows the Technopreneurship Workbook. A group of CIT-U students make this app to automate the current and long process of tecnopreneurship workbook.",
		},
		elevator_pitch: {
			icon: elevator,
			title: "Elevator Pitch",
			description:
				"ElevateMe is an app that generates problem statements. It follows the Technopreneurship Workbook. A group of CIT-U students make this app to automate the current and long process of tecnopreneurship workbook.",
		},
	};

	const handleCardClick = (card) => {
		navigate(`/${card}`, { replace: true });
	};

	var theme = useTheme();

	return (
		<Box>
			<Grid container spacing={6} justifyContent={"center"} px={13}>
				{/* This is the left div*/}
				<Grid item xs={12} md={6}>
					<Typography variant="h1">ElevateMe</Typography>
					<br />
					<Typography variant="body1" fontWeight={"bold"} textAlign={"justify"}>
						ElevateMe is an app that generates problem statements. It follows
						the Technopreneurship Workbook. A group of CIT-U students made this
						app to automate the current and long process of technopreneurship
						workbook.
					</Typography>
					<br />
					<Typography variant="body1" textAlign={"justify"}>
						Its goal is to shorten the time lorem ipsum setrsa nerates problem
						statements. It follows the Technopreneurship Workbook. A group of
						CIT-U students made this app to automate the current and long
						process of technopreneurship workbook.
					</Typography>
					<br />
					<Button variant="contained" sx={{ py: 1, px: 5, borderRadius: 4 }}>
						About
					</Button>
				</Grid>
				{/* This is the right div */}
				<Grid item xs={12} md={6}>
					<Box
						sx={{
							bgcolor: "primary.main",
						}}>
						LATER PUT THE IMAGE HERE
					</Box>
					{/* <Box component="img" src={notebook} /> */}
				</Grid>
			</Grid>
			<Box>
				<Box>
					<Typography variant="h2" textAlign={"center"}>
						Features
					</Typography>
					<br />
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography
							variant="body1"
							sx={{ textAlign: "center", width: "1000px", marginBottom: 4 }}>
							ElevateMe is an app that generates problem statements. It follows
							the Technopreneurship Workbook. A group of CIT-U students made
							this app to automate the current and long process of
							technopreneurship workbook.
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					mx: 15,
				}}>
				<Grid container spacing={2} sx={{ marginBottom: 8 }}>
					{Object.entries(cards).map(([key, card]) => (
						<Grid item xs={12} md={4} key={key}>
							<Card
								sx={{
									borderRadius: 5,
									boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 35px 10px",
								}}
								elevation={3}>
								<ButtonBase onClick={() => handleCardClick(key)}>
									<CardActionArea>
										<CardContent>
											<CardMedia component="img" src={card.icon} />
											<Typography
												variant="h5"
												textAlign={"center"}
												sx={{ mt: 2 }}>
												{card.title}
											</Typography>
											<Typography
												variant="body1"
												textAlign={"center"}
												sx={{ mt: 1 }}>
												{card.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</ButtonBase>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default HomePage;
