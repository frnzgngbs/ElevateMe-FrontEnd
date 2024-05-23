import axios from "axios";
import { useNavigate } from "react-router-dom";

function useLogout() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		console.log("LOGOUT");
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
			console.error(err);
			navigate("/login", { replace: true });
		}
	};

	return { handleLogout };
}

export default useLogout;
