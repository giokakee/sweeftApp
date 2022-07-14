import "../style/registerform.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const RegisterForm = () => {
	const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
	const [errorMessage, setErrorMessage] = useState("nonDisplay");
	const [passwordError, setPasswordError] = useState("nonDisplay");

	const navigate = useNavigate();

	const register = async e => {
		e.preventDefault();

		try {
			if (user.password === user.confirmPassword) {
				let { data } = await axios.post("http://localhost:3001/user/register", user);

				if (data) {
					navigate("/login");
					setUser({ username: "", password: "", confirmPassword: "" });
				} else {
					setUser({ ...user, username: "" });
					setErrorMessage("display");
					setTimeout(() => {
						setErrorMessage("nonDisplay");
					}, 3000);
				}
			} else {
				setPasswordError("passError");
				setTimeout(() => {
					setPasswordError("nonDisplay");
				}, 3000);
			}
		} catch (err) {
			console.log({ message: err.message });
		}
	};

	return (
		<div className='registerForm'>
			<div className='svg'></div>
			<div className='inputs userInputs'>
				<form onSubmit={register} className='form'>
					<div>
						<input
							value={user.username}
							onChange={({ target }) => setUser({ ...user, username: target.value })}
							placeholder='username'
							required
						/>
						<span className={errorMessage}>*This username already exists!</span>
					</div>
					<input
						type='password'
						value={user.password}
						onChange={({ target }) => setUser({ ...user, password: target.value })}
						placeholder='password'
						className={
							user.password.length > 0 && user.confirmPassword.length > 0
								? user.password === user.confirmPassword
									? "match"
									: "notMatch"
								: ""
						}
						required
					/>
					<div>
						<input
							type='password'
							value={user.confirmPassword}
							onChange={({ target }) => setUser({ ...user, confirmPassword: target.value })}
							placeholder='confirm password'
							className={
								user.password.length > 0 && user.confirmPassword.length > 0
									? user.password === user.confirmPassword
										? "match"
										: "notMatch"
									: ""
							}
							required
						/>
						<span className={passwordError}>*Password doesn't match </span>
					</div>
					<div>
						<button className='registerButton button' type='submit'>
							REGISTER
						</button>
					</div>
					<Link className='loginLink' to='/login'>
						Already have an account? LOGIN
					</Link>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
