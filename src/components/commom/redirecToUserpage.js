import { useNavigate } from "react-router-dom";

export default function RedirectTo(id, name) {
	const navigate = useNavigate();

	return navigate(`/user/${id}`, {
		replace: false,
		state: { name },
	});
}
