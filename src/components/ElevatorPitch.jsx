import React from "react";
import { Grid, Box, Card, CardContent, Button, Paper } from "@mui/material";
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
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: To add a semi-transparent background
      }}
    >
      <Box
        sx={{
          width: "50%",
          maxHeight: "80%", // Limit the height to 80% of the viewport height
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden", // Ensure border radius is respected
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            padding: "2rem",
            userSelect: "none",
            overflowY: "auto", // Enable vertical scrolling if content overflows
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: theme.palette.primary.main,
              fontSize: "30px",
              marginBottom: "2rem",
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
                    flex: "0 0 20%",
                    backgroundColor: theme.palette.grey[300],
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
                    flex: "1",
                    backgroundColor: theme.palette.grey[300],
                    textAlign: "center",
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
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
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
      </Box>
    </Paper>
  );
};

export default App;
