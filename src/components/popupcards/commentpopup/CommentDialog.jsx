// components/CommentDialog.js
import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import CommentCard from "./CommentCard"; // Import the CommentCard component

const CommentDialog = ({ open, onClose, comments }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Comments</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {comments.map((comment, index) => (
                        <CommentCard key={index} author={comment.author} content={comment.content} />
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;
