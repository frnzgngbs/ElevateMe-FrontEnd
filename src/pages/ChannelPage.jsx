import { Box, Button, Grid, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import GridBackground from "../res/gridbackground.png";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from '../helpers/axios';
import RankingSection from "../components/RankingSection";
import UploadPSPopup from "../components/popupcards/uploadPSPopup/uploadPSPopup";
import DeleteAllSubmissions from "../components/DeleteAllSubmissions";
import { API_BASE_URL } from "../helpers/constant";
import { Room } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // For navigation


const ChannelPage = () => {
	const [roomId, setRoomId] = useState();
	const navigate = useNavigate();
	const [channelId, setChannelId] = useState();
	const [channelName, setChannelName] = useState("");
	const [posts, setPosts] = useState([]);
	const [showUploadPopup, setShowUploadPopup] = useState(false);
	const [submission, setSubmissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [rankings, setRankings] = useState({
		teamRankings: [],
		teacherRankings: [],
	});

	const [user, setCurrentlyLoginId] = useState({
		id: "",
		email: "",
		first_name: "",
		last_name: "",
		user_type: "",
	});

	const handleDeleteSuccess = (deletedPostId) => {
		setPosts((prevPosts) =>
			prevPosts.filter((post) => post.id !== deletedPostId)
		);
	};
	const location = useLocation();

	useEffect(() => {
		const fetchCurrentlyLoggedInUser = async () => {
			try {
				const token = localStorage.getItem("token");

				if (!token) {
					throw new Error("No token found. Please log in.");
				}

				const userResponse = await axiosInstance.get(
					`${API_BASE_URL}/api/user/get_currently_login/`,
					{
						headers: { Authorization: `Token ${token}` },
					}
				);
				setCurrentlyLoginId(userResponse.data);

				// console.log(location.state?.roomId);
				// console.log(location.state?.channelId);

				if (
					location.state &&
					location.state.roomId &&
					location.state.channelId
				) {
					setRoomId(location.state.roomId);
					setChannelId(location.state.channelId);
				}
			} catch (error) {
				console.error("Error fetching user:", error);
				if (error.response && error.response.status === 401) {
					console.error(
						"Unauthorized: Check if the token is valid and correctly formatted."
					);
				}
			}
		};

		fetchCurrentlyLoggedInUser();
	}, []);

	const openShareFile = () => {
		setShowUploadPopup(true);
	};

	const closeShareFile = () => {
		setShowUploadPopup(false);
	};

	const fetchRankings = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("No authentication token found");
				throw new Error("Authentication required");
			}

			const headers = { Authorization: `Token ${token}` };

			// Get all submissions
			const submissionsResponse = await axiosInstance.get(
				`${API_BASE_URL}/api/channels/${channelId}/submissions/`,
				{ headers }
			);

			// Process each submission
			const postsWithMarks = await Promise.all(
				submissionsResponse.data.map(async (submission) => {
					try {
						const votesResponse = await axiosInstance.get(
							`${API_BASE_URL}/api/channels/${channelId}/submissions/${submission.id}/voting_marks/`,
							{ headers }
						);

						const votes = votesResponse.data;

						const studentVotes = votes.filter(
							(vote) => vote.voter_type === "STUDENT"
						);
						const studentPoints =
							studentVotes.length > 0
								? studentVotes.reduce(
									(sum, vote) => sum + parseFloat(vote.marks),
									0
								)
								: 0;

						const teacherVotes = votes.filter(
							(vote) => vote.voter_type === "TEACHER"
						);
						const teacherPoints =
							teacherVotes.length > 0
								? teacherVotes.reduce(
									(sum, vote) => sum + parseFloat(vote.marks),
									0
								)
								: 0;

						// console.log(`Submission ${submission.id} scores:`, {
						// 	studentPoints: Math.round(studentPoints * 10) / 10,
						// 	teacherPoints: Math.round(teacherPoints * 10) / 10,
						// 	totalVotes: votes.length,
						// 	studentVotes: studentVotes.length,
						// 	teacherVotes: teacherVotes.length,
						// });

						return {
							id: submission.id,
							name: submission.member_name || `User ${submission.member_id}`,
							content: submission.problem_statement,
							studentPoints: Math.round(studentPoints * 10) / 10,
							teacherPoints: Math.round(teacherPoints * 10) / 10,
							profilePicture: submission.profile_picture || "",
						};
					} catch (error) {
						console.error(
							`Error processing submission ${submission.id}:`,
							error.response?.data || error.message
						);
						return null;
					}
				})
			);

			const validPosts = postsWithMarks.filter((post) => post !== null);

			const teamRankings = validPosts
				.sort((a, b) => b.studentPoints - a.studentPoints)
				.map(({ name, content, studentPoints, profilePicture }) => ({
					name,
					content,
					points: studentPoints,
					profilePicture,
				}));

			const teacherRankings = validPosts
				.sort((a, b) => b.teacherPoints - a.teacherPoints)
				.map(({ name, content, teacherPoints, profilePicture }) => ({
					name,
					content,
					points: teacherPoints,
					profilePicture,
				}));

			setRankings({ teamRankings, teacherRankings });
		} catch (error) {
			console.error(
				"Failed to fetch rankings:",
				error.response?.data || error.message
			);
			setRankings({ teamRankings: [], teacherRankings: [] });
		}
	};
	const handleVoteSuccess = () => {
		fetchRankings();
	};

	useEffect(() => {
		const fetchChannelDetails = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axiosInstance.get(
					`${API_BASE_URL}/api/channels/${channelId}/`,
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
				const response = await axiosInstance.get(
					`${API_BASE_URL}/api/channels/${channelId}/submissions/`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				response.data.forEach((post) => {
					// console.log("Post data:", {
					// 	id: post.id,
					// 	member_id: post.member_id,
					// 	author: post.author,
					// 	problem_statement: post.problem_statement,
					// });
				});
				setPosts(response.data);
			} catch (error) {
				console.error("Error fetching channel submissions:", error);
			}
		};

		if (channelId) {
			fetchChannelDetails();
			fetchChannelSubmissions();
			fetchRankings();
		}
	}, [channelId]);

	const onDone = async () => {
		await fetchChannelSubmissions();
		await fetchRankings();
	};

	const fetchChannelSubmissions = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axiosInstance.get(
				`${API_BASE_URL}/api/channels/${channelId}/submissions/`,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			response.data.forEach((post) => {
				// console.log("Post data:", {
				// 	id: post.id,
				// 	member_id: post.member_id,
				// 	author: post.author,
				// 	problem_statement: post.problem_statement,
				// });
			});
			setPosts(response.data);
		} catch (error) {
			console.error("Error fetching channel submissions:", error);
		}
	};

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
				}}>
				<Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 2 }}>
					Channel - {channelName}
				</Typography>

				<Grid
					container
					spacing={2}
					sx={{
						maxWidth: "900px",
						margin: "0 auto",
					}}>
					<Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
						<Typography variant="h5" sx={{ mb: 2 }}>
							File Proposals
						</Typography>
					</Grid>
					<Grid
						item
						xs={6}
						sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
						{user.user_type === "TEACHER" && (
							<DeleteAllSubmissions
								setPosts={setPosts}
								channelId={channelId}
								onDeleteSuccess={handleDeleteSuccess}
							/>
						)}

					

						{user.user_type === "STUDENT" && (
							<Button
								variant="contained"
								onClick={openShareFile}
								sx={{
									backgroundColor: "#186F65",
									color: "white",
									borderRadius: 4,
									mb: 2,
									padding: 1,
								}}>
								Share File
							</Button>
						)}

