import AuthLayout from "./AuthLayout.js";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { login } from "../../services/linkr.js";

export default function SignIn() {
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(false);
	const [msgBtn, setMsgBtn] = useState("Log In");
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [signinForm, setSigninForm] = useState({
		email: "",
		password: "",
	});

	const handleInputs = (e) => {
		setSigninForm({
			...signinForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleForm = (e) => {
		e.preventDefault();
		setIsDisabled(true);
		setMsgBtn(<ThreeDots color="#FFF" height={45} width={45} />);
		const body = { ...signinForm };

		const promisse = login(body);
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
			.catch(() => {
				setIsDisabled(false);
				setMsgBtn("Log In");
				alert("Email ou senha incorretos!");
			});
	};

	return (
		<>
			{auth ? (
				<Navigate to="/timeline" />
			) : (
				<AuthLayout onSubmit={handleForm} isDisabled={isDisabled}>
					<input
						type="email"
						placeholder="e-mail"
						required
						value={signinForm.email}
						name="email"
						onChange={handleInputs}
						disabled={isDisabled}
					/>
					<input
						type="password"
						placeholder="password"
						required
						value={signinForm.password}
						name="password"
						onChange={handleInputs}
						disabled={isDisabled}
						minLength="3"
					/>
					<button type="submit" disabled={isDisabled}>
						{msgBtn}
					</button>
					<p onClick={() => navigate("/sign-up")}>
						First time? Create an account!
					</p>
				</AuthLayout>
			)}
		</>
	);
}
