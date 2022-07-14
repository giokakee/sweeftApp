import "./App.css";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginform";
import RegisterForm from "./components/registerform";
import { logoutDispatcher } from "./reducers/userloginedreducer";
import { useEffect } from "react";
import axios from "axios";
import { initDispatcher } from "./reducers/contactsreducer";
import Homepage from "./components/homepage";
import HistoryPage from "./components/historypage";

const App = ({ userLogined, logoutDispatcher, initDispatcher }) => {
	useEffect(() => {
		let dataFromStorage = JSON.parse(localStorage.getItem("token"));
		if (dataFromStorage) {
			const getContacts = async () => {
				try {
					let { data } = await axios.post("http://localhost:3001/contact/byToken", { token: dataFromStorage.token });
					initDispatcher(data);
				} catch (error) {
					console.log({ message: error.message });
					logoutDispatcher();
				}
			};
			getContacts();
		}
	}, [userLogined, initDispatcher, logoutDispatcher]);

	return (
		<div>
			{userLogined ? (
				<div>
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route path='/history' element={<HistoryPage />} />
					</Routes>
				</div>
			) : (
				<div className='App'>
					<Routes>
						<Route path='/' element={<RegisterForm />} />
						<Route path='/login' element={<LoginForm />} />
					</Routes>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userLogined: state.userLogined,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutDispatcher: () => {
			dispatch(logoutDispatcher());
		},
		initDispatcher: data => {
			dispatch(initDispatcher(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
