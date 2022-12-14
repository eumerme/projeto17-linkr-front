import { Navigate } from "react-router-dom";

export default function Private({ children }) {
	const auth = JSON.parse(localStorage.getItem("linkr"));

	if (!auth) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
}
