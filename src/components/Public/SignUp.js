import AuthLayout from "./AuthLayout.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { register } from "../../services/linkr.js";

export default function SingUp() {
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(false);
	const [msgBtn, setMsgBtn] = useState("Sign Up");
	const [signupForm, setSignupForm] = useState({
		email: "",
		name: "",
		password: "",
		imageUrl: "",
	});

	const handleInputs = (e) => {
		setSignupForm({
			...signupForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleForm = (e) => {
		e.preventDefault();
		setIsDisabled(true);
		setMsgBtn(<ThreeDots color="#FFF" height={45} width={45} />);
		const body = { ...signupForm };

		const promise = register(body);
		promise
			.then(() => {
				alert("Usuário criado com sucesso!");
				navigate("/");
			})
			.catch((error) => {
				alert(error.response.data.message);
				setIsDisabled(false);
				setMsgBtn("Sign Up");
			});
	};

	return (
		<>
			<AuthLayout onSubmit={handleForm} isDisabled={isDisabled}>
				<input
					type="email"
					placeholder="e-mail"
					required
					value={signupForm.email}
					name="email"
					onChange={handleInputs}
					disabled={isDisabled}
				/>
				<input
					type="text"
					placeholder="name"
					required
					value={signupForm.name}
					name="name"
					onChange={handleInputs}
					disabled={isDisabled}
				/>
				<input
					type="password"
					placeholder="password"
					required
					value={signupForm.password}
					name="password"
					onChange={handleInputs}
					disabled={isDisabled}
					minLength="3"
				/>
				<input
					type="url"
					placeholder="picture url"
					required
					value={signupForm.imageUrl}
					name="imageUrl"
					onChange={handleInputs}
					disabled={isDisabled}
				/>
				<button disabled={isDisabled}>{msgBtn}</button>
				<p onClick={() => navigate("/")}>Switch back to log in</p>
			</AuthLayout>
		</>
	);
}
