import AuthMainLayout from "./AuthMainLayout.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { register } from "../../services/linkr.js";

export default function SingUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [url, setUrl] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [msgBtn, setMsgBtn] = useState("Sign Up");

	function registerUser(event) {
		event.preventDefault();
		setIsDisabled(true);
		setMsgBtn(<ThreeDots color="#FFF" height={45} width={45} />);

		if (username === " ") {
			setTimeout(function () {
				alert("Dados inválidos, preencha novamente!");
				setIsDisabled(false);
				setMsgBtn("Sign Up");
			}, 1000);
		} else {
			register({
				email,
				password,
				name: username,
				imageUrl: url,
			})
				.then(() => {
					alert("Usuário criado com sucesso!");
					navigate("/");
				})
				.catch((error) => {
					if (error.response.status === 422) alert("Dados Inválidos!");
					if (error.response.status === 409) alert("E-mail já cadastrado!");
					setIsDisabled(false);
					setMsgBtn("Sign Up");
				});
		}
	}

	function redirect() {
		if (!isDisabled) {
			navigate("/");
		}
	}

	return (
		<>
			<AuthMainLayout onSubmit={registerUser} isDisabled={+isDisabled}>
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
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					disabled={isDisabled}
					placeholder="username"
					required
				/>
				<input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					type="url"
					disabled={isDisabled}
					placeholder="picture url"
					required
				/>
				<button disabled={isDisabled}>{msgBtn}</button>
				<p onClick={() => redirect()}>Switch back to log in</p>
			</AuthMainLayout>
		</>
	);
}
