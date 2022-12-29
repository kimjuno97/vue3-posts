import { posts } from '.';

export async function getPosts(params) {
	const { data, headers } = await posts.get('/', { params });
	return [data, headers];
}

export async function getPostById(id) {
	const { data } = await posts.get(id);
	return data;
}

export async function createPost(body) {
	const { data } = await posts.post('/', body);
	return data;
}

export async function updatePost(id, body) {
	const { data } = await posts.put(id, body);
	return data;
}

export async function deletePost(id) {
	const { data } = await posts.delete(`/${id}`);
	return data;
}
