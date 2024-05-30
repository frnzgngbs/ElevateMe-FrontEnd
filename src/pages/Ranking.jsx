import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    CardContent,
    Grid,
    IconButton,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import PSListCard from "../components/RankingPSCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Ranking = () => {
    const data = [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptate odio architecto minus eum ipsam aperiam impedit tempora voluptatum! Quam tempora quasi fugiat fugit error modi consectetur deleniti dolorum tempore.",
    ];

    const criteria = [
        {
            criteria_title: "Impact",
            description: "The problem has a significant impact on various stakeholders, such as individuals, groups, organizations, and the environment.",
        },
        {
            criteria_title: "Capability",
            description: "The problem solver has the ability to effectively address and solve this problem based on your skills, resources, and expertise.",
        },
        {
            criteria_title: "Development Cost",
            description: "The potential solution is feasible to develop considering potential costs, investments, and financial resources required.",
        },
        {
            criteria_title: "Urgency",
            description: "It is urgent to find a solution for this problem in terms of time constraints, market demands, or immediate needs.",
        },
        {
            criteria_title: "Innovation Opportunity",
            description: "The problem has the potential to present innovative solutions or new approaches that could lead to unique outcomes or competitive advantages.",
        },
        {
            criteria_title: "Market Size",
            description: "Potential market is large enough to make the solution a viable business.",
        },
    ];

    const initialSelectedValues = data.map(() => criteria.map(() => 1));
    const initialTotalsPerRow = initialSelectedValues.map(row => row.reduce((sum, value) => sum + value, 0));

    const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
    const [totalsPerRow, setTotalsPerRow] = useState(initialTotalsPerRow);

    const handleSelectChange = (rowIndex, colIndex, newValue) => {
        const newSelectedValues = selectedValues.map((row, rIdx) =>
            row.map((value, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? newValue : value))
        );
        setSelectedValues(newSelectedValues);

        const newTotalsPerRow = newSelectedValues.map(row => row.reduce((sum, value) => sum + value, 0));
        setTotalsPerRow(newTotalsPerRow);
    };

    const getRanks = (totals) => {
        const indexedTotals = totals.map((total, index) => ({ total, index }));
        indexedTotals.sort((a, b) => b.total - a.total || a.index - b.index);
        const ranks = Array(totals.length).fill(0);
        indexedTotals.forEach((item, rank) => {
            ranks[item.index] = rank + 1;
        });
        return ranks;
    };

    const ranks = getRanks(totalsPerRow);

    return (
        <Box pb={5}>
            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                <Typography variant="h1" sx={{ textAlign: "center", width: "400px" }}>
                    Problem Statement List
                </Typography>
            </Box>
            <Box sx={{ mx: 17 }}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <RadioGroup name="radio-button-group" sx={{ flexDirection: "row" }}>
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                    </RadioGroup>
                </Box>
                <Box sx={{ maxHeight: "500px", overflowY: "auto", mt: 2, mb: 4, p: 1.3 }}>
                    {data.map((item, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                            <PSListCard text={item} />
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ mx: 13.3, mb: 3 }}>
                <Typography variant="h3">Problem Statement Ranking</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 10, mx: 17, mb: 7 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {criteria.map(({ criteria_title }, index) => (
                        <Box key={index}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                {criteria_title} -
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {criteria.map(({ description }, index) => (
                        <Box key={index}>
                            <Typography variant="body1">{description}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ mr: 14, ml: 17, mb: 2 }}>
                <Card
                    sx={{
                        background: "#D9D9D9",
                        borderRadius: 5,
                        width: "95%",
                        mb: 2,
                        ml: 5,
                    }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            borderRadius: 5,
                        }}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <Grid item xs={5}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Problem Statement
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography textAlign={"center"}>Impact</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography textAlign={"center"}>Capability</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography textAlign={"center"}>Dev Cost</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography sx={{ width: "100px", textAlign: "center" }}>
                                    Urgency of Needs
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography textAlign={"center"}>
                                    Innovation Opportunity
                                </Typography>
                            </Grid>
                            <Grid item xs textAlign={"center"}>
                                <Typography>Market Size</Typography>
                            </Grid>
                            <Grid item xs textAlign={"center"}>
                                <Typography>Total</Typography>
                            </Grid>
                            <Grid item xs textAlign={"center"}>
                                <Typography>Rank</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {data.map((_, rowIndex) => (
                    <Box key={rowIndex} sx={{ display: "flex", mb: 2 }}>
                        <IconButton>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                        <Card
                            sx={{
                                background: "#D9D9D9",
                                borderRadius: 5,
                                width: "95%",
                            }}>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    borderRadius: 5,
                                }}>
                                <Grid container sx={{ justifyContent: "space-between" }}>
                                    <Grid item xs={5}>
                                        <Typography sx={{ textAlign: "center" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Ipsam qui corrupti saepe placeat nihil ipsum sit
                                            quisquam quam dignissimos totam, perspiciatis tempora
                                            sapiente eaque voluptatum, id impedit quae, repellendus
                                            dolor!
                                        </Typography>
                                    </Grid>
                                    {criteria.map((_, colIndex) => (
                                        <Grid
                                            key={colIndex}
                                            item
                                            xs
                                            sx={{ display: "flex", justifyContent: "center" }}
                                        >
                                            <FormControl sx={{ justifyContent: "center" }}>
                                                <Select
                                                    value={selectedValues[rowIndex][colIndex]}
                                                    onChange={(e) => handleSelectChange(rowIndex, colIndex, parseInt(e.target.value))}
                                                >
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    ))}
                                    <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography sx={{ display: "flex", alignItems: "center" }}>
                                            {totalsPerRow[rowIndex]} {/* Display the total score for the row */}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography sx={{ display: "flex", alignItems: "center" }}>
                                            {ranks[rowIndex]} {/* Display the rank for the row */}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <IconButton>
                            <DeleteOutlineIcon fontSize={"medium"} color="error" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Ranking;