import axios from 'axios';

const url = 'http://localhost:5000/posts';

export async function getPosts() {
	const { data } = await axios.get(url);
	return data;
}

export async function getPostById(id) {
	const { data } = await axios.get(`${url}/${id}`);
	return data;
}

export async function createPost(body) {
	const { data } = await axios.post(url, body);
	return data;
}

export async function updatePost(id, body) {
	const { data } = await axios.put(`${url}/${id}`, body);
	return data;
}

export async function deletePost(id) {
	const { data } = await axios.delete(`${url}/${id}`);
	return data;
}
