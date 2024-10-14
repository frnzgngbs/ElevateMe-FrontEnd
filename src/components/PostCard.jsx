import { Box, Card, CardContent, Typography, Button, Avatar, Grid } from "@mui/material";
import { useState } from "react";
import VotingDialog from "../components/popupcards/votingpopup/VotingDialog"; // Import the VotingDialog component
import CommentDialog from "../components/popupcards/commentpopup/CommentDialog"; // Import the CommentDialog component

const PostCard = ({ author, content }) => {
    const [openVoteDialog, setOpenVoteDialog] = useState(false); // State to manage the voting dialog
    const [openCommentDialog, setOpenCommentDialog] = useState(false); // State to manage the comment dialog
    const comments = [
        { author: "Franz Genegobis", content: "Change the Fields, overall this is good, Also the problem statement you can improve" },
        { author: "John Cadungog", content: "Change the Fields, overall this is good, Also the problem statement you can improve" },
    ]; // Sample comments array

    const handleVoteDialogOpen = () => {
        setOpenVoteDialog(true);
    };

    const handleVoteDialogClose = () => {
        setOpenVoteDialog(false);
    };

    const handleCommentDialogOpen = () => {
        setOpenCommentDialog(true);
    };

    const handleCommentDialogClose = () => {
        setOpenCommentDialog(false);
    };

    return (
        <>
            <Card sx={{ display: "flex", alignItems: "center", padding: 2, borderRadius: 4, boxShadow: 2, mb: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        {/* First Row: Profile Picture and Author Name */}
                        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ marginRight: 2 }}>
                                {author.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                {author}
                            </Typography>
                        </Grid>

                        {/* Second Row: Problem Statement */}
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                {content}
                            </Typography>
                        </Grid>

                        {/* Third Row: Comment, Vote, and View File Button */}
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button variant="text" onClick={handleCommentDialogOpen}>Comment</Button>
                                <Button variant="text" onClick={handleVoteDialogOpen}>Vote</Button>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 4, backgroundColor: "#186F65", color: "white" }}
                            >
                                View File
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Voting Dialog */}
            <VotingDialog open={openVoteDialog} onClose={handleVoteDialogClose} />
            
            {/* Comment Dialog */}
            <CommentDialog open={openCommentDialog} onClose={handleCommentDialogClose} comments={comments} />
        </>
    );
};

export default PostCard;
