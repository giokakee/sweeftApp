import "../style/singlecontact.css";
import axios from "axios";
import { connect } from "react-redux";
import { deleteDispatcher, updateDispatcher } from "../reducers/contactsreducer";
import { logoutDispatcher } from "../reducers/userloginedreducer";
import { useState } from "react";
import { addCallDispatcher } from "../reducers/historyReducer";

const SingleContact = ({ searchbar, contact, deleteDispatcher, logout, update, addCall }) => {
	const [edit, setEdit] = useState(false);
	const [contactForEdit, setContactForEdit] = useState({ name: contact.name, number: contact.number });

	const deleteContact = async id => {
		let dataFromStorage = JSON.parse(localStorage.getItem("token"));

		try {
			let { data } = await axios.delete("http://localhost:3001/contact/delete", {
				data: { token: dataFromStorage.token, contactId: id },
			});
			if (data) {
				deleteDispatcher(id);
			} else {
				logout();
			}
			console.log(data);
		} catch (err) {
			console.log({ message: err.message });
		}
	};

	const editContact = async () => {
		try {
			let { name, number } = contactForEdit;

			if (name.length > 0 && number.length > 0) {
				if (name !== contact.name || number !== contact.number) {
					console.log();
					await axios.post("http://localhost:3001/contact/edit", { id: contact.id, ...contactForEdit });
					update({ id: contact.id, ...contactForEdit });
				} else {
					setContactForEdit({ name: contact.name, number: contact.number });
				}
			}
			setEdit(false);
		} catch (err) {
			console.log({ message: err.message });
		}
	};

	const call = async () => {
		let dataFromStorage = JSON.parse(localStorage.getItem("token"));

		try {
			let { data } = await axios.post("http://localhost:3001/contact/call", {
				token: dataFromStorage.token,
				calledTo: contact.name,
			});
			if (data) {
				addCall(data);
			} else {
				logout();
			}
		} catch (err) {
			console.log({ message: err.message });
		}
	};

	let show = searchbar.length >= 0 ? contact.name.indexOf(searchbar) >= 0 || contact.number.indexOf(searchbar) >= 0 : false;

	return (
		<div className={`${show ? "singleContact" : "nonDisplay"}`}>
			{edit ? (
				<div className='editInputs'>
					<input
						value={contactForEdit.name}
						onChange={({ target }) => setContactForEdit({ ...contactForEdit, name: target.value })}
						placeholder='Name'
					/>
					<input
						value={contactForEdit.number}
						onChange={({ target }) => setContactForEdit({ ...contactForEdit, number: target.value })}
						placeholder='Number'
					/>
				</div>
			) : (
				<div className='contact'>
					<p className='name'>{contact.name.length > 20 ? contact.name.slice(0, 19) : contact.name} </p>
					<p>-</p>
					<p>{contact.number} </p>
				</div>
			)}
			<div className='contactButtons'>
				<button className='callButton' onClick={() => call()}>
					call
				</button>
				{edit ? (
					<button className='editButton' onClick={() => editContact()}>
						Done
					</button>
				) : (
					<button className='editButton' onClick={() => setEdit(true)}>
						Edit
					</button>
				)}

				<button className='deleteButton' onClick={() => deleteContact(contact.id)}>
					X
				</button>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		deleteDispatcher: id => {
			dispatch(deleteDispatcher(id));
		},
		logout: () => {
			dispatch(logoutDispatcher());
		},
		update: data => {
			dispatch(updateDispatcher(data));
		},
		addCall: data => {
			dispatch(addCallDispatcher(data));
		},
	};
};

export default connect(null, mapDispatchToProps)(SingleContact);
