import abi from './Transactions.json'

export const host = "http://localhost:5000";
//dành cho đăng nhập
export const loginRoute = `${host}/api/auth/login`;
//dành cho đăng kí
export const registerRoute = `${host}/api/auth/logup`; 
//dùng cho contact
export const allUsersRoute = `${host}/api/auth/allusers`;
//dùng cho profile
export const usersRoute = `${host}/api/post/users`;
//dùng cho gửi tin nhắn
export const sendMessageRoute = `${host}/api/messages/addmsg`;
//lấy ra toàn bộ tin nhắn
export const receiveMessageRoute = `${host}/api/messages/getmsg`;
//dùng cho add post
export const addPostRoute = `${host}/api/post/addpost`;
//lấy ra toàn bộ post
export const allPostsRoute = `${host}/api/post/getpost`;
//dùng cho search
export const searchRoute = `${host}/api/post/searchpost`
//dùng cho update
export const updateRoute = `${host}/api/post/updatepost`

export const aiRoutes = `${host}/api/gemini/chat`

export const contractABI = abi.abi;
export const contractAddress = '0x7ce8E6B90487a4F4d0Cf0436f062d10C80125C6b'