// components/PostCard.js
import { Box, Card, CardContent, Typography, Button, Avatar, Grid } from "@mui/material";
import { useState } from "react";
import CommentDialog from "../components/popupcards/commentpopup/CommentDialog";

const PostCard = ({ author, content }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Example comments data, you can replace this with your actual data
    const comments = [
        { author: "Franz Genegobis", content: "Change the Fields, overall this is good, Also the problem statement you can improve." },
        { author: "John Cadungog", content: "Change the Fields, overall this is good, Also the problem statement you can improve." },
    ];

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
                            <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                                {content}
                            </Typography>
                        </Grid>

                        {/* Third Row: Comment, Vote, and View File Button */}
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button variant="text" onClick={handleOpen}>Comment</Button>
                                <Button variant="text">Vote</Button>
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

            {/* Comment Dialog */}
            <CommentDialog open={open} onClose={handleClose} comments={comments} />
        </>
    );
};

export default PostCard;
