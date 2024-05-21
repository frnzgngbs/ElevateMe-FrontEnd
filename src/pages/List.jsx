import React from "react";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import ProblemStatementList from "../components/ProblemStatementList";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox } from "@mui/material";

/*
  +---------------------------------------------------------------------+
  |                                Appbar                               |
  +---------------------------------------------------------------------+
  |                                                                     |
  | Problem Statement List                                              |
  | +-----------------------------------------------------------------+ |
  | | [] +-1. Inneficient waste collection--------------------------+ | |
  | | [] +-2. Limited avaialability of recycled products------------+ | |
  | | [] +-3. Limited Access to recycling---------------------------+ | |
  | | [] +-4. Accumulation of waste---------------------------------+ | |
  | |                                                           Add   | |
  | +-----------------------------------------------------------------+ |
  |                                                                     |
  |                                                                     |
  |                                                                     |
  |                                                                     |
  |                                                                     |

*/

const List = () => {
	const theme = useTheme();

	const ranks = [1, 2, 3, 4, 5];

	const test = [
		"1. Inneficient waste collection",
		"2. Limited availability of recycled products",
		"3. Limited Access to recycling",
		"4. Accumulation of waste",
	];

	const terms = [
		{
			term: "Impact",
			description:
				"The problem has a significant impact on various stakeholders, such as individuals, groups, organizations, and the environment.",
		},
		{
			term: "Capability",
			description:
				"The problem solver has the ability to effectively address and solve this problem based on your skills, resources, and expertise.",
		},
		{
			term: "Development Cost",
			description:
				"The potential solution is feasible to develop considering potential costs, investments, and financial resources required.",
		},
		{
			term: "Urgency",
			description:
				"It is urgent to find a solution for this problem in terms of time constraints, market demands, or immediate needs.",
		},
		{
			term: "Innovation Opportunity",
			description:
				"The problem has the potential to present innovative solutions or new approaches that could lead to unique outcomes or competitive advantages.",
		},
		{
			term: "Market Size",
			description:
				"Potential market is large enough to make the solution a viable business.",
		},
	];

	return (
		<Box
			sx={{
				paddingTop: "3rem",
				paddingBottom: "3rem",
				paddingLeft: "4rem",
				paddingRight: "4rem",
				userSelect: "none",
			}}>
			<Box>
				<h1 style={{ color: theme.palette.primary.main }}>
					Problem Statement List
				</h1>
				<ProblemStatementList list={test} />
			</Box>
			<Box
				sx={{
					marginTop: "64px",
					marginBottom: "48px",
				}}>
				<h1 style={{ color: theme.palette.primary.main }}>
					Problem Statement Ranking
				</h1>
				{terms.map((item, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							flexDirection: "row",
						}}>
						<Box
							sx={{
								width: "16rem",
							}}>
							<strong>{item.term}-</strong>
						</Box>
						<Box>{item.description}</Box>
					</Box>
				))}
			</Box>
			<Box>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<CheckIcon sx={{ fill: theme.palette.primary.main }} />
					<Box
						sx={{
							justifyContent: "space-evenly",
							width: "100%",
							paddingTop: "8px",
							paddingBottom: "8px",
							paddingLeft: "32px",
							paddingRight: "32px",
							borderRadius: "32px",
							marginTop: "25px",
							backgroundColor: "gray.main",
							display: "flex",
							flexDirection: "row",
						}}>
						<Box>
							<strong>Problem Statement</strong>
						</Box>
						{terms.map((term, index) => (
							<Box key={index}>
								<strong>{term.term}</strong>
							</Box>
						))}
						<Box>
							<strong>Rank</strong>
						</Box>
					</Box>
				</Box>
				{/* Gray box part */}
				<Box>
					{ranks.map((rank, index) => (
						<Box
							key={index}
							display="flex"
							marginTop={1}
							alignItems="center"
							gap="8px">
							<Checkbox sx={{ color: theme.palette.primary.main }} />
							<Box
								sx={{
									width: "100%",
									backgroundColor: "gray.main",
									borderRadius: "32px",
									paddingTop: "16px",
									paddingBottom: "16px",
									paddingRight: "16px",
									paddingLeft: "64px",
									display: "flex",
									justifyContent: "space-between",
								}}>
								{rank}
								<DeleteOutlinedIcon sx={{ fill: theme.palette.primary.main }} />
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default List;
