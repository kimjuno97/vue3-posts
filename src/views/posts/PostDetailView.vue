<template>
	<h2>{{ post.title }}</h2>
	<p>{{ post.content }}</p>
	<p class="text-muted">{{ post.createdAt }}1</p>
	<br class="my-4" />
	<div class="row">
		<div class="col-auto">
			<button class="btn btn-outline-dark">이전글</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-dark">다음글</button>
		</div>
		<div class="col-auto me-auto"></div>
		<div class="col-auto">
			<button class="btn btn-outline-dark" @click="goListPage">목록</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-primary" @click="goEditPage">수정</button>
		</div>
		<div class="col-auto">
			<button @click="remove" class="btn btn-outline-danger">삭제</button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { deletePost, getPostById } from '@/api/posts';
import { ref } from 'vue';

const props = defineProps({
	id: Number,
});

const router = useRouter();
/**
 * ref
 * 장점) 스프레드 연산을 통한 객체활당 가능, 일관성
 * 단점) form.value.title, form.value.content
 *
 * reactive
 * 장점) form.title, form.content
 * 단점) 객체활당 불가능
 */
const post = ref({
	title: null,
	content: null,
	createdAt: null,
});

const fetchPost = async () => {
	try {
		const data = await getPostById(props.id);
		setPost(data);
	} catch (err) {
		console.error('데이터 Get 실패함 : ', err);
	}
};
const setPost = ({ title, content, createdAt }) => {
	post.value = { title, content, createdAt };
};
fetchPost();
const remove = async () => {
	try {
		if (!confirm('삭제 하시겠습니까?')) {
			return;
		}
		await deletePost(props.id);
		router.push({ name: 'PostList' });
	} catch (err) {
		console.error('삭제에 실패했습니다 :', err);
	}
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
