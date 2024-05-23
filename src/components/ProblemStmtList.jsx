import React from "react";
import ProblemStmt from "./ProblemStmt";
import { Box, Button } from "@mui/material";
const ProblemStmtList = (props) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px",
          marginBotton: "24px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {props.list.map((stmt, index) => (
          <ProblemStmt key={index}>{stmt}</ProblemStmt>
        ))}
      </Box>
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
        Save
      </Button>
    </>
  );
};

export default ProblemStmtList;
