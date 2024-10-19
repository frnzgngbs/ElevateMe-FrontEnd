import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";

const UploadPSPopup = () => {
  const [loading, setLoading] = useState(false);
  const [pStatement, setpStatement] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDone, setopenDone] = useState(false);
  const fileInputRef = useRef(null);

  const openButton = () => {
    alert("This is a test!");
  };
  const handleSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const triggerFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleInput = (e) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    setpStatement(e.target.value);
  };
  return (
    <Dialog
      open={true}
      onClose={() => {}}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          width: "800px",
          padding: "16px",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Share your Ideation
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Problem Statement"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          minRows={5}
          value={pStatement}
          onInput={handleInput}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& textarea": {
              overflow: "hidden",
              resize: "none",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: 2,
            mb: 2,
          }}
        >
          <input
            type="file"
            ref={fileInputRef} // Reference to file input
            style={{ display: "none" }} // Hide the input
            onChange={handleSelectedFile} // Handle file selection
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={triggerFileExplorer}
            sx={{
              borderRadius: 20,
              padding: "8px 24px",
              backgroundColor: "#186F65",
              color: "white",
              borderRadius: "20px",
              width: "500px",
              padding: "16px",
            }}
          >
            {selectedFile ? selectedFile.name : "Upload File"}
          </Button>
        </Box>
      </DialogActions>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            onClick={openButton}
            variant="contained"
            disabled={loading || pStatement.trim() === ""}
            sx={{
              borderRadius: 20,
              padding: "8px 24px",
              backgroundColor: "#186F65",
              color: "white",
              borderRadius: "20px",
              width: "500px",
              padding: "16px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Done"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default UploadPSPopup;
