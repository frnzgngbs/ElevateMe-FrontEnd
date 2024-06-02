import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Venn3Paper from "../components/venndiagramreport/VennDiagramPaper3";
import Venn2Paper from "../components/venndiagramreport/VennDiagramPaper2";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Report = () => {
	const location = useLocation();

	const [details, setDetails] = useState({
		venn: {},
		statement: "",
		whys: [],
		hmws: [],
	});

	useEffect(() => {
		const venn = location.state?.venn;
		const ps_id = location.state?.statement_id;
		const whys =
			location.state?.list_of_whys ||
			JSON.parse(sessionStorage.getItem("root_five_whys"));
		const hmws =
			location.state?.list_of_hmws ||
			JSON.parse(sessionStorage.getItem("root_hmws"));

		console.log(ps_id);
		const retrieveData = async () => {
			let response;
			let token = localStorage.getItem("token");
			if (venn.field3 === undefined) {
				response = await axios.get(
					`http://localhost:8000/api/two_venn_ps/${ps_id}/`,
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
			} else {
				let token = localStorage.getItem("token");
				response = await axios.get(
					`http://localhost:8000/api/three_venn_ps/${ps_id}/`,
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
			}
			setDetails((prev) => ({
				...prev,
				whys: [...whys],
				hmws: [...hmws],
				venn: { ...response.data.venn },
				statement: response.data.statement,
			}));
		};
		retrieveData();
	}, []);

	return (
		<Box sx={{ padding: 4 }}>
			<Typography
				variant="h2"
				sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 4 }}>
				Report Page
			</Typography>
			<Typography variant="body1" sx={{ textAlign: "center", marginBottom: 4 }}>
				This page shows the entire process which to be saved as pdf by clicking
				CTRL + P and selecting save as pdf
			</Typography>

			{/* Venn part */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: 10,
					width: "60%",
					margin: "auto",
					minWidth: "800px",
					maxWidth: "800px",
				}}>
				{/* Left Div */}
				<Box sx={{ flex: 1 }}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						height="100%">
						{details.venn && details.venn.field3 !== undefined ? (
							<Venn3Paper venn={details.venn} />
						) : (
							<Venn2Paper venn={details.venn || { field1: "", field2: "" }} />
						)}
					</Box>
				</Box>

				{/* Right Div */}
				<Box sx={{ flex: 1, marginLeft: 4, alignContent: "center" }}>
					<Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
						Problem Statement
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 4 }}>
						{details.statement}
					</Typography>
				</Box>
			</Box>

			{/* Why Statements */}
			<Box
				sx={{
					marginTop: 10,
					marginBottom: 10,
					width: "70%",
					margin: "auto",
					minWidth: "700px",
					maxWidth: "900px",
				}}>
				<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
					Why Statements
				</Typography>
				<Box>
					{Array.isArray(details.whys) &&
						details.whys.length > 0 &&
						details.whys.map((statement, index) => (
							<Paper
								key={index}
								elevation={4}
								sx={{
									padding: 2,
									marginBottom: 2,
									borderRadius: 4,
									minWidth: "600px",
								}}>
								<Typography variant="body1">{statement}</Typography>
							</Paper>
						))}
				</Box>
			</Box>

			{/* HMW Statements */}
			<Box
				sx={{
					width: "70%",
					margin: "auto",
					minWidth: "700px",
					maxWidth: "900px",
				}}>
				<Typography
					variant="h5"
					sx={{ fontWeight: "bold", marginBottom: 2, marginTop: 5 }}>
					How Might We Statements
				</Typography>
				<Box>
					<Box>
						{Array.isArray(details.hmw) &&
							details.hmw.length > 0 &&
							details.hmw.map((statement, index) => (
								<Paper
									key={index}
									elevation={4}
									sx={{
										padding: 2,
										marginBottom: 2,
										borderRadius: 4,
										minWidth: "600px",
									}}>
									<Typography variant="body1">{statement}</Typography>
								</Paper>
							))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Report;
