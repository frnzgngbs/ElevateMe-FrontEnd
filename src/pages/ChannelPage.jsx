import { Box, Button, Grid, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import GridBackground from "../res/gridbackground.png";
import { useState } from "react";
import RankingSection from "../components/RankingSection"; 

const ChannelPage = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "John Cadungog",
            content: "Problem Statement: Small and medium-sized businesses (SMBs) struggle with managing customer relationships, sales, and operations due to expensive, overly complex CRM and ERP solutions. This leads to inefficiencies and missed growth opportunities.",
        },
        {
            id: 2,
            author: "Erwin Lambujon",
            content: "Problem Statement: Small and medium-sized businesses (SMBs) struggle with managing customer relationships, sales, and operations due to expensive, overly complex CRM and ERP solutions. This leads to inefficiencies and missed growth opportunities.",
        },
        {
            id: 3,
            author: "Franz Lambujon",
            content: "Problem Statement: Small and medium-sized businesses (SMBs) struggle with managing customer relationships, sales, and operations due to expensive, overly complex CRM and ERP solutions. This leads to inefficiencies and missed growth opportunities.",
        },
    ]);

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundImage: `url(${GridBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: 4,
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    Channel - 1
                </Typography>

                <Grid
                    container
                    spacing={2}
                    sx={{
                        maxWidth: "900px",
                        margin: "0 auto",
                    }}
                >
                    <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            File Proposals
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#186F65",
                                color: "white",
                                borderRadius: 4,
                                mb: 2,
                            }}
                        >
                            Share File
                        </Button>
                    </Grid>

                    {posts.map((post) => (
                        <Grid item xs={12} key={post.id}>
                            <PostCard author={post.author} content={post.content} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box
                sx={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    padding: 4,
                    textAlign: "center",
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    Ranking
                </Typography>
                
     
<RankingSection
    teamRankings={[
        { name: "Franz Genegobis", points: 27, content: "Problem Statement: ...", profilePicture: "url-to-image-1" },
        { name: "John Cadungog", points: 25, content: "Problem Statement: ...", profilePicture: "url-to-image-2" },
        { name: "Erwin Lambujon", points: 23, content: "Problem Statement: ...", profilePicture: "url-to-image-3" },
    ]}
    teacherRankings={[
        { name: "Erwin Lambujon", points: 30, content: "Problem Statement: ...", profilePicture: "url-to-image-4" },
        { name: "John Cadungog", points: 25, content: "Problem Statement: ...", profilePicture: "url-to-image-5" },
        { name: "Franz Genegobis", points: 22, content: "Problem Statement: ...", profilePicture: "url-to-image-6" },
    ]}
/>

            </Box>
        </>
    );
};

export default ChannelPage;
