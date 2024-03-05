import React, { useRef, useState } from 'react';
import ChatInput from '../Chat/ChatInput/ChatInput';
import '../Chat/ChatContainer/ChatContainer.scss';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { aiRoutes } from '../../../utils/APIRoutes';
import Markdown from 'react-markdown'

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
			sentTime: new Date().toLocaleDateString(),
			sender: 'user',
		};

		const newMessages = [...messages, newMessage];
		console.log('new message array', newMessages);
		setMessages(newMessages);
		setIsTyping(true);
		await processMessageToChatGPT(newMessages);
	};

	async function processMessageToChatGPT(chatMessages) {
		console.log('chat messages', chatMessages);
		const response = await axios.post(`${aiRoutes}`, {
			prompt: chatMessages[chatMessages.length - 1].message,
		});
		const updatedMsgArray = [
			...chatMessages,
			{
				message: response.data.data.response,
				sentTime: new Date().toLocaleDateString(),
				sender: 'ChatGPT',
			},
		];
		console.log('updated message array', updatedMsgArray);
		setMessages(updatedMsgArray);
		setIsTyping(false);
	}

	const handleChange = (e) => {
		setInput(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (input.length > 0) {
			setInput('');
		}
		await handleSend(input);
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
									<Markdown>{message.message}</Markdown>
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