<Button
							variant="contained"

							onClick={() => navigate('/room')}
							sx={{
								backgroundColor: "#186F65",
								color: "white",
								borderRadius: 4,
								mb: 2,
								padding: 1,

							}}
						>
							Back
						</Button>
					</Grid>

					{posts.map((post) => (
						<Grid item xs={12} key={post.id}>
							<PostCard
								user={user}
								authorId={post.member_id}
								author={post.member_name || "Unknown User"}
								content={
									post.problem_statement || "No Problem Statement Available"
								}
								submittedWork={{
									id: post.id,
									file_url: post.submitted_work,
								}}
								channelId={channelId}
								onVoteSuccess={fetchRankings}
								onDeleteSuccess={handleDeleteSuccess}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
			<Box
				sx={{
					margin: "0 auto",
					padding: 4,
					textAlign: "center",
					maxWidth: "80%",
				}}>
				<Typography
					variant="h3"
					sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>
					Ranking Section
				</Typography>

				<RankingSection
					teamRankings={rankings.teamRankings}
					teacherRankings={rankings.teacherRankings}
				/>
			</Box>

			{showUploadPopup && (
				<UploadPSPopup
					roomId={roomId}
					channelId={channelId}
					onClose={closeShareFile}
					onDone={onDone}
				/>
			)}
		</>
	);
};

export default ChannelPage;
