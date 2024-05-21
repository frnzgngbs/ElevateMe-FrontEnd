import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import useLogout from "../hooks/useLogout";

const UserAppbar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const logout = useLogout();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogoClick = () => {
		navigate("/user/home", { replace: true });
	};

	const handleMenuOptionClick = (path) => {
		if (path === "logout") {
		} else {
			navigate(`/user/${path}`, { replace: true });
		}
		handleClose();
	};

	const outlet = <Outlet />;

	return (
		<>
			<AppBar position="static" elevation={0} sx={{ bgcolor: "white" }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						px: 7,
						py: 5,
					}}>
					<Typography
						variant="h3"
						onClick={handleLogoClick}
						sx={{ cursor: "pointer" }}>
						ElevateMe
					</Typography>
					<IconButton onClick={handleClick}>
						<Avatar sx={{ bgcolor: "#6A6A6A" }} alt="Remy Sharp">
							B
						</Avatar>
					</IconButton>
					<Menu
						id="avatar-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "avatar-menu-button",
						}}>
						<MenuItem onClick={() => handleMenuOptionClick("home")}>
							Home
						</MenuItem>
						<MenuItem onClick={() => handleMenuOptionClick("saved")}>
							Saved
						</MenuItem>
						<MenuItem onClick={() => handleMenuOptionClick("list")}>
							List
						</MenuItem>
						<MenuItem onClick={() => handleMenuOptionClick("logout")}>
							Logout
						</MenuItem>
					</Menu>
				</Box>
			</AppBar>
			{outlet}
		</>
	);
};

export default UserAppbar;
