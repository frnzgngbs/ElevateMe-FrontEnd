import axios from "axios";
import React from "react";

function useLogout() {
	const handleLogout = async () => {
		try {
			let token = localStorage.getItem("token");
			let response = await axios.post("api/users/logout", {
				headers: { Authorization: `Token ${token}` },
			});
			console.log(response);
			clearSession();
		} catch (err) {
			console.err(err);
		}
	};

	const clearSession = () => {
		localStorage.removeItem("token");
	};
}

export default useLogout;
