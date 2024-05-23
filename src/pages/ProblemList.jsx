import React from "react";
import useTheme from "@mui/material/styles/useTheme";
import ProblemStmtList from "../components/ProblemStmtList";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
} from "@mui/material";

const ProblemList = () => {
  var theme = useTheme();

  const ranks = [1, 2, 3, 4, 5];

  const ListOfProblems = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  ];

  const criteria = [
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
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          marginTop: "-50px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: theme.palette.primary.main }}>
          Problem <br />
          Statement List
        </h1>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <FormControl>
          <FormLabel id="venn-scope"></FormLabel>
          <RadioGroup
            row
            aria-labelledby="venn-scope"
            name="venn-diagram-scope"
          >
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <ProblemStmtList list={ListOfProblems} />
      </Box>
      <Box
        sx={{
          marginTop: "64px",
          marginBottom: "48px",
        }}
      >
        <h1 style={{ color: theme.palette.primary.main }}>
          Problem Statement Ranking
        </h1>
        {criteria.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: "16rem",
              }}
            >
              <strong>{item.term}-</strong>
            </Box>
            <Box>{item.description}</Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              paddingTop: "30px",
              marginRight: "30px",
            }}
          >
            <CheckIcon sx={{ fill: theme.palette.primary.main }} />
          </Box>

          <Box
            sx={{
              justifyContent: "space-evenly",
              width: "100%",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "32px",
              marginTop: "25px",
              backgroundColor: "gray.main",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box>
              <strong>Problem Statement</strong>
            </Box>
            {criteria.map((term, index) => (
              <Box key={index}>
                <strong>{term.term}</strong>
              </Box>
            ))}
            <Box>
              <strong>Rank</strong>
            </Box>
          </Box>
        </Box>
        <Box>
          {ranks.map((rank, index) => (
            <Box
              key={index}
              display="flex"
              marginTop={1}
              alignItems="center"
              gap="8px"
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox sx={{ color: theme.palette.primary.main }} />
                  }
                />
              </FormGroup>
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
                }}
              >
                <Box sx={{ paddingLeft: "70px" }}>{rank}</Box>
                <DeleteOutlinedIcon sx={{ fill: theme.palette.primary.main }} />
              </Box>
            </Box>
          ))}
          <Button
            variant="contained"
            sx={{
              float: "right",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderRadius: "32px",
              fontWeight: "normal",
              margin: "20px 0 20px 0",
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemList;
