import React from "react";
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
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
                Report Page
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 4 }}>
                This page shows the entire process which to be saved as pdf by clicking CTRL + P and selecting save as pdf
            </Typography>

            {/* Venn part */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, width: "60%", margin: "auto", minWidth: "800px", maxWidth: "800px" }}>
                {/* Left Div */}
                <Box sx={{ flex: 1 }}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        {data.venn.field3 !== "" ? (
                            <Venn3Paper venn={data.venn} />
                        ) : (
                            <Venn2Paper venn={data.venn} />
                        )}
                    </Box>
                </Box>

                {/* Right Div */}
                <Box sx={{ flex: 1, marginLeft: 4, alignContent: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Problem Statement
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 4 }}>
                        {data.problemStatement}
                    </Typography>
                </Box>
            </Box>

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
            <Box sx={{   width: "70%", margin: "auto", minWidth: "700px", maxWidth: "900px" }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 ,  marginTop: 5}}>
                    How Might We Statements
                </Typography>
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
