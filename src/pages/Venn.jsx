import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CheckBox } from "@mui/icons-material";
import VennPSCard from "../components/VennPSCard";

function Venn() {
	const data = [
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illum reprehenderit iste minima ex! Provident deleniti rerum, voluptatum accusantium eius iusto tenetur, inventore rem assumenda ratione voluptate non autem sapiente!",
	];

	return (
		<Box paddingBottom={4}>
			<Typography variant="h1" textAlign="center" gutterBottom>
				Venn Diagram
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					paddingTop: 5,
				}}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Card
						sx={{
							width: 400,
							height: 460,
							p: 3.7,
							borderRadius: 6,
							boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 35px 10px",
						}}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: 2,
									width: "100%",
								}}>
								<Box width={200}>
									<Typography variant="h4">Venn Diagram Scopes</Typography>
								</Box>
								<IconButton>
									<FilterListIcon />
								</IconButton>
							</Box>
							<Typography>DIRI SUD ANG VENN</Typography>
						</Box>
					</Card>
					<Box sx={{ marginLeft: 4, width: "360px" }}>
						<Typography variant="h3">Problem Statement Generator</Typography>
						<Typography variant="body1" sx={{ mt: 2 }}>
							Specify first the number of Venn Diagram and Input the scopes of
							your problem statement you want to be generated
						</Typography>
						<Button
							variant="contained"
							sx={{
								mt: 4,
								py: 1.8,
								px: 6.5,
								borderRadius: 5,
								color: "#FFFB",
								fontSize: "1rem",
							}}>
							Generate
						</Button>
					</Box>
				</Box>
			</Box>
			<Box sx={{ mt: 16 }}>
				<Typography variant="h3" textAlign={"center"}>
					Generated Problem Statement
				</Typography>
				<Typography variant="body1" textAlign={"center"} marginTop={2.7}>
					This are the generated problem statements, you can always edit the
					generated problem statements if you want{" "}
				</Typography>
				<Box
					component="form"
					// onSubmit={handleSubmit}
					display="flex"
					flexDirection="column"
					alignItems="center"
					gap={2}
					sx={{ padding: 2 }}>
					{data.map((text, index) => (
						<VennPSCard key={index} text={text} />
					))}
					<Box
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "flex-end",
							marginRight: 125,
						}}>
						<Button
							type="submit"
							variant="contained"
							sx={{ py: 1.3, px: 5.3, borderRadius: 5 }}>
							Save
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default Venn;
