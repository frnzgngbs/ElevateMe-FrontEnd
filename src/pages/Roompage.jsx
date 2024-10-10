import {
	Box,
	Button,
	
	Grid,
	Typography,
	
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Bookpng from "../res/book.png";
import GridBackground from "../res/gridbackground.png";
import HomePageCards from "../components/HomePageCards";
import { useEffect, useState } from "react";

const Roompage = () => {
	const navigate = useNavigate();
	const [about, setAbout] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [buttonScale, setButtonScale] = useState(1);

	


	
	return (
		<Box>
		
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
							Room page
						</Typography>
						<br />
						<div
							style={{
								opacity: isVisible ? 1 : 0,
								transition: "opacity 0.5s ease-in-out",
							}}>


							
						</div>

						<br />
						<div
							style={{
								transform: `scale(${buttonScale})`,
								transition: "transform 0.3s ease-in-out",
							}}>
							<Button
								onClick={() => setAbout((prev) => !prev)}
								variant="contained"
								sx={{ py: 1, px: 5, borderRadius: 4 }}>
								About
							</Button>
						</div>
					</div>
				</Grid>
			
			</Grid>
			
		</Box>
	);
};

export default Roompage;
