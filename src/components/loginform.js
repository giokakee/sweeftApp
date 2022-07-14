import "../style/loginform.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginDispatcher } from "../reducers/userloginedreducer";
import { connect } from "react-redux";
import axios from "axios";

const LoginForm = ({ loginDispatcher }) => {
	const [user, setUser] = useState({ username: "", password: "" });

	const navigate = useNavigate("");

	const login = async e => {
		e.preventDefault();

		try {
			let { data } = await axios.post("http://localhost:3001/user/login", user);
			if (data) {
				loginDispatcher(data.token);
				navigate("/");
			} else {
				console.log(data, "nodata");
			}
		} catch (err) {
			console.log({ message: err.message });
		}

		setUser({ username: "", password: "" });
	};

	return (
		<div className='loginForm'>
			<div className='loginSvg'></div>
			<div className='inputs userInputs'>
				<form onSubmit={login}>
					<input
						value={user.username}
						onChange={({ target }) => setUser({ ...user, username: target.value })}
						placeholder='uresname'
						required
					/>
					<input
						type='password'
						value={user.password}
						onChange={({ target }) => setUser({ ...user, password: target.value })}
						placeholder='password'
						required
					/>
					<button type='submit' className='button'>
						LOGIN
					</button>
					<Link to={"/"}>Back</Link>
				</form>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		loginDispatcher: token => {
			dispatch(loginDispatcher(token));
		},
	};
};

export default connect(null, mapDispatchToProps)(LoginForm);
