import AuthSyles from "../../styles/AuthStyles.js";
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

		const promise = login({
			email,
			password,
		});
		promise
			.then((res) => {
				localStorage.setItem(
					"linkr",
					JSON.stringify({
						name: res.data.name,
						token: res.data.token,
					})
				);
				navigate("/timeline");
			})
			.catch((error) => {
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
				<AuthSyles onSubmit={loginUser} isDisabled={isDisabled}>
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
					<button disabled={isDisabled}>{msgBtn}</button>
					<p onClick={() => redirect()}>First time? Create an account!</p>
				</AuthSyles>
			)}
		</>
	);
}