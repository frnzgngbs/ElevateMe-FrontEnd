import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CommentDialog from "../components/popupcards/commentpopup/CommentDialog";
import VotingDialog from "../components/popupcards/votingpopup/VotingDialog";
import axios from "axios";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PostCard = ({
  author,
  content,
  submittedWork,
  channelId,
  onVoteSuccess,
}) => {
  const [openVoteDialog, setOpenVoteDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  const getAuthorDisplayName = () => {
    if (typeof author === "string") return author;
    if (author?.first_name && author?.last_name) {
      return `${author.first_name} ${author.last_name}`;
    }
    return "Unknown Author";
  };

  const getAuthorInitial = () => {
    const displayName = getAuthorDisplayName();
    return displayName.charAt(0) || "U";
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const handleVoteDialogOpen = () => {
    setOpenVoteDialog(true);
  };

  const handleVoteDialogClose = () => {
    setOpenVoteDialog(false);
  };

  const handleCommentDialogOpen = () => {
    setOpenCommentDialog(true);
    fetchComments();
  };

  const handleCommentDialogClose = () => {
    setOpenCommentDialog(false);
  };

  const handleFileDialogOpen = () => {
    setOpenFileDialog(true);
    fetchFileFromServer();
  };

  const handleFileDialogClose = () => {
    setOpenFileDialog(false);
  };

  const fetchFileFromServer = async () => {
    try {
      const response = await axiosInstance.get(submittedWork.file_url, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.error(
        "Error fetching file:",
        error.response?.data || error.message
      );
    }
  };

  const fetchComments = async () => {
    if (!channelId || !submittedWork?.id) {
      setError("Unable to load comments: Missing channel or submission ID");
      return;
    }

    setLoadingComments(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `/api/channels/${channelId}/submissions/${submittedWork.id}/comments/`
      );

      console.log("Comments response:", response.data);

      let commentsData = [];
      if (Array.isArray(response.data)) {
        commentsData = response.data;
      } else if (
        response.data.results &&
        Array.isArray(response.data.results)
      ) {
        commentsData = response.data.results;
      }

      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError(
        error.response?.data?.detail ||
          "Unable to load comments. Please try again later."
      );
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (commentContent) => {
    if (!channelId || !submittedWork?.id || !commentContent.trim()) {
      return false;
    }

    setLoadingComments(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        `/api/channels/${channelId}/submissions/${submittedWork.id}/comments/`,
        {
          content: commentContent.trim(),
          submission_id: submittedWork.id,
        }
      );

      console.log("Add comment response:", response.data);

      await fetchComments();
      return true;
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to post comment. Please try again."
      );
      return false;
    } finally {
      setLoadingComments(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          borderRadius: 4,
          boxShadow: 2,
          mb: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ marginRight: 2 }}>{getAuthorInitial()}</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {getAuthorDisplayName()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="text"
                  onClick={handleCommentDialogOpen}
                  startIcon={<ChatBubbleOutlineIcon />}
                >
                  Comment
                </Button>
                <Button
                  variant="text"
                  open={openVoteDialog}
                  onClick={handleVoteDialogOpen}
                  startIcon={
                    <ThumbUpOutlinedIcon onClose={handleVoteDialogClose} />
                  }
                >
                  Vote
                </Button>
              </Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 4,
                  backgroundColor: "#186F65",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#125B52",
                  },
                }}
                onClick={handleFileDialogOpen}
                disabled={!submittedWork}
                startIcon={<VisibilityIcon />}
              >
                View File
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CommentDialog
        open={openCommentDialog}
        onClose={handleCommentDialogClose}
        comments={comments}
        onAddComment={handleAddComment}
        loading={loadingComments}
        error={error}
      />
      <VotingDialog
        open={openVoteDialog}
        onClose={handleVoteDialogClose}
        channelId={channelId} // Make sure these are defined
        submissionId={submittedWork.id}
        onVoteSuccess={onVoteSuccess}
      />

      <Dialog
        open={openFileDialog}
        onClose={handleFileDialogClose}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Submitted File
          </Typography>
          {fileUrl ? (
            <iframe
              src={fileUrl}
              title="Submitted Work"
              style={{ width: "100%", height: "500px", border: "none" }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No file submitted.
            </Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default PostCard;
