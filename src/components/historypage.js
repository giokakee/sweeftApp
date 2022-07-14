import "../style/history.css";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { initHistoryDispatcher } from "../reducers/historyReducer";
import { logoutDispatcher } from "../reducers/userloginedreducer";
import { useNavigate } from "react-router-dom";

const HistoryPage = ({ history, init, logout }) => {
	useEffect(() => {
		let dataFromStorage = JSON.parse(localStorage.getItem("token"));
		if (dataFromStorage) {
			const getCallHistory = async () => {
				try {
					let { data } = await axios.post("http://localhost:3001/contact/call/history", { token: dataFromStorage.token });
					init(data);
					console.log(data);
				} catch (error) {
					console.log({ message: error.message });
					logout();
				}
			};
			getCallHistory();
		}
	}, [init, logout]);
	const navigate = useNavigate();

	const logoutFunc = () => {
		logout();
		navigate("/");
	};

	return (
		<div>
			<div className='historyHeader'>
				<h1>Call Log</h1>
				<div className='headerButtons'>
					<button onClick={() => navigate("/")}>Home</button>
					<button onClick={logoutFunc}>Log Out</button>
				</div>
			</div>
			<div className='historyLog'>
				{history.map(call => {
					return (
						<div key={call.id} className='oneHistory'>
							<p>{call.calledTo.slice(0, 50)}</p>
							<p> - </p>
							<div>
								<p>{call.createdAt.slice(0, 10)}</p>
								<p>{call.createdAt.slice(11, 19)}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		history: state.history,
	};
};

const mapDispatchToProps = dispatch => {
	console.log("here is dispatch");
	return {
		init: data => {
			dispatch(initHistoryDispatcher(data));
		},
		logout: () => {
			dispatch(logoutDispatcher());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
