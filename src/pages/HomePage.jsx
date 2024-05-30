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
import Bookpng from "../res/book.png";
import GridBackground from "../res/gridbackground.png";
import HomePageCards from "../components/HomePageCards";

const HomePage = () => {
	const navigate = useNavigate();
	//To Do: Update the statements in the cards here
	//		 Connect the API and populate the fields
	//       Saave Session
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
		rank: {
			icon: list,
			title: "Ranking",
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
			{/* put background  image here: gridbackgroundpng , make sure it is behind*/}
			<Grid
				container
				spacing={6}
				justifyContent={"center"}
				alignItems={"center"}
				sx={{
					backgroundImage: `url(${GridBackground})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					marginBottom: "50px",
				}}>
				{/* Adjusted left div size and font sizes */}
				<Grid item xs={10} md={5} pr={5}>
					<div>
						<Typography variant="h1" fontSize="50px">
							ElevateMe
						</Typography>
						<br />
						<Typography
							variant="body1"
							fontWeight={"bold"}
							textAlign={"justify"}
							fontSize="14px">
							ElevateMe is an app that generates problem statements. It follows
							the Technopreneurship Workbook. A group of CIT-U students made
							this app to automate the current and long process of
							technopreneurship workbook.
						</Typography>
						<br />
						<Typography variant="body1" textAlign={"justify"} fontSize="14px">
							Its goal is to shorten the time lorem ipsum setrsa nerates problem
							statements. It follows the Technopreneurship Workbook. A group of
							CIT-U students made this app to automate the current and long
							process of technopreneurship workbook.
						</Typography>
						<br />
						<Button variant="contained" sx={{ py: 1, px: 5, borderRadius: 4 }}>
							About
						</Button>
					</div>
				</Grid>
				{/* Right div remains unchanged */}
				<Grid item xs={10} md={5}>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<img
							src={Bookpng}
							alt="Techno Book"
							style={{
								maxWidth: "450px",
								maxHeight: "auto",
							}}
						/>
					</Box>
				</Grid>
			</Grid>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "900px",
					margin: "auto",
				}}>
				<Grid container spacing={2} sx={{ marginBottom: 8 }}>
					{Object.entries(cards).map(([key, card]) => (
						<Grid item key={key} xs={4} sx={{ width: "280px" }}>
							<HomePageCards
								key={key}
								card={key}
								{...card}
								handleCardClick={handleCardClick}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default HomePage;
