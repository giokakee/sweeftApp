const historyReducer = (state = [], action) => {
	switch (action.type) {
		case "INITHISTORY":
			return action.data;
		case "ADDCALL":
			return [...state, action.data];
		default:
			return state;
	}
};

export const initHistoryDispatcher = data => {
	return dispatch => {
		dispatch({
			type: "INITHISTORY",
			data,
		});
	};
};

export const addCallDispatcher = data => {
	return dispatch => {
		dispatch({
			type: "ADDCALL",
			data,
		});
	};
};

export default historyReducer;
