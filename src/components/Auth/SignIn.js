import AuthMainLayout from "./AuthMainLayout.js";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { login } from "../../services/linkr.js";

export default function SignIn() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [msgBtn, setMsgBtn] = useState("Log In");
	const auth = JSON.parse(localStorage.getItem("linkr"));

	function loginUser(event) {
		event.preventDefault();
		setIsDisabled(true);
		setMsgBtn(<ThreeDots color="#FFF" height={45} width={45} />);

		const promisse = login({
			email,
			password,
		});
		promisse
			.then((res) => {
				localStorage.setItem(
					"linkr",
					JSON.stringify({
						id: res.data.id,
						name: res.data.name,
						token: res.data.token,
						image: res.data.image,
					})
				);
				navigate("/timeline");
			})
			.catch((error) => {
				console.log(error);
				setIsDisabled(false);
				setMsgBtn("Log In");
				alert("Email ou senha incorretos!");
			});
	}

	function redirect() {
		if (!isDisabled) {
			navigate("/sign-up");
		}
	}

	return (
		<>
			{auth ? (
				<Navigate to="/timeline" />
			) : (
				<AuthMainLayout onSubmit={loginUser} isDisabled={isDisabled}>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						disabled={isDisabled}
						placeholder="e-mail"
						required
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength="3"
						type="password"
						disabled={isDisabled}
						placeholder="password"
						required
					/>
					<button type="submit" disabled={isDisabled}>
						{msgBtn}
					</button>
					<p onClick={() => redirect()}>First time? Create an account!</p>
				</AuthMainLayout>
			)}
		</>
	);
}
