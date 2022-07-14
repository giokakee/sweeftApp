const contactsReducer = (state = [], action) => {
	switch (action.type) {
		case "INIT":
			return action.data;
		case "ADD":
			return [...state, action.data];
		case "DELETE":
			return state.filter(contact => contact.id !== action.data.id);
		case "UPDATE":
			let contactForUpdate = state.find(contact => contact.id === action.data.id);
			let updatedContact = { ...contactForUpdate, name: action.data.name, number: action.data.number };
			return state.map(contact => (contact.id === contactForUpdate.id ? updatedContact : contact));
		default:
			return state;
	}
};

export const initDispatcher = data => {
	return dispatch => {
		dispatch({
			type: "INIT",
			data,
		});
	};
};

export const addDispatcher = data => {
	return dispatch => {
		dispatch({
			type: "ADD",
			data,
		});
	};
};

export const deleteDispatcher = id => {
	return dispatch => {
		dispatch({
			type: "DELETE",
			data: {
				id,
			},
		});
	};
};

export const updateDispatcher = data => {
	return dispatch => {
		dispatch({
			type: "UPDATE",
			data,
		});
	};
};

export default contactsReducer;
