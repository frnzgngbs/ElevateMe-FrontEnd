// components/CommentDialog.js
import { Dialog, DialogTitle, DialogContent, Box, TextField, Button } from "@mui/material";
import CommentCard from "./CommentCard";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send'; // Import the Send icon

const CommentDialog = ({ open, onClose, comments }) => {
    const [newComment, setNewComment] = useState("");
    const [commentList, setCommentList] = useState(comments);
    const [isTyping, setIsTyping] = useState(false); // State to track if typing

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            const newCommentObj = {
                author: "Your Name", // Replace with dynamic user name if available
                content: newComment,
            };
            setCommentList([...commentList, newCommentObj]);
            setNewComment("");
            setIsTyping(false); // Reset typing state after adding comment
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4, // Curved corners
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Comments</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {commentList.map((comment, index) => (
                        <CommentCard key={index} author={comment.author} content={comment.content} />
                    ))}
                </Box>
            </DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, p: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Write a comment..."
                    value={newComment}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                        setIsTyping(true); // Set typing state to true when typing
                    }}
                    onBlur={() => setIsTyping(false)} // Reset typing state when focus is lost
                    multiline
                    rows={isTyping ? 2 : 1} // Adjust rows based on typing state
                    sx={{
                        borderRadius: 10, // Curved corners for TextField
                        backgroundColor: "#fff",
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2, // Curved corners for input
                            '& fieldset': {
                                borderColor: '#186F65',
                            },
                            '&:hover fieldset': {
                                borderColor: '#186F65',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#186F65',
                            },
                        },
                    }}
                />
                <Button
                    onClick={handleAddComment}
                    variant="contained"
                    sx={{
                        backgroundColor: "#186F65",
                        color: "white",
                        width: 10,
                        borderRadius: 4,
                        marginLeft: 1, // Space between TextField and Button
                    }}
                >
                    <SendIcon /> {/* Use the Send icon here */}
                </Button>
            </Box>
        </Dialog>
    );
};

export default CommentDialog;
