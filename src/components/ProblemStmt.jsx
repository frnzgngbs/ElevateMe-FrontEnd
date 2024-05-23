import React from "react";
import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const ProblemStmt = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.palette.grey[300],
        padding: "16px",
        borderRadius: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox sx={{ color: theme.palette.primary.main }} />}
          />
        </FormGroup>
      </Box>
      <Box
        sx={{
          flexGrow: 1, // Take up the remaining space
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.children}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <DeleteOutlinedIcon
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProblemStmt;
