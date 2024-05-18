import React from "react";
import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";

// NOTE(hans): Subject for change (Not final)

// The layout
/*
  +--------------------------------------------------------+
  |                     App bar                            |
  |                                                        |
  +--------------------------------------------------------+
  |                                                        |
  |  Left div                       Right div              |
  |  +------------------------+     +--------------------+ |
  |  | Problem Statement      |     |                    | |
  |  | Generator              |     |                    | |
  |  |                        |     |                    | |
  |  |                        |     |     Diagram        | |
  |  |                        |     |                    | |
  |  |                        |     |                    | |
  |  | Generate               |     |                    | |
  |  +------------------------+     +--------------------+ |
  |                     Problem Statement                  |
  +--------------------------------------------------------+
  |    Problem                                             |
  |    [] Inneficient waste collection                     |
  |    [] Limited availability of recycled products        |
  |    [] Limited access to recycling                      |
  |                                                        |
  +--------------------------------------------------------+
*/

const HomePage = () => {
	var theme = useTheme();
	const problemStatements = [
		"Inneficient waste collection",
		"Limited availability",
		"Limited access to recycling",
		"Accumulation of waste",
		"Resource depletion",
	];

	return (
		<Box sx={{ userSelect: "none" }}>
			<Box
				paddingTop="3rem"
				paddingBottom="3rem"
				paddingLeft="8rem"
				paddingRight="8rem">
				{/* The div that holds the two div side by side */}
				<Grid container display="flex" justifyContent={"space-around"}>
					{/* left div */}
					<Grid item lg={6} xl={6}>
						<h1 style={{ color: theme.palette.primary.main }}>
							Problem Statement
							<br />
							Generator
						</h1>

						<Grid xl={6} paddingTop={10} paddingBottom={15} maxWidth={300}>
							<p>
								Specify first the number of Venn Diagram and input the scopes of
								your problem statement you want to be generated
							</p>
						</Grid>

						<Button
							variant="contained"
							sx={{
								paddingTop: "10px",
								paddingBottom: "10px",
								paddingLeft: "30px",
								paddingRight: "30px",
								borderRadius: "32px",
								fontWeight: "normal",
							}}>
							Generate
						</Button>
					</Grid>
					{/* right div */}
					<Grid item lg={6} xl={6}>
						{/* TODO(hans): Add actual venn diagram */}
						<h1 style={{ color: theme.palette.primary.main }}>Venn Diagram</h1>
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Box
					textAlign={"center"}
					sx={{
						userSelect: "none",
					}}>
					<h1 style={{ color: theme.palette.primary.main }}>
						Problem Statement
					</h1>
				</Box>
			</Box>
			{/* Grid that holds gray area */}
			<Box>
				{/* Gray area */}
				<Box
					xl={12}
					xs={12}
					md={12}
					sx={{
						userSelect: "none",
						backgroundColor: "gray.main",
						paddingTop: "3rem",
						paddingBottom: "3rem",
						paddingLeft: "10rem",
						paddingRight: "10rem",
					}}>
					<strong
						style={{ fontWeight: "bold", color: "black", fontSize: "1.2rem" }}>
						Problem
					</strong>
					<FormGroup>
						{problemStatements.map((problemStatement, index) => (
							<FormControlLabel
								key={index}
								control={
									<Checkbox
										defaultChecked
										icon={
											<CheckCircleOutlined
												sx={{ fill: theme.palette.primary.main }}
											/>
										}
										checkedIcon={<CheckCircle />}
									/>
								}
								label={problemStatement}
							/>
						))}
					</FormGroup>
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;
