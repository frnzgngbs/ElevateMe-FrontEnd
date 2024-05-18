// useLogout.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useLogout() {
	const handleLogout = async () => {
		console.log("LOGOUT");
		try {
			let token = localStorage.getItem("token");

			let response = await axios.post(
				"http://localhost:8000/api/user/logout/",
				{},
				{
					headers: { Authorization: `Token ${token}` },
				}
			);

			localStorage.removeItem("token");
			alert("Logout successful!");
			console.log("REMOVED: " + localStorage.getItem("token"));
		} catch (err) {
			console.error(err);
		}
	};

	return { handleLogout }; // Return the handleLogout function to be used externally
}

export default useLogout;
