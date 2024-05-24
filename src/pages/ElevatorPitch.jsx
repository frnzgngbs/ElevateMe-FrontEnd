import React from "react";
import { Grid, Box, Card, CardContent, Button } from "@mui/material";
import { useTheme } from "@emotion/react";

const pitch = [
  "For",
  "Who",
  "We Provide",
  "That",
  "Unlike",
  "Who",
  "Our solution",
  "That",
];

const input = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud o laboris nisi ut ",
];
const App = () => {
  var theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        paddingBottom: "3rem",
        paddingLeft: "4rem",
        paddingRight: "4rem",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: theme.palette.primary.main,
          fontSize: "30px",
        }}
      >
        <strong>Elevator Pitch</strong>
      </Box>
      {pitch.map((elevator, index) => (
        <Grid item xs={12} key={index}>
          <Box
            sx={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                flex: "0 0 20%", // First card width is 100px
                backgroundColor: "gray.main",
                color: "black",
                textAlign: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {elevator}
              </CardContent>
            </Card>
            <Box sx={{ width: "20px" }} /> {/* Gap between cards */}
            <Card
              sx={{
                flex: "1", // Second card width fills remaining space
                backgroundColor: "gray.main",
                textAlign: "center",
                width: "calc(100% - 100px)", // Second card width is 100% - 100px
              }}
            >
              <CardContent>{input[index]}</CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Center the items horizontally
          alignItems: "center",
          width: "100%", // Ensure the container spans the full width
        }}
      >
        <Button
          variant="contained"
          sx={{ marginRight: "10px", borderRadius: "25px" }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "25px",
          }}
        >
          Save
        </Button>
      </Box>
    </Grid>
  );
};

export default App;
