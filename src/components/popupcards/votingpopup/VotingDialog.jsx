// components/VotingDialog.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Slider,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";

const VotingDialog = ({ open, onClose }) => {
  const [rating, setRating] = useState(5);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    console.log("Rating submitted:", rating);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Rate This file post
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Rate from 1 (Poor) to 10 (Excellent)
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              10
            </Typography>
          </Box>
          <Slider
            value={rating}
            onChange={handleRatingChange}
            min={1}
            max={10}
            step={1}
            valueLabelDisplay="off"
            sx={{ width: "80%" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Rating: {rating}
          </Typography>{" "}
          {/* Display the selected rating */}
        </Box>
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#186F65",
            color: "white",
            borderRadius: 4,
          }}
        >
          Submit Rating
        </Button>
      </Box>
    </Dialog>
  );
};

export default VotingDialog;
