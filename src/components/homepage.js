import "../style/homepage.css";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { addDispatcher } from "../reducers/contactsreducer";
import { logoutDispatcher } from "../reducers/userloginedreducer";
import SingleContact from "./singlecontact";
import { useNavigate } from "react-router-dom";

const HomePage = ({ contacts, addDispatcher, logout }) => {
	const [newContact, setNewContact] = useState({ name: "", number: "" });
	const [searchbar, setSearchbar] = useState("");

	const add = async e => {
		e.preventDefault();
		let dataFromStorage = JSON.parse(localStorage.getItem("token"));

		let { data } = await axios.post("http://localhost:3001/contact/add", {
			...newContact,
			token: dataFromStorage.token,
		});
		if (data) {
			addDispatcher(data);
		}
		setNewContact({ name: "", number: "" });
	};

	const navigate = useNavigate();

	return (
		<div className='homePage'>
			<div className='header'>
				<h1>Phonebook</h1>
				<div className='headerButtons'>
					<button onClick={() => navigate("/history")}>History</button>
					<button onClick={logout}>Log out</button>
				</div>
			</div>
			<div className='section1'>
				<input value={searchbar} onChange={({ target }) => setSearchbar(target.value)} placeholder='Search by name on number ' />
			</div>

			<div className='section2'>
				<form onSubmit={add} className='addContactForm'>
					<input
						required
						placeholder='Name'
						value={newContact.name}
						onChange={({ target }) => setNewContact({ ...newContact, name: target.value })}
					/>
					<input
						required
						placeholder='Number'
						value={newContact.number}
						onChange={({ target }) => setNewContact({ ...newContact, number: target.value })}
					/>
					<button className='button' type='submit'>
						Add contact{" "}
					</button>
				</form>
				<div className='contacts'>
					{contacts.map(contact => {
						return <SingleContact contact={contact} key={contact.id} searchbar={searchbar} />;
					})}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		contacts: state.contactsReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addDispatcher: data => {
			dispatch(addDispatcher(data));
		},
		logout: () => {
			dispatch(logoutDispatcher());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
