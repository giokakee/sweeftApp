import axios from "axios";
const baseUrl = "http://localhost:3001/contact";

export const getContacts = async token => {
	try {
		let { data } = await axios.post(`${baseUrl}/byToken`, { token });
		return data;
	} catch (err) {
		console.log({ message: err.message });
	}
};
