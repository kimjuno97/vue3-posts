<template>
	<h2>게시글 수정</h2>
	<br class="my-4" />
	<form @submit.prevent="edit">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">제목</label>
			<input v-model="form.title" type="text" class="form-control" id="title" />
		</div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">내용</label>
			<textarea
				v-model="form.content"
				class="form-control"
				id="content"
				rows="3"
			></textarea>
		</div>
		<div class="pt-4">
			<button
				type="button"
				class="btn btn-outline-danger me-2"
				@click="goDetailPage"
			>
				취소
			</button>
			<button class="btn btn-primary">수정</button>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { updatePost } from '@/api/posts';
const {
	params: { id },
} = useRoute();
const router = useRouter();

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

const form = ref({
	title: null,
	content: null,
});
const fetchPost = async () => {
	const data = await getPostById(id);
	setForm(data);
};
const setForm = ({ title, content, createdAt }) => {
	form.value = { title, content, createdAt };
};
fetchPost();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		router.push({ name: 'PostDetail', params: { id } });
	} catch (err) {
		console.error('업데이트 에러 :', err);
	}
};
</script>

<style lang="scss" scoped></style>
