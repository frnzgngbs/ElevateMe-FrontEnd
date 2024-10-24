import { Box, Button, Grid, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import GridBackground from "../res/gridbackground.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RankingSection from "../components/RankingSection";
import UploadPSPopup from "../components/popupcards/uploadPSPopup/uploadPSPopup";

const ChannelPage = () => {
  const { roomId, channelId } = useParams();
  const [channelName, setChannelName] = useState("");
  const [posts, setPosts] = useState([]);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  console.log("Channel ID:", channelId);

  const openShareFile = () => {
    setShowUploadPopup(true);
  };

  const closeShareFile = () => {
    setShowUploadPopup(false);
  };

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/channels/${channelId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setChannelName(response.data.channel_name);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    const fetchChannelSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/channels/${channelId}/submissions/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("Submissions response:", response.data);
        // Add this debug log
        response.data.forEach((post) => {
          console.log("Post data:", {
            id: post.id,
            member_id: post.member_id,
            author: post.author,
            problem_statement: post.problem_statement,
          });
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching channel submissions:", error);
      }
    };

    fetchChannelDetails();
    fetchChannelSubmissions();
  }, [channelId]);

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
          Channel - {channelName}
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
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={openShareFile}
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
              <PostCard
                author={post.member_name || "Unknown User"}
                content={
                  post.problem_statement || "No Problem Statement Available"
                }
                submittedWork={{
                  id: post.id,
                  file_url: post.submitted_work,
                }}
                channelId={channelId}
              />
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
            {
              name: "Franz Genegobis",
              points: 27,
              content: "Problem Statement: ...",
              profilePicture: "url-to-image-1",
            },
            {
              name: "John Cadungog",
              points: 25,
              content: "Problem Statement: ...",
              profilePicture: "url-to-image-2",
            },
            {
              name: "Erwin Lambujon",
              points: 23,
              content: "Problem Statement: ...",
              profilePicture: "url-to-image-3",
            },
          ]}
          teacherRankings={[
            {
              name: "Erwin Lambujon",
              points: 30,
              content: "Problem Statement: ...",
              profilePicture: "url-to-image-4",
            },
            {
              name: "John Cadungog",
              points: 25,
              content: "Problem Statement: ...",
              profilePicture: "url-to-image-5",
            },
            {
              name: "Franz Genegobis",
              points: 22,
              content: "Problem Statement: ...",
              profilePicture: "url-to-image-6",
            },
          ]}
        />
      </Box>

      {showUploadPopup && (
        <UploadPSPopup
          roomId={roomId}
          channelId={channelId}
          onClose={closeShareFile}
        />
      )}
    </>
  );
};

export default ChannelPage;
