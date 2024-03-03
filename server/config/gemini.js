// import { GoogleGenerativeAI } from '@google/generative-ai'
const {GoogleGenerativeAI} = require('@google/generative-ai')
require("dotenv").config();
let geminiChat = null;
try {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const gemini = genAI.getGenerativeModel({ model: 'gemini-pro' });
	geminiChat = gemini.startChat({
		history: [],
	}); 
	console.log('Init gemini success!');
} catch (error) {
	console.log('Error init gemini', error);
	geminiChat = null; 
}
module.exports.geminiChat; 
