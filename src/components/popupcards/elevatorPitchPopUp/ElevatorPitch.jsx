import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
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

const ElevatorPitch = ({ data, setOpenElevator }) => {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setOpenElevator(false);
    }
  };

  const theme = useTheme();

  return (
    <Dialog
      open={true} // Assuming that the component is rendered only when the popup should be open
      onClose={handleClose}
      disableEnforceFocus
      PaperProps={{
        sx: {
          width: "50%",
          maxHeight: "80%",
          borderRadius: "8px",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          userSelect: "none",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: theme.palette.primary.main,
            fontSize: "30px",
            marginBottom: "2rem",
			  justifyContent: "center"
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
                <CardContent>{data[index]}</CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginRight: "10px", borderRadius: "25px" }}
          onClick={() => {
            setOpenElevator(false);
            handleClose();
          }}
        >
          Closed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ElevatorPitch;