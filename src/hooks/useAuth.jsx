import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
	const navigate = useNavigate();

	const Login = async (user) => {
		try {
		
			let response = await axios.post("http://localhost:8000/api/user/login/", {
				username: user.username,
				password: user.password,
				
			});
		
			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				navigate("/home", { replace: true });
			}
			alert("Login successfully!");
		} catch (err) {
			if (err.code === "ERR_BAD_REQUEST") {
				alert(err.response.data.error);
			} else {
				alert("Not connected with the back-end server");
			}
		}
	};

	const Logout = async () => {
		try {
			let token = localStorage.getItem("token");

			await axios.post(
				"http://localhost:8000/api/user/logout/",
				{},
				{
					headers: { Authorization: `Token ${token}` },
				}
			);

			localStorage.removeItem("token");
			alert("Logout successful!");
			console.log("REMOVED: " + localStorage.getItem("token"));

			// Navigate to the login page after successful logout
			navigate("/login", { replace: true });
			console.log("ASDASDA");
		} catch (err) {
			console.log(err);
		}
	};

	return { Login, Logout };
};

export default useAuth;
