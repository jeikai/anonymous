import React from 'react';
import './Contacts.css';
import { useState, useEffect } from 'react';
export default function Contacts({ contacts, changeChat }) {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('user'));
		setCurrentUserName(data.userName);
		setCurrentUserImage(data.avatarImage);
	}, []);
	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<>
			{currentUserImage && currentUserImage && (
				<div className="contact_container">
					<div className="brand">
						<img src="./assets/images/logo.png" />
						<h4>Anonymous</h4>
					</div>
					<div className="contacts">
						{contacts.map((contact, index) => {
							return (
								<div
									key={contact._id}
									className={`contact ${
										index === currentSelected ? 'selected' : ''
									}`}
									onClick={() => changeCurrentChat(index, contact)}>
									<div className="avatar">
										<img
											src={'./assets/uploads/' + contact.avatarImage}
											alt=""></img>
									</div>
									<div className="username">
										<h3>{contact.userName}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className="current-user">
						<div className="avatar">
							<img
								src={'./assets/uploads/' + currentUserImage}
								alt="avatar"></img>
						</div>
						<div className="username">
							<h2>{currentUserName}</h2>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
