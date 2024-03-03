const geminiChat = require('../config/gemini');
module.exports.getChatResponse = async (req, res) => {
	const { prompt } = await req.body;
	const result = await geminiChat.sendMessage(prompt);
	const response = await result.response;
	const text = response.text();
	return res.status(200).json({
		status: true,
		message: 'OK',
		data: {
			response: text,
		},
	});
};
