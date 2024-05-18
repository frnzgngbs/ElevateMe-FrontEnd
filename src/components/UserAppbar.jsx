import React from "react";
import AppBar from "@mui/material/AppBar";
import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, Outlet, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";

const UserAppbar = () => {
	const navs = ["Home", "Saved", "List", "5-Whys", "HMW", "Log out"];
	const links = ["home", "saved", "list", "5-whys", "hmw", "log-out"];

	var outlet = <Outlet />;
	var currentLink = "";
	const location = useLocation();
	location.pathname.split("/");
	const pathname = location.pathname.split("/").filter((crumb) => crumb !== "");
	currentLink = pathname[pathname.length - 1];

	var theme = useTheme();
	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				sx={{
					background: "transparent",
					paddingTop: "3rem",
					paddingLeft: "5rem",
					paddingRight: "5rem",
					paddingBottom: "1rem",
					userSelect: "none",
					display: "flexbox",
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<Grid container xl={12}>
					<Grid md={6} xl={8}>
						<Box>
							<h2 style={{ color: theme.palette.primary.main }}>ElevateMe</h2>
						</Box>
					</Grid>
					<Grid
						width={"100%"}
						md={6}
						xl={4}
						alignContent="center"
						alignItems="center"
						display="flex"
						gap="2rem">
						{navs.map((value, index) => {
							return !value.localeCompare(currentLink, "en", {
								sensitivity: "base",
							}) ? (
								<Link key={index} to={currentLink}>
									<Button
										variant="contained"
										sx={{
											width: "5.5rem",
											height: "2.5rem",
											borderRadius: "32px",
										}}>
										{value}
									</Button>
								</Link>
							) : (
								<Link key={index} to={links[index]}>
									<Button>{value}</Button>
								</Link>
							);
						})}
					</Grid>
				</Grid>
			</AppBar>

			{outlet}
		</>
	);
};

export default UserAppbar;
