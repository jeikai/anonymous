import React, { useRef, useState } from 'react';
import ChatInput from '../Chat/ChatInput/ChatInput';
import '../Chat/ChatContainer/ChatContainer.scss';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { aiRoutes } from '../../../utils/APIRoutes';

const API_KEY = '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';
const systemMessage = {
	role: 'system',
	content:
		"Explain things like you're talking to a software professional with 2 years of experience.",
};

export default function ChatContainer() {
	const scrollRef = useRef();
	const [isTyping, setIsTyping] = useState(false);
	const [messages, setMessages] = useState([
		{
			message: "Hello, I'm Anonymous! Ask me anything!",
			sentTime: 'just now',
			sender: 'ChatGPT',
		},
	]);
	const [input, setInput] = useState('');
	const handleSend = async (message) => {
		const newMessage = {
			message,
			sentTime: 'outgoing',
			sender: 'user',
		};
		console.log('user message', newMessage);

		const newMessages = [...messages, newMessage];

		setMessages(newMessages);
		console.log('new message', messages);
		setIsTyping(true);
		await processMessageToChatGPT(messages);
	};

	async function processMessageToChatGPT(chatMessages) {
		const response = await axios.post(`${aiRoutes}`, {
			prompt: chatMessages[chatMessages.length - 1].message,
		});
		console.log(response);
		setMessages([
			...chatMessages,
			{
				message: response.data.data.response,
				sender: 'ChatGPT',
			},
		]);
		console.log('Message', messages);
		setIsTyping(false);
	}

	const handleChange = (e) => {
		setInput(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleSend(input);
		if (input.length > 0) {
			setInput('');
		}
	};
	return (
		<div className="chatcontainer">
			<div className="chat-header">
				<div className="user-details">
					<div className="username">Anonymous</div>
				</div>
			</div>
			<div className="chat-messages">
				{messages.map((message, index) => {
					return (
						<div ref={scrollRef} key={index}>
							<div
								className={`message ${
									message.sender === 'user' ? 'sended' : 'received'
								}`}>
								<div className="content">
									<p>{message.message}</p>
								</div>
							</div>
						</div>
					);
				})}
				<div>{isTyping ? 'Anonymous is typing...' : ''}</div>
			</div>

			<div className="input_container">
				<div className="button-container">
					<div className="emoji"></div>
				</div>

				<form className="form_container" onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						placeholder="Nhắn tin..."
						value={input}
						onChange={(e) => handleChange(e)}></input>
					<button className="submit">
						<IoMdSend></IoMdSend>
					</button>
				</form>
			</div>
		</div>
	);
}
