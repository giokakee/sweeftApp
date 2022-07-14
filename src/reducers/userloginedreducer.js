let initialState = JSON.parse(localStorage.getItem("token")) ? true : false;

const userLoginedReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("token", JSON.stringify({ token: action.token }));
			return true;
		case "LOGOUT":
			localStorage.clear();
			return false;
		default:
			return state;
	}
};

export const loginDispatcher = token => {
	return dispatch => {
		dispatch({
			type: "LOGIN",
			token,
		});
	};
};

export const logoutDispatcher = () => {
	return dispatch => {
		dispatch({
			type: "LOGOUT",
		});
	};
};

export default userLoginedReducer;
