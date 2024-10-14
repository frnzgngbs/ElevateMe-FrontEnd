import { Box, Grid, Typography, Divider, Avatar, Card, CardContent } from "@mui/material";

const RankingSection = ({ teamRankings, teacherRankings }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Team's Ranking */}
                <Grid item xs={5}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Team’s Ranking
                    </Typography>
                    {teamRankings.map((member) => (
                        // Wrap the ranking inside a Card
                        <Card key={member.name} sx={{ mb: 2, boxShadow: 2, borderRadius: 4 }}>
                            <CardContent sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                    alt={member.name}
                                    src={member.profilePicture}
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ textAlign: "left" }}>
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textAlign: "left",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {member.content}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#186F65", ml: 2 }}>
                                    {member.points} pts
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "#186F65", borderWidth: 2, height: "400px" }} // Adjusted styles for better visibility
                    />
                </Grid>

                {/* Teacher's Ranking */}
                <Grid item xs={5}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Teacher’s Ranking
                    </Typography>
                    {teacherRankings.map((member) => (
                        // Wrap the ranking inside a Card
                        <Card key={member.name} sx={{ mb: 2, boxShadow: 2, borderRadius: 4 }}>
                            <CardContent sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                    alt={member.name}
                                    src={member.profilePicture}
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ textAlign: "left" }}>
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textAlign: "left",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 5,
                                        }}
                                    >
                                        {member.content}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#186F65", ml: 2 }}>
                                    {member.points} pts
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default RankingSection;
