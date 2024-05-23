import { Box, Button, Card, Grid, IconButton, Typography, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { CheckBox } from "@mui/icons-material";
import PSCard from "../components/PSCard";
import SettingsIcon from '@mui/icons-material/Settings';
import Venn2 from '../res/venn.png'

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
			<Typography variant="h2" textAlign="center" gutterBottom>
				Venn Diagram
			</Typography>
			<Grid container spacing={6} justifyContent="center" alignItems="center">
				<Grid item>
					<Card
						sx={{
							width: 370,
							height: 440,
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
								<IconButton sx={{ marginTop: -4, marginRight: -1, padding: 0, height: '40px', width: '40px' }}>
									<SettingsIcon sx={{ fontSize: 30 }} />
								</IconButton>
							</Box>
							<Box sx={{ position: 'relative', marginBottom: '20px' }}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Typography variant="h6" sx={{ position: 'absolute', top: '80px', left: '35px', color: '#8E8E8E', fontSize: '14px' }}>
										TextBox 1
									</Typography>
									<Typography variant="h6" sx={{ position: 'absolute', top: '80px', right: '35px', color: '#8E8E8E', fontSize: '14px' }}>
										TextBox 2
									</Typography>
								</Box>
								<Typography variant="h6" sx={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translate(-50%)', color: '#8E8E8E', fontSize: '14px' }}>
									TextBox 3
								</Typography>
								<img src={Venn2} alt="Venn Diagram" style={{ zIndex: 0, width: '325px', Height: '50px' }} />
							</Box>

						</Box>
					</Card>
				</Grid>
				<Grid item>
					<Box sx={{ marginLeft: 4, width: "360px" }}>
						<Typography variant="h3">Problem Statement Generator</Typography>
						<Typography variant="body1" sx={{ mt: 2 }}>
							Specify first the number of Venn Diagram and Input the scopes of
							your problem statement you want to be generated
						</Typography>
						<Button
							variant="contained"
							sx={{
								mt: 4.3,
								py: 1.3,
								px: 6.2,
								borderRadius: 5.6,
								color: "#FFFB",
								fontSize: "1rem",
							}}>
							Generate
						</Button>
					</Box>
				</Grid>
			</Grid>
			<Box sx={{ mt: 16, px: 15 }}>
				<Typography variant="h3" textAlign={"center"}>
					Generated Problem Statement
				</Typography>
				<Typography variant="body1" textAlign={"center"} marginTop={2.7}>
					This are the generated problem statements, you can always edit the
					generated problem statements if you want
				</Typography>
				<Box
					component="form"
					color="#8E8E8E"
					display="flex"	
					flexDirection="column"
					alignItems="center"
					gap={2}
					sx={{ mt: 2, mb: 4 }}>
					{data.map((text, index) => (
						<PSCard key={index} text={text} />
					))}
					<Button
						type="submit"
						variant="contained"
						sx={{ py: 1.3, px: 5.3, borderRadius: 5 }}>
						Save
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default Venn;
