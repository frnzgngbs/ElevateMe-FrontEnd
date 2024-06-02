import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Venn3Paper from "../components/venndiagramreport/VennDiagramPaper3";
import Venn2Paper from "../components/venndiagramreport/VennDiagramPaper2";


const Report = () => {
    const data = {
        problemStatement: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut",
        whyStatement: [
            "Why statement 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Why statement 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Why statement 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Why statement 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Why statement 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        ],
        hmwStatements: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut"
        ],
        venn: {
            field1: "Field 1",
            field2: "Field 2",
            field3: ""
        },
        potentialRoot: "This is a potential root statement that needs to be displayed as a card with no shadows and a border radius.",
    };

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

            {/* Why Statements */}

            <Box sx={{ marginTop: 10, marginBottom: 10, width: "70%", margin: "auto", minWidth: "700px", maxWidth: "900px" }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Why Statements
                </Typography>
                <Box>
                    {data.whyStatement.map((statement, index) => (
                        <Paper key={index} elevation={4} sx={{ padding: 2, marginBottom: 2, borderRadius: 4, minWidth: "600px" }}>
                            <Typography variant="body1">
                                {statement}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            {/* HMW Statements */}

            <Box sx={{ width: "70%", margin: "auto", minWidth: "700px", maxWidth: "900px" }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 5 }}>
                    How Might We 
                </Typography>
                <Box sx={{ marginTop: 10, marginBottom: 10, margin: "auto", minWidth: "900px", maxWidth: "900px" }}>
                    <Typography variant="h5" color="#8E8E8E" fontSize="18px" sx={{ fontWeight: 'bold', marginBottom: .5 }}>
                        Potential Root Problem
                    </Typography>
                    <Paper variant="outlined" sx={{ padding: 2, borderRadius: 4, borderColor: "#8e8e8e", marginBottom: 2 }}>
                        <Typography variant="body1">
                            {data.potentialRoot}
                        </Typography>
                    </Paper>
                    <Typography variant="h5" color="#8E8E8E" fontSize="18px" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        How might we statements
                    </Typography>
                </Box>

                <Box>
                    {data.hmwStatements.map((statement, index) => (
                        <Paper key={index} elevation={4} sx={{ padding: 2, marginBottom: 2, borderRadius: 4, minWidth: "600px" }}>
                            <Typography variant="body1">
                                {statement}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Report;
